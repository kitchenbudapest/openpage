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
        context.putImageData(
            g.distortion.barrel(
                context.getImageData(0, 0, width, height),
                context.createImageData(width, height),
                width,
                height),
            0, 0);
    }

    // context.font = '17pt monospace';
    var fg = [194, 255, 206];
    var scr = new g.scr.Screen({context              : context,
                                fontFace             : new g.font.VT220(fg),
                                charWidth            : 2*g.font.VT220.charWidth,
                                charHeight           : 2*g.font.VT220.charHeight,
                                screenWidth          : 41,
                                screenHeight         : 10,
                                horizontalOffset     : 1.5,
                                verticalOffset       : 0.85,
                                backgroundColor0     : '#303030',
                                backgroundColor1     : '#080808',
                                foregroundColor      : fg,
                                foregroundGlowColor  : [154, 254, 174],
                                foregroundGlowRadius : 3,
                                postProcessor        : distort});

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

    var PRINTABLES = g.font.VT220.printables;

    function onKeyPress(event)
    {
        var char = String.fromCharCode(event.which || event.keyCode);
        if (PRINTABLES.indexOf(char) === -1)
            return;
        scr.write(char);
        scr.render();
    }

    window.addEventListener('keypress', onKeyPress, false);

    /* Print default welcome message */
    var msg =
    [
        '##########',
        '##      ##  KITCHEN',
        '##      ##  BUDAPEST',
        '##      ##  Powered by *T**',
        '##########',
        '',
    ];
    for (var i=0; i<msg.length; i++)
    {
        scr.write(msg[i]);
        scr.newLine();
    }
    scr.write('[visitor@kibu ~] $ ');
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
