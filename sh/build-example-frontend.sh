#!/bin/sh

if [ ! -d "./examples/frontend/dist/" ]
then
    mkdir "./examples/frontend/dist"
fi

#
# Bundle for both browsers and Node.js
# @see https://rollupjs.org
#
npx rollup ./examples/frontend/src/app.js --file ./examples/frontend/dist/bundle.js \
--format umd --name "RhinoFrontend" --sourcemap

#
# Minify bundle
# @see https://github.com/terser/terser
#
npx terser ./examples/frontend/dist/bundle.js -c -m --source-map -o ./examples/frontend/dist/bundle.min.js

# ---
rm ./examples/frontend/dist/bundle.js
rm ./examples/frontend/dist/bundle.js.map
