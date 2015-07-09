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
        stdio.writeLine('At this very moment, the prize itself is');
        stdio.writeLine('a huge surprise even for us.. but trust');
        stdio.writeLine('us, it will be awesome!');
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.award = main;
    else
        g.bin =
        {
            award : main,
        };
})();
