/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var specials =
    {
        '.'  : null,
        '..' : null,
        '~'  : null,
    };

    /* Default .bashrc file */
    var shellrc =
    {
        HOME     : '/home/visitor',
        LANG     : 'en_US.UTF-8',
        OS       : 'Fake Linux OS',
        PS1      : '[\\u@\\H \\w] $'
        SHELL    : '/bin/shell',
        TERM     : 'VT100',
        USERNAME : 'visitor',
        USER     : 'visitor',
        alias    :
        {
            // None
        },
    };


    /*------------------------------------------------------------------------*/
    function extendPath()
    {

    }


    /*------------------------------------------------------------------------*/
    function reducePath()
    {

    }


    /*------------------------------------------------------------------------*/
    function formatPS(specifier)
    {
        // pass
    }

    /*------------------------------------------------------------------------*/
    function parseInput(text)
    {
        return
    }


    /*------------------------------------------------------------------------*/
    function main(sig, argv)
    {
        /* States and variables */
        var cwd =,
            cmd,
            args,
            input
            result;

        /* Enter event loop */
        while (!sig.term)
        {
            /* Print PS1 */
            g.std.io.fprint(g.std.io.stdout,
                            '[' + shellrc.USERNAME + '@kibu ' +
                            reducePath(cwd) + '] $');
            /* Wait for input */
            input = g.std.io.fread(g.std.io.stdin);

            /* Separate input */
            cmd   = ;
            args  = ;

            /* If command is an alias substitute the command */
            if (cmd in shellrc.alias)
                input = shellrc.alias[cmd] + ' ' + args;



            switch (cmd)
            {
                case 'cd':
                    if (!args.length)
                        cwd = bashrc.HOME;
                    break;

                case 'clear':
                case 'reset':
                    break;

                case 'poweroff':
                    return g.std.lib.EXIT_SUCCESS;

                default:
                    result = g.std.lib.system(cmd, args);
                    if (result === g.std.lib.CMD_NOT_FOUND)
                        g.std.io.fwrite(g.std.io.stderr,
                                        'shell: ' + cmd + ': command not found\n');
                    else
                        g.std.io.fwrite(g.std.io.stdout, '\n');
                    break;
            }
        }
        return g.std.lib.EXIT_FAILURE;
    }


    /*------------------------------------------------------------------------*/
    /* Install application */
    g.std.lib.install('shell', main);
})();
