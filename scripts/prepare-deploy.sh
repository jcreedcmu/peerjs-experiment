rm -rf dist
mkdir dist

# creates public/js/bundle.js
make build

cp -rv \
  public/index.html \
  public/js/bundle.js \
  public/js/bundle.js.map \
  dist
