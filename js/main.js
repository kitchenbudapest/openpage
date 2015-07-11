/* INFO **
** INFO */

var g = g || {};

function main()
{
    'use strict';

    /* Create main div */
    var div = document.getElementById('terminal');

    /* Create frame */
    var image = document.createElement('img');
    image.width  = 1280;
    image.height = 900;
    image.src = 'img/vt100_as_frame_shadowed.png';
    image.id  = 'terminal-frame';

    /* Add wikipedia reference */
    var wiki = document.getElementById('terminal-logo');
    wiki.addEventListener('click', function ()
    {
        window.open('https://en.wikipedia.org/wiki/VT100');
    });

    /* Create on-screen canvas and context */
    var width   = 690,
        height  = 480,
        canvas  = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    canvas.id     = 'terminal-display';
    var context   = canvas.getContext('2d');

    function distort()
    {
        context.putImageData(
            g.prep.barrel(
                context.getImageData(0, 0, width, height),
                context.createImageData(width, height),
                width,
                height),
            0, 0);
    }

    /* Create shell and run it */
    (new g.shell.Shell(image, context, distort)).run(window);

    /* Add elements to the DOM */
    div.appendChild(canvas);
    div.appendChild(image);
}
