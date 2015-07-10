/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var BINS                = {},
        SORTED_NAMES        = [],
        SORTED_HIDDEN_NAMES = [];

    /*------------------------------------------------------------------------*/
    g.install = function (name,
                          program,
                          aliases,
                          hidden)
    {
        if (name in BINS)
            return;

        /* If this is a hidden feature */
        if (hidden)
            SORTED_HIDDEN_NAMES.push(name);
        else
            SORTED_NAMES.push(name);

        /* Store program */
        BINS[name] = program;

        /* Store aliases */
        if (aliases instanceof Array)
            for (var i=0; i<aliases.length; i++)
            {
                name = aliases[i];
                if (!(name in BINS))
                    BINS[name] = program;
            }
    };


    /*------------------------------------------------------------------------*/
    g.lsbins = function ()
    {
        return SORTED_NAMES;
    };


    /*------------------------------------------------------------------------*/
    g.lshbins = function ()
    {
        return SORTED_HIDDEN_NAMES;
    };


    /*------------------------------------------------------------------------*/
    g.bin = function (name)
    {
        return BINS[name] || {};
    };
})();
