/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'kibu',
        DESC = 'info and website of Kibu';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function visitKibuSite(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('http://kibu.hu');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        std.io.writeLine('Kitchen Budapest was founded in 2007 '   +
                         'with the support of Hungarian Telekom. ' +
                         'Our team consists of talented young '    +
                         'designers, artists and specialists in '  +
                         'different fields of technology.');
        std.io.writeLine('...');
        std.io.writeLine("Do you want to visit Kibu's site [Y/n]?");
        std.io.setReader(visitKibuSite);
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
        'kibu',
        'kitchen',
        'kitchenbudapest',
    ], true);
})();