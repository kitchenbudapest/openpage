/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /* Helper functions */
    /*------------------------------------------------------------------------*/
    function colorToHex(components)
    {
        var cmp,
            hex = '#';
        for (var i=0; i<components.length; i++)
        {
            cmp = components[i].toString(16);
            hex += cmp.length === 1 ? '0' + cmp : cmp;
        }
        return hex;
    };

    /*------------------------------------------------------------------------*/
    function Screen(args) /* context,
                             fontFace,
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
        this._fontFace     = args.fontFace;
        this._charWidth    = args.charWidth;
        this._charHeight   = args.charHeight;
        this._screenWidth  = args.screenWidth;
        this._screenHeight = args.screenHeight;
        this._hOffset      = args.horizontalOffset;
        this._vOffset      = args.verticalOffset;
        this._fgColor      = args.foregroundColor;
        this._fgGlow       = colorToHex(args.foregroundGlowColor);
        this._fgGlowRadius = args.foregroundGlowRadius;
        this._postProcess  = args.postProcessor;

        /* Create buffer */
        this._rowCount = 0;
        this._colCount = 0;
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
        var i = 0,
            line,
            colLeft,
            buffer      = this._buffer,
            colCount    = this._colCount,
            rwoCount    = this._rowCount,
            screenWidth = this._screenWidth;

        /* If text will overflow from the current line */
        colNeeded = text.length;
        colLeft   = screenWidth - colCount;
        if (colNeeded > colLeft)
        {
            line = buffer[rowCount] += text.slice(i, colLeft);
            /* MOve to next line */
            colCount = 0;
            rowCount++;
        }
        else
        {
            buffer[rowCount] += text;
            colCount += colNeeded;
        }

        /* Update colCount */
        this._colCount = colCount;






        /* Add lines to buffer */
        do
        {
            /* ??? Isn't this behaviour undefined? */
            line = text.slice(i++, i*screenWidth);
            this._buffer.push(line);
        } while (line);

        this._colCount = line.length;


        var len = this._buffer.length ,
            i   = len ? len - 1 : 0;
        this._buffer[i] = this._buffer[i] + text;
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.popChar = function (count)
    {
        var len = this._buffer.length,
            i   = len ? len - 1 : 0;
        this._buffer[i] = this._buffer[i].slice(0, -count) || '';
        if (!this._buffer[i] &&
            len !== 1)
            this._buffer.pop();
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.popLine = function (count)
    {
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype._prepareContext = function (context)
    {
        /* Create background */
        context.fillStyle = this._bgColor;
        context.fillRect(0, 0, this._width, this._height);

        /* Set font style */
        // context.fillStyle   = this._fgColor;
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
                fontFace = this._fontFace;

            /* Set styles of context */
            this._prepareContext(context);

            /* Start rendering text */
            for (i=0; i<buffer.length; i++)
            {
                /* Get next line from buffer */
                row  = (rowCount + vOff)*chrH;
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
                    fontFace.renderCharAt(line[j], context, (j + hOff)*chrW, row);
                }
                rowCount++;
            }

            /* Place cursor */
            // fontFace.renderCharAt('block', context, )

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
