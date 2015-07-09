/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function visitKibuSite(stdio, input)
    {
        if (stdio.yesOrNo(input))
            stdio.openPopUp('http://kibu.hu');
    }


    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
        stdio.writeLine('Kitchen Budapest was founded in 2007');
        stdio.writeLine('with the support of Hungarian Telekom.');
        stdio.writeLine('Our team consists of talented young');
        stdio.writeLine('designers, artists and specialists in');
        stdio.writeLine('different fields of technology.');
        stdio.writeLine('...');
        stdio.writeLine("Do you want to visit Kibu's site [Y/n]?");
        stdio.setReader(visitKibuSite);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.kibu = main;
    else
        g.bin =
        {
            kibu : main,
        };
})();
