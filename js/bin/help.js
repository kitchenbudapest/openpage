/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var HELP =
    [
              /* 0123456789012345678901234567890123456789 */
        /* 0 */ 'clear  - clear terminal screen',
        /* 1 */ 'reboot - reboot the machine',
        /* 2 */ 'exit   - switch to static page',
        /* 3 */ 'help   - print all commands available',
        /* 4 */ 'apply  - send application for hackathon',
        /* 5 */ 'doc    - open hackathon documentation',
        /* 6 */ 'date   - date of the hackathon',
        /* 7 */ 'addr   - location of the hackathon',
        /* 8 */ 'award  - prize of the hackathon ',
        /* 9 => PS1 */
    ];

    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
        for (var i=0; i<HELP.length; i++)
            stdio.writeLine(HELP[i]);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.help = main;
    else
        g.bin =
        {
            help : main,
        };
})();
