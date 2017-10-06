#!/usr/bin/env bash
rm -rf dist/
rm -rf /tmp/geometry-dist/
npm run build
mv dist/ /tmp/geometry-dist/
git checkout gh-pages
rm -rf static/ index.html
mv /tmp/geometry-dist/* .
git add .
git commit -a -m "build"
git push origin gh-pages
git checkout master
