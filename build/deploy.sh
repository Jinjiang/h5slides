cd ..
rm -Rf output/
cp -Rf docs output
cd output/
git init
git add -A
git commit -m "First commit"
git push -u git@github.com:Jinjiang/h5slides.git HEAD:gh-pages --force
