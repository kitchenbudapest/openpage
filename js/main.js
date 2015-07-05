/* INFO **
** INFO */

var g = g || {};

// TODO: Create a Context prototype, and add this is a method of it
function multiLineText(context,
                       x,
                       y,
                       height,
                       lines)
{
    if (!(lines instanceof Array))
        throw "argument `lines` has to be an instance of `Array`";

    for (var i=0; i<lines.length; i++)
        context.fillText(lines[i], x, y + height*i);
}

function barrelDistortion(frontBuffer,
                          backBuffer,
                          width,
                          height)
{
    /* Based on: http://stackoverflow.com/a/28137140/2188562 */
    var frontBufferData = frontBuffer.data,
        backBufferData  = backBuffer.data,
        centerX = width/2.0,
        centerY = height/2.0,
        rMax = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

    var i,
        x,
        y,
        r,
        gr,
        tx,
        ty,
        newR,
        newX,
        newY,
        alpha,
        index,
        scale,
        counter = 0;
    for (y=0; y<height; y++)
        for (x=0; x<width; x++)
        {
            alpha = Math.atan2(-(y - centerY), -(x - centerX));
            r = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));
            scale = r/rMax;
            newR = r*(0.25*Math.pow(scale, 4) + 0.1*Math.pow(scale, 2) + 1);
            newX = Math.abs(Math.cos(alpha)*newR - centerX);
            newY = Math.abs(Math.sin(alpha)*newR - centerY);
            gr = Math.sqrt(Math.pow(centerX - newX, 2) + Math.pow(centerY - newY, 2));
            tx = Math.round(newX);
            ty = Math.round(newY);

            if (Math.floor(newR) === Math.floor(gr) &&
                tx >= 0                             &&
                tx < width                          &&
                ty >= 0                             &&
                ty < height)
            {
                index = tx*4 + ty*4*width;
                for (i=0; i<4; i++)
                    backBufferData[counter++] = frontBufferData[index++];
            }
            /* The pixel should be transparent */
            else
                for (i=0; i<4; i++)
                    backBufferData[counter++] = 0;

        }
    return backBuffer;
}

function onKeyDown(event)
{
    console.log(String.fromCharCode(event.keyCode));
}

function main()
{
    var fontLoader   = document.createElement('script');
    fontLoader.src   = ('https:' === document.location.protocol ? 'https' : 'http') +
                       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    fontLoader.type  = 'text/javascript';
    fontLoader.async = 'true';
    var script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(fontLoader, script);

    window.addEventListener('keydown', onKeyDown, false);

    var width   = 690,
        height  = 480,
        canvas  = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    canvas.id     = 'terminal-display';
    var context = canvas.getContext('2d');

    var centerX = width/2.0,
        centerY = height/2.0;
    var gradient = context.createRadialGradient(centerX, centerY, 0.0,
                                                centerX, centerY, Math.max(centerX,
                                                                           centerY)*1.6);
    gradient.addColorStop(0, '#303030');
    gradient.addColorStop(1, '#121212');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#7FF29F';
    context.font = '17pt VT323';
    context.shadowBlur = 4;
    context.shadowColor = '#C2FFD3';
    multiLineText(context, 25, 35, 23,
    [
        '[visitor@kibu ~] # hackathon --about',
        '',
        '##########',
        '##      ##  KITCHEN',
        '##      ##  BUDAPEST',
        '##      ##  Powered by *T**',
        '##########',
        '',
        '[visitor@kibu ~] # hackathon --next-event',
        '==> date     :: 31th July - 1st August',
        '==> location :: 1092 Budapest Raday utca 30',
        '==> topic    :: Home Sweet Home',
        '',
        '[visitor@kibu ~] # hackathon --links',
        '==> github   :: http://git.kibu.hu',
        '==> author   :: http://www.kibu.hu',
        '',
        '[visitor@kibu ~] # poweroff',
    ]);

    context.putImageData(
        barrelDistortion(
            context.getImageData(0, 0, width, height),
            context.createImageData(width, height),
            width,
            height),
        0, 0);

    document.body.appendChild(canvas);

    /* Create frame */
    var image = document.createElement('img');
    image.width  = 1280;
    image.height = 900;
    image.src = 'img/vt100_as_frame_shadowed.png';
    image.id  = 'vt100-frame';
    document.body.appendChild(image);
    console.log('[DONE]');
}
