/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'su',
        DESC = 'super user';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
                       /* 0123456789012345678901234567890123456789 */
        std.io.writeLine('This emulator was designed, 3D modeled, ' +
                         'rendered and implemented by:');
        std.io.writeLine('    Peter Varo');
        std.io.writeLine('    Kitchen Budapest');
        std.io.writeLine('    (c) 2015');
        std.io.writeLine('The project is licensed under the:');
        std.io.writeLine('General Public License (GPL) version 3');
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
        'sudo',
        'root',
        'author',
        'readme',
        'license',
    ], true);
})();
