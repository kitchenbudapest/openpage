/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'man',
        DESC = 'show reference manual';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME + ' [PROGRAM|SPECIAL]');
        std.io.writeLine('  ' + DESC);
        std.io.writeLine('PROGRAM:');
        std.io.writeLine('  Any available program name');
        std.io.writeLine('SPECIAL:');
        std.io.writeLine('  vt100 : link to online manual');
    }


    /*------------------------------------------------------------------------*/
    function visitVT100Manual(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('http://vt100.net/docs/vt100-ug/contents.html');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        argv = argv[0];
        switch (argv)
        {
            case 'VT100':
            case 'vt100':
                std.io.writeLine("Do you want to jump to the VT100's");
                std.io.writeLine('online user manual page [Y/n]?');
                std.io.setReader(visitVT100Manual);
                break;

            case '':
            case undefined:
                g.bin('help').main(std, []);
                break;

            default:
                var program = g.bin(argv);
                if (program)
                    program.man(std);
                else
                    std.io.writeLine('No manual entry for: ' + argv);
                break;
        }
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
