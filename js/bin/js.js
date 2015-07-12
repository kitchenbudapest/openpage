/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var VARS,
        LINE = '>>> ',
        NAME = 'js',
        DESC = 'javascript REPL';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function repl(std, input)
    {
        /* TODO: Add `system()` => to execute built-in programs */

        /* built-in functions */
        var vars  = VARS,
            clear = std.io.clear;
        function print(input)
        {
            std.io.write(input.toString());
        }

        function println(input)
        {
            std.io.writeLine(input.toString());
        }

        try
        {
            /* Stop the REPL */
            if (input === 'exit()')
                return;

            /* Evaluate the user input */
            /* jshint -W061 */
            eval(input);
            /* jshint +W061 */
        }
        catch (exception)
        {
            std.io.writeLine('An exception occured:');
            std.io.writeLine(exception.toString());
        }

        /* Start a new REPL cycle */
        std.io.write(LINE);
        std.io.setReader(repl);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        VARS = {};
        std.io.writeLine('JavaScript REPL (Read Eval Print Line)');
        std.io.writeLine('  built-in functions:');
        std.io.writeLine('  print(), println(), clear(), exit()');
        std.io.write(LINE);
        std.io.setReader(repl);
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
        'cc',
        'exec',
        'eval',
        'repl',
        'compile',
        'javascript',
    ], true);
})();
