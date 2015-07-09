/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';
    function forkThis(stdio, input)
    {
        if (stdio.yesOrNo(input))
            stdio.openPopUp('https://github.com/kitchenbudapest/openpage');
    }

    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
                      /* 0123456789012345678901234567890123456789 */
        stdio.writeLine('Do you want to fork this VT100 project');
        stdio.writeLine('on GitHub [Y/n]?');
        stdio.setReader(forkThis);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.fork = main;
    else
        g.bin =
        {
            fork : main,
        };
})();
