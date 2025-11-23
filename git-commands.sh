# Usage: edit BRANCH below if needed, then run: bash git-commands.sh

BRANCH="main"  # <- cambia a 'gh-pages' u otra rama si tu GH Pages publica desde ahí

git status
git add index.html COMMIT_MESSAGE.txt
git commit -F COMMIT_MESSAGE.txt
git push origin "$BRANCH"
