#!/usr/bin/env bash

# Define folders
FOLDERS=(js js/bin);
COUNTER=0

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
        printf "\033[1;32m==>\033[37m Processing file: \033[0;33m$srcfile\n";

        # Print prettified status message
        printf "    \033[34m:: \033[37mHinting file...\n";
        # Hint input source code
        jshint --verbose $srcfile;
        # If hint wasn't successful
        result=$?;
        if [ $result != 0 ];
        then
            exit 1;
        fi;

        # Print prettified status message
        printf "    \033[34m:: \033[37mUglifying file as \033[0;33m$dest\n";
        # Uglify input source code
        uglifyjs $srcfile -o $dest;

        # Increase counter
        let COUNTER+=1;
        # New line separator
        printf "\n";
    done;
done;

# Reset colors
printf "\033[1;32m==> \033[37mNumber of processed files: \033[33m$COUNTER\033[0m\n\n";
exit 0;
