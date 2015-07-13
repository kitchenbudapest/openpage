/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'doc',
        DESC = 'hackathon manual and framework';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function visitHackathonRepo(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('https://github.com/kitchenbudapest/hackathon');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
                       /* 0123456789012345678901234567890123456789 */
        std.io.writeLine('This hackathon comes with "batteries '  +
                         'included", as we created a nice wiki '  +
                         'and an easy to use framework, to make ' +
                         'hacking even more fun.');
        std.io.writeLine('...');
        std.io.writeLine('Do you want to visit the repo [Y/n]?');
        std.io.setReader(visitHackathonRepo);
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
        'rtfm',
        'docs',
        'wiki',
        'manual',
        'document',
        'devtools',
        'documents',
        'hackathon',
        'framework',
    ]);
})();
