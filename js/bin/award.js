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
        std.io.writeLine('At this very moment, the prize itself is '   +
                         'kind of a surprise even for us.. but hey, '  +
                         'you can trust our taste, it will be awesome! :)');
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
        'prize',
        'winner',
        'victory',
    ]);
})();