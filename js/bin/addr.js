/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'addr',
        DESC = 'location of the hackathon';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function visitOtherMap(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('#');
    }


    /*------------------------------------------------------------------------*/
    function visitKibuMap(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('http://kibu.hu/en/kibu/contact');
    }


    /*------------------------------------------------------------------------*/
    function printAddress(std, input)
    {
        switch (input)
        {
            case 's':
            case 'S':
            case 'sz':
            case 'Sz':
            case 'SZ':
            case 'szeged':
            case 'Szeged':
            case 'SZEGED':
                std.io.writeLine('...');
                std.io.write('Do you want to see it on a map? [Y/n] ');
                std.io.setReader(visitOtherMap);
                break;

            default:
                std.io.writeLine('==> Kitchen Budapest');
                std.io.writeLine('==> Raday utca 30');
                std.io.writeLine('==> Budapest, 1092');
                std.io.writeLine('...');
                std.io.write('Do you want to see it on a map? [Y/n] ');
                std.io.setReader(visitKibuMap);
                break;
        }
        return true;
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        std.io.write('There will be two hackathon events, one at '  +
                     'Budapest and one at Szeged. Which address are ' +
                     'you looking for? [B/s] ');
        std.io.setReader(printAddress);
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
        'address',
        'location',
    ]);
})();
