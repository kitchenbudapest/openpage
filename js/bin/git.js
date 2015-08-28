/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'git',
        DESC = 'central github repo of Kibu';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function visitKibuRepo(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('https://github.com/kitchenbudapest');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
                       /* 0123456789012345678901234567890123456789 */
        std.io.writeLine('Kibu is passionate about Free and Open ' +
                         'Source projects. It even has its own '   +
                         'repository, hosted on GitHub.');
        std.io.writeLine('...');
        std.io.write("Do you want to visit Kibu's repo? [Y/n] ");
        std.io.setReader(visitKibuRepo);
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
        'repo',
        'github',
        'repository',
        'opensource',
    ], true);
})();
