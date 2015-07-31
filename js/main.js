/* INFO **
** INFO */

var g = g || {};

/*----------------------------------------------------------------------------*/
function main()
{
    'use strict';

    /* Get essential DOM elements */
    var exit = document.getElementById('header-terminal-post-it-exit');


    // var isOpen      = false,
    //     topMax      = 0,
    //     topStep     = 5,
    //     opacityMax  = 1.0,
    //     opacityStep = 0.0;

    // /* Create animation function */
    // function moveAndFade()
    // {
    //     var top = term.offsetTop;
    //     if (top >= topMax)
    //     {
    //         isOpen = true;
    //         return;
    //     }

    //     term.style.top     = (top + topStep).toString() + 'px';
    //     stat.style.opacity = (parseFloat(stat.style.opacity) + opacityStep).toString();

    //     /* Move on to the next frame */
    //     window.requestAnimationFrame(moveAndFade);
    // }

    // /* Create exit callback function for terminal */
    // function onExit(event)
    // {
    //     if (!isOpen)
    //     {
    //         stat.style.display = 'block';
    //         stat.style.opacity = '0.0';

    //         topMax = stat.offsetTop + stat.offsetHeight;
    //         opacityStep = opacityMax/(topMax/topStep);

    //         /* Start animation */
    //         window.requestAnimationFrame(moveAndFade);
    //     }
    // }

    // /* Assign exit callback to the post-it element */
    // exit.addEventListener('click', onExit);

    /* Create terminal and render it to its div
       and bind all events it has to the window */
    // (new g.term.VT100(onExit)).render(term, window);


    /* Create new terminal object */
    var term = new g.term.VT100(function ()
        {
            console.log('exit...');
        },
        window),
    /* Create new form object */
        form = new g.form.Form(
        {
            role: document.getElementById('registration-frame-data-role'),
            name: document.getElementById('registration-frame-data-name-input'),
            mail: document.getElementById('registration-frame-data-mail-input'),
            lang: document.getElementById('registration-frame-data-lang-frame-input'),
        },
        document.getElementById('registration-frame-data-send-button'));

    /* Store event listener remover callback */
    form.setOnSetEventListeners(term.delEventListeners.bind(term));

    /* Let terminal and form set their event listeners */
    form.setEventListeners();
    term.setEventListeners();

    /* Render terminal */
    term.render(document.getElementById('header-terminal'), window);

    /* Message indicating, that all initializations are done */
    console.log('[ OKAY ] Terminal VT100 is up and running');
}
