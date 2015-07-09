/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function visitKibuRepo(stdio, input)
    {
        if (stdio.yesOrNo(input))
            stdio.openPopUp('https://github.com/kitchenbudapest');
    }


    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
                      /* 0123456789012345678901234567890123456789 */
        stdio.writeLine('Kibu is passionate about Free and Open');
        stdio.writeLine('Source projects. It even has its own');
        stdio.writeLine('repository, hosted on GitHub.');
        stdio.writeLine('...');
        stdio.writeLine("Do you want to visit Kibu's repo [Y/n]?");
        stdio.setReader(visitKibuRepo);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.git = main;
    else
        g.bin =
        {
            git : main,
        };
})();
