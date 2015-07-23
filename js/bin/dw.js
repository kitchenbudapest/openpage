/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'dw',
        DESC = 'fun with the time lord';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME + ' [OPTIONS]');
        std.io.writeLine('  ' + DESC);
        std.io.writeLine('OPTIONS:');
        std.io.writeLine('  9, 10, 11');
        std.io.writeLine('  dalek, daleks ');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        switch (argv[0])
        {
            case '9':
                std.io.writeLine('FANTASTIC!');
                break;

            case '10':
                std.io.writeLine('ALLONS-Y!');
                break;

            case '11':
                std.io.writeLine('GERONIMO!');
                break;

            case 'dalek':
            case 'daleks':
                std.io.writeLine('EXTERMINATE!');
                break;

            default:
                std.lib.invalidArg(NAME, argv[0]);
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
    },
    [
        'doctor',
        'doctorwho',
    ], true);
})();
