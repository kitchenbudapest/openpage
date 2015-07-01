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
            newR = r*(0.1*Math.pow(scale, 4) + 0.1*Math.pow(scale, 2) + 1);
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


function main()
{
    var width   = 640,
        height  = 480,
        canvas  = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    context.fillStyle = '#181818';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#e8e8e8';
    context.font = '10pt monospace';
    multiLineText(context, 20, 30, 17,
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
    console.log('[DONE]');
}
