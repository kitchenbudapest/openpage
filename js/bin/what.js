/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    function visitWikipedia(stdio, input)
    {
        if (stdio.yesOrNo(input))
            stdio.openPopUp('https://en.wikipedia.org/wiki/VT100');
    }

    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {                 /* 0123456789012345678901234567890123456789 */
        stdio.writeLine('The VT100 is a video terminal,');
        stdio.writeLine('introduced in August 1978 by Digital');
        stdio.writeLine('Equipment Corporation (DEC).');
        stdio.writeLine('...');
        stdio.writeLine('Do you want to read more about it [Y/n]?');
        stdio.setReader(visitWikipedia);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.what = main;
    else
        g.bin =
        {
            what : main,
        };
})();
