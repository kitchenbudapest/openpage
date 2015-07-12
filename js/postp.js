/* INFO **
** INFO */

/* Get or set globals */
var g = g || {};

/*----------------------------------------------------------------------------*/
(function ()
{
    'use strict';
    var MODULE_NAME = 'postp';

    /*------------------------------------------------------------------------*/
    function barrel(frontBuffer,
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


    /*------------------------------------------------------------------------*/
    /* Export objects to globals */
    g[MODULE_NAME] =
    {
        barrel: barrel,
    };
})();
