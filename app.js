/* ===== MENÚ HAMBURGUESA ===== */
const menuToggle = document.getElementById("menu-toggle");
const menuList = document.getElementById("menu-list");

menuToggle.addEventListener("click", () => {
  menuList.classList.toggle("show");
});

/* ===== GALERÍAS DRAG SCROLL ===== */
document.querySelectorAll(".movie-list-wrapper").forEach(wrapper => {
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener("mousedown", e => {
    isDown = true;
    wrapper.classList.add("active");
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("mouseleave", () => isDown = false);
  wrapper.addEventListener("mouseup", () => isDown = false);

  wrapper.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });
});

/* ===== FEATURED SLIDER ===== */
const slider = document.querySelector('.featured-slider');
const slides = document.querySelectorAll('.featured-content');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const indicators = document.getElementById('indicators');

let currentSlide = 0;
const totalSlides = slides.length;

/* Background image loader from data-bg */
slides.forEach(slide => {
  slide.style.backgroundImage = `url(${slide.getAttribute('data-bg')})`;
});

/* Indicators */
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("indicator");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  indicators.appendChild(dot);
}

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll(".indicator").forEach((dot, index) =>
    dot.classList.toggle("active", index === currentSlide)
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

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

/* Auto slide */
setInterval(nextSlide, 7000);

/* Touch swipe */
let startX = 0;
let moveX = 0;

slider.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  slider.style.transition = "none";
});

slider.addEventListener("touchmove", e => {
  moveX = e.touches[0].clientX - startX;
  slider.style.transform = `translateX(-${currentSlide * 100 - (moveX / slider.clientWidth) * 100}%)`;
});

slider.addEventListener("touchend", () => {
  slider.style.transition = "transform .45s cubic-bezier(.22,.9,.27,1)";
  if (Math.abs(moveX) > 50) {
    if (moveX < 0) nextSlide();
    else prevSlide();
  } else {
    updateSlider();
  }
});
