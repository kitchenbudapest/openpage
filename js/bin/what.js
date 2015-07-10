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
    function main(std, argv)
    {                 /* 0123456789012345678901234567890123456789 */
        std.io.writeLine('The VT100 is a video terminal,');
        std.io.writeLine('introduced in August 1978 by Digital');
        std.io.writeLine('Equipment Corporation (DEC).');
        std.io.writeLine('...');
        std.io.writeLine('Do you want to read more about it [Y/n]?');
        std.io.setReader(visitWikipedia);
    }


    /*------------------------------------------------------------------------*/
    /* Export program */
    g.install(NAME,
    {
        main : main,
        man  : man,
        desc : DESC,
    },
    [
        'vt100',
        'VT100',
    ], true);
})();
