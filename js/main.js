/* INFO **
** INFO */

var g = g || {};

function main()
{
    var fontLoader   = document.createElement('script');
    fontLoader.src   = ('https:' === document.location.protocol ? 'https' : 'http') +
                       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    fontLoader.type  = 'text/javascript';
    fontLoader.async = 'true';
    var script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(fontLoader, script);

    var div = document.getElementById('terminal');

    var width   = 690,
        height  = 480,
        canvas  = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    canvas.id     = 'terminal-display';
    var context = canvas.getContext('2d');

    // (function drawCursor()
    // {

    //     window.requestAnimationFrame(drawCursor);
    // })();

    function distort()
    {
        // context.putImageData(
        //     g.distortion.barrel(
        //         context.getImageData(0, 0, width, height),
        //         context.createImageData(width, height),
        //         width,
        //         height),
        //     0, 0);
    }

    // context.font = '17pt monospace';
    var scr = new g.scr.Screen({context              : context,
                                bitmaps              : g.font.vt220.generate(context),
                                charWidth            : g.font.vt220.charWidth,
                                charHeight           : g.font.vt220.charHeight,
                                screenWidth          : 43,
                                screenHeight         : 14,
                                horizontalOffset     : 2,
                                verticalOffset       : 2,
                                backgroundColor0     : '#303030',
                                backgroundColor1     : '#121212',
                                foregroundColor      : '#7FF29F',
                                foregroundGlowColor  : '#C2FFD3',
                                foregroundGlowRadius : 4,
                                postProcessor        : distort});

    console.log(scr._bitmaps);

    function onKeyDown(event)
    {
        // event.preventDefault();
        var code = event.which || event.keyCode;
        if (code === g.kb.code.Return)
            scr.newLine();
        else if (code === g.kb.code.BackSpace)
        {
            scr.pop(1);
            scr.render();
        }
    }

    var PRINTABLES = '0123456789'                 +
                     'abcdefghijklmnopqrstuvwxyz' +
                     'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                     '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t';

    function onKeyPress(event)
    {
        var char = String.fromCharCode(event.which || event.keyCode);
        if (g.font.vt220.printables.indexOf(char) === -1)
            return;
        scr.write(char);
        scr.render();
    }

    window.addEventListener('keypress', onKeyPress, false);

    /* Print default welcome message */
    // var msg =
    // [
    //     '##########',
    //     '##      ##  KITCHEN',
    //     '##      ##  BUDAPEST',
    //     '##      ##  Powered by *T**',
    //     '##########',
    //     '',
    // ];
    // for (var i=0; i<msg.length; i++)
    // {
    //     scr.write(msg[i]);
    //     scr.newLine();
    // }
    // scr.write('[visitor@kibu ~] $ ');
    scr.write(g.font.vt220.printables);
    scr.render();

    if (window.addEventListener)
        window.addEventListener('keydown', onKeyDown, false);
    else
        window.attachEvent('onkeydown', onKeyDown);

    /* Create frame */
    var image = document.createElement('img');
    image.width  = 1280;
    image.height = 900;
    image.src = 'img/vt100_as_frame_shadowed.png';
    image.id  = 'terminal-frame';
    image.style.opacity = 0;

    /* Add wikipedia reference */
    var wiki = document.getElementById('terminal-logo');
    wiki.addEventListener('click', function ()
    {
        window.open('https://en.wikipedia.org/wiki/VT100',
                    'Wikipedia-VT100-article');
    });

    div.appendChild(canvas);
    div.appendChild(image);

    console.log('[DONE] Scene built');
}
