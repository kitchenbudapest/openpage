#!/bin/bash
## INFO ##
## INFO ##

INDEX=index.jade

keyboard_interrupt()
{
    printf '\nExiting.\n'
}

trap keyboard_interrupt SIGINT;
printf "Start watching ${INDEX} for changes:";
jade -O '{"MINIFIED": true}' --watch $INDEX &
jade -P -E test.html --watch $INDEX &
wait;
exit;
