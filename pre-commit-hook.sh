#!/usr/bin/env bash

# Define folders
FOLDERS=(js js/bin)

# For each folder
for folder in ${FOLDERS[@]};
do
    # Create folder if it's not already present
    mkdir -p min;

    # For each javascript file
    for srcfile in $folder/*.js;
    do
        # Get base name of full path
        base=${srcfile##*/};
        # Format outptu file name
        dest=$folder/min/${base%.js}.min.js;
        # Print prettified status message
        printf "\033[1;32m==>\033[37m Hinting file: \033[0;33m$srcfile\033[0m\n";
        # Hint input source code
        jshint $srcfile;
        result=$?;
        if [ $result != 0 ];
        then
            exit 1;
        fi;
        # Print prettified status message
        printf "\033[1;32m==>\033[37m Uglifying file: \033[0;33m$srcfile \033[1;37m-> \033[0;33m$dest\033[0m\n";
        # Uglify input source code
        uglifyjs $srcfile -o $dest;
    done;
done;

exit 0;
