/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'zoom',
        DESC = 'change characters span';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME + ' [OPTIONS]');
        std.io.writeLine('  ' + DESC);
        std.io.writeLine('OPTIONS:');
        std.io.writeLine('  + : increase zoom level');
        std.io.writeLine('  - : decrease zoom level');
        std.io.writeLine('  1 : set zoom level to 1x');
        std.io.writeLine('  2 : set zoom level to 2x');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        switch (argv[0])
        {
            case '+':
                break;

            case '-':
                break;

            case '1':
                break;

            case '2':
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
        'scale',
    ], true);
})();
