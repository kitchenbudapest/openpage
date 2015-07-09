#!/usr/bin/env bash

mkdir -p min
for srcfile in *.js
do
    echo "Uglifying file: '$srcfile'"
    uglifyjs $srcfile -o min/${srcfile%.js}.min.js
done
