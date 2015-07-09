/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';
    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
                      /* 0123456789012345678901234567890123456789 */
        stdio.writeLine('The hackathon will be 24 hours long:');
        stdio.writeLine('Starts on Friday, 31th July at 6:00PM');
        stdio.writeLine('Ends on Saturday, 1st August at 8:00PM');
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.date = main;
    else
        g.bin =
        {
            date : main,
        };
})();
