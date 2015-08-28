#!/bin/bash
## INFO ##
## INFO ##

INDEX=index.jade

bg_proc1='-1'
bg_proc2='-1'
counter=0

#------------------------------------------------------------------------------#
exiting()
{
    counter=$((counter+1));
    if [ $counter -ge 2 ];
    then
        printf "\nExited background process: ${bg_proc1}\n";
        printf "Exited background process: ${bg_proc2}\n";
    fi;
}

#------------------------------------------------------------------------------#
keyboard_interrupt()
{
    if [ $bg_proc1 -ne -1 ];
    then
        kill $bg_proc1;
    fi;

    if [ $bg_proc2 -ne -1 ];
    then
        kill $bg_proc2;
    fi;
    exiting;
}


#------------------------------------------------------------------------------#
trap keyboard_interrupt SIGINT SIGTERM EXIT;
printf "Start watching ${INDEX} for changes:";

jade -O '{"MINIFIED": true}' --watch $INDEX &
bg_proc1=$!
printf "\nMinified compiling process forked in background: ${bg_proc1}\n"

jade -P -E test.html --watch $INDEX &
bg_proc2=$!
printf "Test version compiling process forked in background: ${bg_proc2}\n"

wait;
exit;
