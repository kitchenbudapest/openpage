/* INFO **
** INFO */

var g = g || {};

/*----------------------------------------------------------------------------*/
function main()
{
    'use strict';

    /* Get essential DOM elements */
    var logo = document.getElementById('logo'),
        stat = document.getElementById('static'),
        term = document.getElementById('terminal'),
        exit = document.getElementById('terminal-post-it-exit');

    /* HACK: Is this really the "most elegant" solution to this problem??? */
    term.style.top = (logo.offsetTop + logo.offsetHeight).toString() + 'px';

    var isOpen      = false,
        topMax      = 0,
        topStep     = 5,
        opacityMax  = 1.0,
        opacityStep = 0.0;

    /* Create animation function */
    function moveAndFade()
    {
        var top = term.offsetTop;
        if (top >= topMax)
        {
            isOpen = true;
            return;
        }

        term.style.top     = (top + topStep).toString() + 'px';
        stat.style.opacity = (parseFloat(stat.style.opacity) + opacityStep).toString();

        /* Move on to the next frame */
        window.requestAnimationFrame(moveAndFade);
    }

    /* Create exit callback function for terminal */
    function onExit(event)
    {
        if (!isOpen)
        {
            stat.style.display = 'block';
            stat.style.opacity = '0.0';

            topMax = stat.offsetTop + stat.offsetHeight;
            opacityStep = opacityMax/(topMax/topStep);

            /* Start animation */
            window.requestAnimationFrame(moveAndFade);
        }
    }

    /* Assign exit callback to the post-it element */
    exit.addEventListener('click', onExit);

    /* Create terminal and render it to its div
       and bind all events it has to the window */
    (new g.term.VT100(onExit)).render(term, window);

    /* Message indicating, that all initializations are done */
    console.log('[ OKAY ] Terminal VT100 is up and running');
}
