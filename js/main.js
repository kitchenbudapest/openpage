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

function getAngle(x, centerX, y, centerY)
{
    var xDiff = x - centerX,
        yDiff = y - centerY,
        alpha = Math.atan2(-yDiff, -)
}

function barrelDistortion(pixels, width, height)
{
    var data = pixels.data,
        newImageData = new Array(data.length),
        centerX = width/2,
        centerY = height/2,
        rMax = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)),
        pix2D = new Array(height);

    var i,
        x,
        y;
    for (y=0; y<height; y++)
    {
        pix2D[y] = new Array(width);
        for (x=0; x<width; x++)
        {
            i = x*4 + y*4*width,
                rf = data[i],
                g = data[i + 1],
                b = data[i + 2],
                a = data[i + 3],
                r = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)),
                newR = 0.022*Math.pow(r, 2),
                alpha = Math.atan2(-(x - centerX), -(y - centerY)),
                newX = Math.abs(Math.cos(alpha)*newR - centerX),
                newY = Math.abs(Math.sin(alpha)*newR - centerY);
            pix2D[y][x] = {
                rf: data[i],
                g : data[i + 1],
                b : data[i + 2],
                a : data[i + 3],

                [rf, g, b, a, newX, newY, x, y, tr, newR, alpha];
        }
    }

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
    multiLineText(context, 10, 10, 15,
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
            width,
            height),
        0, 0);
    document.body.appendChild(canvas);
}
