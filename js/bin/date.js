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
    function getCity(std, input)
    {
        std.io.writeLine('The hackathon will be 24 hours long:');
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
                std.io.writeLine('Starts on Saturday:');
                std.io.writeLine('    10th October at 9:30AM');
                std.io.writeLine('Ends on Sunday:');
                std.io.writeLine('    11th October at 9:30AM');
                break;

            default:
                std.io.writeLine('Starts on Friday:');
                std.io.writeLine('    2nd October at 6:00PM');
                std.io.writeLine('Ends on Saturday:');
                std.io.writeLine('    3st October at 8:00PM');
                break;
        }
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
                       /* 0123456789012345678901234567890123456789 */
        std.io.writeLine('Which event are you interested in:');
        std.io.write('Budapest or Szeged? [B/s] ');
        std.io.setReader(getCity);
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
