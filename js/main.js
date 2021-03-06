/* INFO **
** INFO */

var g = g || {};

/*----------------------------------------------------------------------------*/
function main()
{
    'use strict';

    /* Get essential DOM elements */
    var exit = document.getElementById('header-terminal-post-it-exit');

    /* Create error-frame */
    var frame = document.createElement('div');
    frame.id  = 'registration-frame-error-frame';

    /* Create new terminal object */
    var term = new g.term.VT100(function (std, argv)
        {
            /* TODO: separate exit command into exit.js, write a proper MAN
                     page for it, document all the jumping possibilities */
            var location;
            switch (argv[0])
            {
                case 'join':
                case 'apply':
                case 'register':
                case 'application':
                case 'registration':
                    location = 'registration';
                    break;

                case 'info':
                case 'information':
                    location = 'info';
                    break;

                case 'more':
                case 'detail':
                case 'details':
                    location = 'detail';
                    break;

                case 'data':
                case 'links':
                case 'location':
                    location = 'links';
                    break;

                default:
                    location = 'logo';
                    break;
            }
            window.location.hash = location;
        },
        window),
    /* Create new form object */
        form = new g.form.Form(
        {
            role:
            [
                document.getElementById('registration-frame-role-radio-1'),
                document.getElementById('registration-frame-role-radio-2'),
            ],
            city:
            [
                document.getElementById('registration-frame-city-radio-1'),
                document.getElementById('registration-frame-city-radio-2'),
            ],
            name: document.getElementById('registration-frame-data-name-input'),
            mail: document.getElementById('registration-frame-data-mail-input'),
            lang: document.getElementById('registration-frame-data-lang-frame-input'),
        },
        {
            name : document.getElementById('registration-frame-data-name'),
            mail : document.getElementById('registration-frame-data-mail'),
            lang : document.getElementById('registration-frame-data-lang-frame'),
        },
        document.getElementById('registration-frame-data-send-button'),
        document.getElementById('registration-frame-error'),
        frame,
        {
            basic : 'registration-basic',
            error : 'registration-error',
        });

    /* Store event listener remover callback */
    form.setOnSetEventListeners(term.delEventListeners.bind(term));

    /* Let terminal and form set their event listeners */
    form.setEventListeners();
    term.setEventListeners();

    /* Render terminal */
    term.render(document.getElementById('header-terminal'), window);

    /* Message indicating, that all initializations are done */
    console.log('[ OKAY ] Terminal VT100 is up and running');

    /* Get DOM objects */
    var scheduleSzeged         = document.getElementById('detail-szeged'),
        scheduleBudapest       = document.getElementById('detail-budapest'),
        scheduleSwitchSzeged   = document.getElementById('detail-switch-szeged'),
        scheduleSwitchBudapest = document.getElementById('detail-switch-budapest'),
        selected   = 'detail-frame-switch-selected',
        deselected = 'detail-frame-switch-deselected';

    /* Set initial state */
    scheduleSzeged.style.display = 'none';

    /* Set switch  callbacks */
    scheduleSwitchBudapest.addEventListener('click', function ()
    {
        scheduleSwitchSzeged.classList.remove(selected);
        scheduleSwitchSzeged.classList.add(deselected);
        scheduleSwitchBudapest.classList.remove(deselected);
        scheduleSwitchBudapest.classList.add(selected);
        scheduleSzeged.style.display   = 'none';
        scheduleBudapest.style.display = 'block';
    });
    scheduleSwitchSzeged.addEventListener('click', function ()
    {
        scheduleSwitchBudapest.classList.remove(selected);
        scheduleSwitchBudapest.classList.add(deselected);
        scheduleSwitchSzeged.classList.remove(deselected);
        scheduleSwitchSzeged.classList.add(selected);
        scheduleBudapest.style.display = 'none';
        scheduleSzeged.style.display   = 'block';
    });
}
