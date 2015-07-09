/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var HIDDEN =
    [
              /* 0123456789012345678901234567890123456789 */
        /* 0 */ 'man   - same as help. (try: man VT100)',
        /* 1 */ 'kibu  - info and website of Kibu',
        /* 2 */ 'git   - github repository of Kibu',
        /* 3 */ 'what  - info about the VT100',
        /* 4 */ 'su    - info about the author',
        /* 5 */ '42    - the ultimate answer',
        /* 6 */ 'zoom  - change char size (1 or 2)',
        /* 7 */ 'line  - change char height (0 or 1)',
        /* 8 */ 'fork  - fork this project on GitHub',
        /* 9 => PS1 */
    ];

    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
        for (var i=0; i<HIDDEN.length; i++)
            stdio.writeLine(HIDDEN[i]);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.hidden = main;
    else
        g.bin =
        {
            hidden : main,
        };
})();
