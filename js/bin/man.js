/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function main(argv)
    {
        argv = argv[0];
        switch (argv[0])
        {
            case 'VT100':
            case 'vt100':

                // write

                window.open('http://vt100.net/docs/vt100-ug/contents.html',
                            'VT100-User-Manual');
                break;

            case '':
            case undefined:
                g.bin.help([]);
                break;

            default:

                // write

                break;
        }
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin instanceof Object)
        g.bin.man = main;
    else
        g.bin =
        {
            man : main,
        };
})();
