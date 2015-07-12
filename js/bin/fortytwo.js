/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = '42',
        DESC = 'the ultimate answer';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        std.io.writeLine('42 is the answer to life the universe and everything');
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
        'answer',
        'fortytwo',
    ], true);
})();
