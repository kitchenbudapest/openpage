/* INFO **
** INFO */

var g = g || {};

/*----------------------------------------------------------------------------*/
function main()
{
    'use strict';

    /* Get terminal div  and the terminal itself */
    var term  = document.getElementById('terminal'),
        vt100 = new g.term.VT100();

    /* Render it to the div and assign events to window */
    vt100.render(term, window);

    /* Message indicating, that all initializations are done */
    console.log('[ OKAY ] Terminal VT100 is up and running');
}
