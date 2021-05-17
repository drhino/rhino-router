#!/bin/sh

if [ ! -d "./dist/" ]
then
    mkdir "./dist"
fi

#
# Minify module
# @see https://github.com/terser/terser
#
npx terser ./index.js -c -m --module --source-map -o ./dist/index.min.js

#
# Bundle for both browsers and Node.js
# @see https://rollupjs.org
#
npx rollup ./dist/index.min.js --file ./dist/bundle.min.js \
--format umd --name "RhinoRouter" \
--sourcemap --compact

# ---
./sh/build-example-frontend.sh
