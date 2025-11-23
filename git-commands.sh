#!/usr/bin/env bash
# Ajusta la rama si fuese necesario (main, master, gh-pages, ...)
BRANCH="main"

echo "Staging changes..."
git add -A

if [ -f "COMMIT_MESSAGE.txt" ]; then
  echo "Committing with message from COMMIT_MESSAGE.txt..."
  git commit -F COMMIT_MESSAGE.txt
else
  echo "COMMIT_MESSAGE.txt not found — usando mensaje por defecto."
  git commit -m "deploy: actualizar estilos y assets (cache-bust)"
fi

echo "Pushing to origin/${BRANCH}..."
git push origin "$BRANCH"
echo "Done."
