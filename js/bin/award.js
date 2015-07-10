/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'award',
        DESC = 'prize of the hackathon';

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
        std.io.writeLine('At this very moment, the prize itself is');
        std.io.writeLine('a huge surprise even for us.. but trust');
        std.io.writeLine('us, it will be awesome!');
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
