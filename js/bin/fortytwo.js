/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';
    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
        stdio.writeLine('42 is the answer to life the');
        stdio.writeLine('universe and everything');
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.fortytwo = main;
    else
        g.bin =
        {
            fortytwo : main,
        };
})();
