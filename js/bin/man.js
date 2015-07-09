/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function visitVT100Manual(stdio, input)
    {
        if (stdio.yesOrNo(input))
            stdio.openPopUp('http://vt100.net/docs/vt100-ug/contents.html');
    }


    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
        switch (argv[0])
        {
            case 'VT100':
            case 'vt100':
                stdio.writeLine("Do you want to jump to the VT100's");
                stdio.writeLine('online user manual page [Y/n]?');
                stdio.setReader(visitVT100Manual);
                break;

            case '':
            case undefined:
                g.bin.help(stdio, []);
                break;

            default:
                stdio.writeLine('No manual entry for: ' + argv[0]);
                break;
        }
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.man = main;
    else
        g.bin =
        {
            man : main,
        };
})();
