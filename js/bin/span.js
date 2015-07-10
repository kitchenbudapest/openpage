/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'span',
        DESC = 'set character stretching';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME + ' [OPTIONS]');
        std.io.writeLine('  ' + DESC);
        std.io.writeLine('OPTIONS:');
        std.io.writeLine("  0 : characters' height normal");
        std.io.writeLine("  1 : characters' height doubled");
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
                       /* 0123456789012345678901234567890123456789 */
        std.io.writeLine('');
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
        'height',
        'stretch',
    ], true);
})();
