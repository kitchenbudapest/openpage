/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'what',
        DESC = 'info about the VT100';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function visitWikipedia(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('https://en.wikipedia.org/wiki/VT100');
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
    g.install(NAME,
    {
        main : main,
        man  : man,
        desc : DESC,
    }, true);
})();
