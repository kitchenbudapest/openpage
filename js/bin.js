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
    g.install = function (name, program, hidden)
    {
        if (name in BINS)
            throw 'Error: program `' + name + '` already installed';

        /* If this is a hidden feature */
        if (hidden)
            SORTED_HIDDEN_NAMES.push(name);
        else
            SORTED_NAMES.push(name);

        /* Store program */
        BINS[name] = program;
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
        return BINS[name];
    };
})();
