/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'addr',
        DESC = 'location of the hackathon';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function visitKibuMap(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('http://kibu.hu/en/kibu/contact');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        std.io.writeLine('The hackathon will be at Kibu:');
        std.io.writeLine('==> Kitchen Budapest');
        std.io.writeLine('==> Raday utca 30');
        std.io.writeLine('==> Budapest, 1092');
        std.io.writeLine('...');
        std.io.writeLine('Do you want to see it on a map [Y/n]?');
        std.io.setReader(visitKibuMap);
    }


    /*------------------------------------------------------------------------*/
    /* Export program */
    g.install(NAME,
    {
        main : main,
        man  : man,
        desc : DESC,
    });
})();
