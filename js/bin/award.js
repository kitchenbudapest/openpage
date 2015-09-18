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
        std.io.writeLine('* Raspberry Pi 2B');
        std.io.writeLine('* DeviceHub premium account');
        std.io.writeLine('* Laser-tag adventure');
        std.io.writeLine('* Kibu mentorship and financial support');
        std.io.writeLine('  for further development of the project');
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
