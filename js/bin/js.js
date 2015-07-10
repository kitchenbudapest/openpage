/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'js',
        DESC = 'evaluate javascript expressions';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function repl(std, input)
    {
        try
        {
            eval(input); // jshint ignore:line
        }
        catch (exception)
        {
            std.io.writeLine('An exception occured:');
            std.io.writeLine(exception.toString());
        }
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
                       /* 0123456789012345678901234567890123456789 */
        std.io.write('>>> ');
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
        'repl',
        'compile',
        'javascript',
    ], true);
})();
