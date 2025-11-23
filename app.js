/* ============================
   MENÚ HAMBURGUESA
============================ */
const menuToggle = document.getElementById("menu-toggle");
const menuList = document.getElementById("menu-list");

menuToggle.addEventListener("click", () => {
  menuList.classList.toggle("show");
});

/* ============================
   FEATURED SLIDER (mouse + touch)
============================ */
const slider = document.querySelector('.featured-slider');
const slides = document.querySelectorAll('.featured-content');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const indicators = document.getElementById('indicators');

let currentSlide = 0;
const totalSlides = slides.length;

/* Cargar fondo desde data-bg */
slides.forEach(slide => {
  slide.style.backgroundImage = `url(${slide.getAttribute('data-bg')})`;
});

/* Crear indicadores */
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("indicator");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  indicators.appendChild(dot);
}

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll(".indicator").forEach((dot, idx) =>
    dot.classList.toggle("active", idx === currentSlide)
  );
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(i) {
  currentSlide = i;
  updateSlider();
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

/* Auto slide */
let autoSlide = setInterval(nextSlide, 7000);

/* ============================
   DRAG / SWIPE PARA FEATURED SLIDER
============================ */
let isDragging = false;
let startX = 0;
let movementX = 0;

function startDrag(e) {
  isDragging = true;
  slider.style.transition = "none";
  startX = (e.pageX || e.touches[0].clientX);
  clearInterval(autoSlide);
}

function duringDrag(e) {
  if (!isDragging) return;

  const x = (e.pageX || e.touches[0].clientX);
  movementX = x - startX;

  slider.style.transform =
    `translateX(-${currentSlide * 100 - (movementX / slider.clientWidth) * 100}%)`;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  slider.style.transition = "transform .45s cubic-bezier(.22,.9,.27,1)";

  if (Math.abs(movementX) > 50) {
    movementX < 0 ? nextSlide() : prevSlide();
  } else {
    updateSlider();
  }

  autoSlide = setInterval(nextSlide, 7000);
}

slider.addEventListener("mousedown", startDrag);
slider.addEventListener("mousemove", duringDrag);
slider.addEventListener("mouseup", endDrag);
slider.addEventListener("mouseleave", endDrag);

slider.addEventListener("touchstart", startDrag);
slider.addEventListener("touchmove", duringDrag);
slider.addEventListener("touchend", endDrag);

/* ============================
   SWIPE PARA TODAS LAS GALERÍAS (mejorado: snap por "página" igual que featured)
============================ */
/* Eliminamos la implementación previa y aplicamos drag/touch por fila */
document.querySelectorAll(".carousel-row").forEach(row => {
  const wrapper = row.querySelector('.movie-list-wrapper');
  const btnPrev = row.querySelector('.row-btn-prev');
  const btnNext = row.querySelector('.row-btn-next');
  if (!wrapper) return;

  // Botones: scroll por "página" (ancho visible)
  if (btnPrev && btnNext) {
    const scrollAmount = () => wrapper.clientWidth;
    btnPrev.addEventListener('click', () => wrapper.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    btnNext.addEventListener('click', () => wrapper.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  }

  // Drag / swipe con snap
  let isDraggingRow = false;
  let startX = 0;
  let startScroll = 0;
  let movement = 0;
  const THRESHOLD = 50; // px to trigger page change
  const MULT = 1.5;     // velocidad del arrastre (similar a la que usabas)

  function rowStart(e) {
    isDraggingRow = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startScroll = wrapper.scrollLeft;
    movement = 0;
    wrapper.style.scrollBehavior = 'auto'; // immediate during drag
    // prevent text/image selection while dragging
    wrapper.classList.add('dragging');
  }

  function rowMove(e) {
    if (!isDraggingRow) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    movement = x - startX;
    // invert sign to match natural scrolling behavior
    wrapper.scrollLeft = startScroll - movement * MULT;
  }

  function rowEnd() {
    if (!isDraggingRow) return;
    isDraggingRow = false;
    wrapper.classList.remove('dragging');
    wrapper.style.scrollBehavior = 'smooth'; // restore smooth snapping

    if (Math.abs(movement) > THRESHOLD) {
      // mover una "página" hacia la dirección del gesto
      if (movement < 0) {
        // dedo movido hacia la izquierda -> mostrar siguiente página
        wrapper.scrollBy({ left: wrapper.clientWidth, behavior: 'smooth' });
      } else {
        // dedo movido hacia la derecha -> mostrar anterior página
        wrapper.scrollBy({ left: -wrapper.clientWidth, behavior: 'smooth' });
      }
    } else {
      // si no alcanza umbral, hacer snap al "elemento" más cercano
      // calculamos el índice aproximado de la página actual y desplazamos ahí
      const page = Math.round(wrapper.scrollLeft / wrapper.clientWidth);
      wrapper.scrollTo({ left: page * wrapper.clientWidth, behavior: 'smooth' });
    }
    // reset
    movement = 0;
  }

  // Mouse events
  wrapper.addEventListener('mousedown', rowStart);
  window.addEventListener('mousemove', rowMove);
  window.addEventListener('mouseup', rowEnd);
  wrapper.addEventListener('mouseleave', () => { if (isDraggingRow) rowEnd(); });

  // Touch events
  wrapper.addEventListener('touchstart', rowStart, {passive:true});
  wrapper.addEventListener('touchmove', rowMove, {passive:true});
  wrapper.addEventListener('touchend', rowEnd);
});

