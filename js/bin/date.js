/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'date',
        DESC = 'date of the hackathon';

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
        std.io.writeLine('The hackathon will be 24 hours long:');
        std.io.writeLine('Starts on Friday, 31th July at 6:00PM');
        std.io.writeLine('Ends on Saturday, 1st August at 8:00PM');
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
        'time',
        'event',
        'calendar',
    ]);
})();