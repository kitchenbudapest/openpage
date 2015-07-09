/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function visitKibuMap(stdio, input)
    {
        if (stdio.yesOrNo(input))
            stdio.openPopUp('http://kibu.hu/en/kibu/contact');
    }


    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
        stdio.writeLine('The hackathon will be at Kibu:');
        stdio.writeLine('==> Kitchen Budapest');
        stdio.writeLine('==> Raday utca 30');
        stdio.writeLine('==> Budapest, 1092');
        stdio.writeLine('...');
        stdio.writeLine('Do you want to see it on a map [Y/n]?');
        stdio.setReader(visitKibuMap);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.addr = main;
    else
        g.bin =
        {
            addr : main,
        };
})();
