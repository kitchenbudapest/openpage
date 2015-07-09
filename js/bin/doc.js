/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';
    /*------------------------------------------------------------------------*/
    function visitHackathonRepo(stdio, input)
    {
        if (stdio.yesOrNo(input))
            stdio.openPopUp('https://github.com/kitchenbudapest/hackathon');
    }


    /*------------------------------------------------------------------------*/
    function main(stdio, argv)
    {
                      /* 0123456789012345678901234567890123456789 */
        stdio.writeLine('This hackathon comes with "batteries');
        stdio.writeLine('included", as we created a nice wiki');
        stdio.writeLine('and an easy to use framework, to make');
        stdio.writeLine('hacking even more fun.');
        stdio.writeLine('...');
        stdio.writeLine('Do you want to visit the repo [Y/n]?');
        stdio.setReader(visitHackathonRepo);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    if (g.bin)
        g.bin.doc = main;
    else
        g.bin =
        {
            doc : main,
        };
})();
