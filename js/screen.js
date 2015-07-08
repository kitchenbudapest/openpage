/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function Screen(args) /* context,
                             bitmaps,
                             charWidth,
                             charHeight,
                             screenWidth,
                             screenHeight,
                             horizontalOffset,
                             verticalOffset
                             backgroundColor0,
                             backgroundColor1,
                             foregroundColor,
                             foregroundGlowColor,
                             foregroundGlowRadius,
                             postProcessor, */
    {
        /* Store static values */
        this._context      = args.context;
        this._bitmaps      = args.bitmaps;
        this._charWidth    = args.charWidth;
        this._charHeight   = args.charHeight;
        this._screenWidth  = args.screenWidth;
        this._screenHeight = args.screenHeight;
        this._hOffset      = args.horizontalOffset;
        this._vOffset      = args.verticalOffset;
        this._fgColor      = args.foregroundColor;
        this._fgGlow       = args.foregroundGlowColor;
        this._fgGlowRadius = args.foregroundGlowRadius;
        this._postProcess  = args.postProcessor;

        /* Create buffer */
        this._rowCount = 0;
        this._buffer   = [''];
        this._isBufferChanged = true;

        /* Create screen background */
        var width    = (args.screenWidth + args.horizontalOffset*2)*args.charWidth,
            height   = (args.screenHeight + args.verticalOffset*2)*args.charHeight,
            centerX  = width/2.0,
            centerY  = height/2.0,
            radius   = Math.max(centerX, centerY)*1.6,
            gradient = args.context.createRadialGradient(centerX, centerY, 0.0,
                                                         centerX, centerY, radius);
        gradient.addColorStop(0, args.backgroundColor0);
        gradient.addColorStop(1, args.backgroundColor1);

        this._width   = width;
        this._height  = height;
        this._bgColor = gradient;
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.newLine = function ()
    {
        this._buffer.push('');
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.write = function (text)
    {
        var len = this._buffer.length ,
            i   = len ? len - 1 : 0;
        this._buffer[i] = this._buffer[i] + text;
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.pop = function (lastNChar)
    {
        var len = this._buffer.length,
            i   = len ? len - 1 : 0;
        this._buffer[i] = this._buffer[i].slice(0, -lastNChar) || '';
        if (!this._buffer[i] &&
            len !== 1)
            this._buffer.pop();
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype._prepareContext = function (context)
    {
        /* Create background */
        context.fillStyle = this._bgColor;
        context.fillRect(0, 0, this._width, this._height);

        /* Set font style */
        context.fillStyle   = this._fgColor;
        context.shadowBlur  = this._fgGlowRadius;
        context.shadowColor = this._fgGlow;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.render = function ()
    {
        /* TODO: refactor => if buffer changed, pre-wrap all lines in buffer,
                 and work only on the last one */
        /* If new characters needs to be rendered */
        if (this._isBufferChanged)
        {
            /* Create variables and local references */
            var i,
                j,
                row,
                line,
                rowCount = this._rowCount,
                hOff     = this._hOffset,
                vOff     = this._vOffset,
                chrW     = this._charWidth,
                chrH     = this._charHeight,
                scrW     = this._screenWidth,
                scrH     = this._screenHeight,
                buffer   = this._buffer,
                context  = this._context,
                bitmaps  = this._bitmaps;

            /* Set styles of context */
            this._prepareContext(context);

            /* Start rendering text */
            for (i=0; i<buffer.length; i++)
            {
                /* Get next line from buffer */
                row  = (rowCount + hOff)*chrH;
                line = buffer[i];
                for (j=0; j<line.length; j++)
                {
                    /* If this character hit the right edge of the screen */
                    if (j >= scrW)
                    {
                        rowCount++;
                        line = line.slice(j);
                        row += chrH;
                        j = 0;
                    }

                    /* If this line hit the bottom edge of the screen */
                    if (rowCount >= scrH)
                    {
                        /* Limit counter */
                        rowCount = 0;
                        /* Remove first line from buffer */
                        buffer.shift();
                        i = 0;
                        /* Get first line */
                        line = buffer[0];
                        /* Set styles of context */
                        this._prepareContext(context);
                    }

                    /* Draw character */
                    // context.fillText(line[j], (j + vOff)*chrW, row);
                    context.putImageData(bitmaps[line[j]],
                                         (j + vOff)*chrW,
                                         row);
                }
                rowCount++;
            }
            /* Use psot-processor if there is any */
            if (this._postProcess)
                this._postProcess();
            this._isBufferChanged = false;
        }
        // console.log('[DONE] screen rendered', buffer);
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.scr =
    {
        Screen : Screen,
    }
})();
