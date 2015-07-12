/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var NAME = 'fork',
        DESC = 'fork this project on GitHub';

    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }

    /*------------------------------------------------------------------------*/
    function forkThis(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('https://github.com/kitchenbudapest/openpage');
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        std.io.writeLine('Do you want to fork this project on GitHub [Y/n]?');
        std.io.setReader(forkThis);
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
        'get',
        'fork',
        'patch',
        'download',
    ], true);
})();
