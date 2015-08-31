#!/bin/bash
## INFO ##
## INFO ##

TEMPLATE=jade/template.jade;

bg_proc1='-1';
bg_proc2='-1';
bg_proc3='-1';
counter=0;
proc_max=2;

#------------------------------------------------------------------------------#
exiting()
{
    counter=$((counter+1));
    if [ $counter -ge $proc_max ];
    then
        printf "\n";
        printf "Exited background process: ${bg_proc1}\n";
        printf "Exited background process: ${bg_proc2}\n";
        printf "Exited background process: ${bg_proc3}\n";
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

    if [ $bg_proc3 -ne -1 ];
    then
        kill $bg_proc3;
    fi;
    exiting;
}


#------------------------------------------------------------------------------#
trap keyboard_interrupt SIGINT SIGTERM EXIT;
printf "Start watching ${TEMPLATE} for changes:";
printf "\n";

jade -O '{"TEMPLATE": "confirm"}' -w $TEMPLATE -o html -E confirm.html &
bg_proc1=$!
printf "'Confirmation Mail' compiling process forked in background: ${bg_proc1}\n"

jade -O '{"TEMPLATE": "waiting"}' -w $TEMPLATE -o html -E waiting.html &
bg_proc2=$!
printf "'Waiting Mail' compiling process forked in background: ${bg_proc2}\n"

jade -O '{"TEMPLATE": "reminder"}' -w $TEMPLATE -o html -E reminder.html &
bg_proc3=$!
printf "'Reminder Mail' compiling process forked in background: ${bg_proc3}\n"

wait;
exit;
