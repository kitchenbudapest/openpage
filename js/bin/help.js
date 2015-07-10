/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var _ =
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

    var HELP_NAME   = 'help',
        HIDDEN_NAME = 'hidden',
        HELP_DESC   = 'list available programs',
        HIDDEN_DESC = 'list hidden programs';

    /*------------------------------------------------------------------------*/
    function _man(name, desc)
    {
        /* Create `man` function */
        return function (std)
        {
            std.io.writeLine(name);
            std.io.writeLine('  ' + desc);
        };
    }


    /*------------------------------------------------------------------------*/
    function _main(name)
    {
        var lsbins;
        switch (name)
        {
            case HELP_NAME:
                lsbins = g.lsbins;
                break;

            case HIDDEN_NAME:
                lsbins = g.lshbins;
                break;
        }

        /* Create `main` function */
        return function (std, argv)
        {
            var name,
                bins = lsbins();
            for (var i=0; i<bins.length; i++)
            {
                name = bins[i];
                std.io.writeLine(String(name + '     ').slice(0, 6) +
                                 ' : ' + g.bin(name).desc);
            }
        };
    }


    /*------------------------------------------------------------------------*/
    /* Export program */
    g.install(HELP_NAME,
    {
        main : _main(HELP_NAME),
        man  : _man(HELP_NAME, HELP_DESC),
        desc : HELP_DESC,
    });
    g.install(HIDDEN_NAME,
    {
        main : _main(HIDDEN_NAME),
        man  : _man(HIDDEN_NAME, HIDDEN_DESC),
        desc : HIDDEN_DESC,
    }, true);
})();
