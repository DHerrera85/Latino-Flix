# ...run these commands in PowerShell / Git Bash from project root...

# 1) Ver estado
git status

# 2) Añadir archivos modificados
git add .

# 3) Commit usando el archivo de mensaje (si lo guardaste)
git commit -F "COMMIT_MESSAGE.txt"

# Si prefieres usar -m directamente:
# git commit -m "Featured slider refactor, gallery arrows & swipe, anchors and footer"

# 4) Empujar al remoto (ajusta 'origin' y 'main' si usas otra rama)
git push origin HEAD

# 5) Verifica el push
git status
