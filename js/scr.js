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
    }

    /*------------------------------------------------------------------------*/
    function Screen(args) /* canvas,
                             fontFace,
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
        /* Store rendering properties */
        this._zoom = 1;
        this._span = 1;

        /* Create and store characters */
        this._fontTight = new args.fontFace({fillColor : args.foregroundColor,
                                             charSpan  : 1,
                                             charZoom  : 2});
        this._fontLoose = new args.fontFace({fillColor : args.foregroundColor,
                                             charSpan  : 2,
                                             charZoom  : 2});

        /* Store static values */
        this._context      = args.canvas.getContext('2d');
        this._fontFace     = this._fontLoose;
        this._screenWidth  = args.screenWidth;
        this._screenHeight = args.screenHeight;
        this._hOffset      = args.horizontalOffset;
        this._vOffset      = args.verticalOffset;
        this._fgColor      = args.foregroundColor;
        this._fgGlow       = colorToHex(args.foregroundGlowColor);
        this._fgGlowRadius = args.foregroundGlowRadius;
        this._postProcess  = args.postProcessor;

        /* Create buffer */
        this.reset();

        /* Create screen background */
        var width    = (this._screenWidth  + this._hOffset*2)*this._fontFace.zoomedCharWidth,
            height   = (this._screenHeight + this._vOffset*2)*this._fontFace.zoomedCharHeight,
            centerX  = width*0.5,
            centerY  = height*0.85,
            radius   = Math.max(centerX, centerY)*1.6,
            gradient = this._context.createRadialGradient(centerX, centerY, 0.0,
                                                          centerX, centerY, radius);
        gradient.addColorStop(0, args.backgroundColor0);
        gradient.addColorStop(1, args.backgroundColor1);
        this._bgColor = gradient;

        /* Set canvas size */
        args.canvas.width  = width;
        args.canvas.height = height;

        /* Store public static values */
        this.printables = args.fontFace.printables;
        this.width  = width;
        this.height = height;
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.reset = function ()
    {
        this._rowIndex = 0;
        this._colIndex = 0;
        this._buffer   = [''];
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.setZoom = function (value)
    {
        /* If 1px == 1px */
        if (value === 1)
        {
            this._zoom = 2;
            this._fontFace.setCharZoom(1);
        }
        /* If 1px == 2px */
        else if (value === 2)
        {
            this._zoom = 1;
            this._fontFace.setCharZoom(2);
        }
        /* If invalid value */
        else
            return;

        /* Since the buffer has been reconfigured, reset everything */
        this.reset();
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.setSpan = function (value)
    {
        /* If add extra lines after each line */
        if (value)
        {
            this._span = 1;
            this._fontFace = this._fontLoose;
        }
        /* If don't add extra lines */
        else
        {
            this._span = 2;
            this._fontFace = this._fontTight;
        }

        /* Set current zoom settings as well */
        this._fontFace.setCharZoom(this._zoom === 1 ? 2 : 1);

        /* Since the buffer has been reconfigured, reset everything */
        this.reset();
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.newLine = function ()
    {
        this._colIndex = 0;
        this._buffer.push('');
        if ((this._rowIndex + 1) < this._screenHeight*this._zoom*this._span)
            this._rowIndex++;
        else
            this._buffer.shift();
        /* Indicate the buffer was changed */
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.write = function (text)
    {
        var i = 0,
            line,
            length,
            textLength   = text.length,
            buffer       = this._buffer,
            colIndex     = this._colIndex,
            rowIndex     = this._rowIndex,
            screenWidth  = this._screenWidth*this._zoom,
            screenHeight = this._screenHeight*this._zoom*this._span,
            colLeft      = screenWidth - colIndex;

        /* Wrap lines and extend buffer */
        do
        {
            /* Get line as a slice from the input text */
            line   = text.slice(i, colLeft);
            length = line.length;
            /* If line is empty (nothing to add to existing line) */
            if (!length)
                break;
            /* If row does not exist */
            if (buffer[rowIndex] === undefined)
                buffer[rowIndex] = '';
            /* Fill remaining spaces from the input text */
            buffer[rowIndex] += line;
            /* Update values */
            i        += length;
            colLeft  += length;
            colIndex += length;
            /* If reached the left edge of the screen */
            if (colIndex >= screenWidth)
            {
                /* If reached the bottom edge of the screen */
                if ((rowIndex + 1) < screenHeight)
                    rowIndex++;
                else
                    buffer.shift();
                colIndex = 0;
            }
        }
        while (i < textLength);

        /* Update position values */
        this._rowIndex = rowIndex;
        this._colIndex = colIndex;

        /* Indicate the buffer was changed */
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.popChar = function (count)
    {
        /* If there is nothing to pop */
        if (!count)
            return;

        var lineCount = Math.floor(count/(this._screenWidth*this._zoom)),
            charCount = count%(this._screenWidth*this._zoom);

        /* If popping whole line(s) */
        if (lineCount)
            this.popLine(lineCount);

        /* Get current line */
        var line = this._buffer[this._rowIndex];
        /* If line is valid */
        if (line !== undefined)
        {
            /* Remove chars from the end of the line */
            line = line.slice(0, line.length - charCount);
            /* If there are characters in the line */
            if (line.length)
                this._buffer[this._rowIndex] = line;
            /* If there are no characters in the line and
               this is not the only line in the buffer */
            else if (this._buffer.length > 1)
            {
                this._buffer.pop();
                --this._rowIndex;
            }
        }
        /* Indicate if the buffer changed */
        this._isBufferChanged = Boolean(lineCount || line);
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.popLine = function (count)
    {
        /* If there is nothing to pop */
        if (!count)
            return;

        this._buffer   = this._buffer.slice(0, -count);
        this._rowIndex = this._buffer.length ? this._buffer.length - 1 : 0;
        /* Indicate the buffer was changed */
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype._prepareContext = function (context)
    {
        /* Create background */
        context.fillStyle = this._bgColor;
        context.fillRect(0, 0, this.width, this.height);

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
                hOff     = this._hOffset,
                vOff     = this._vOffset,
                rowIndex = this._rowIndex,
                buffer   = this._buffer,
                context  = this._context,
                fontFace = this._fontFace,
                chrW     = fontFace.zoomedCharWidth,
                chrH     = fontFace.zoomedCharHeight,
                scrW     = this._screenWidth*this._zoom,
                scrH     = this._screenHeight*this._zoom*this._span;

            /* Set styles of context */
            this._prepareContext(context);

            /* Render all characters of all lines in the buffer */
            for (i=0; i<buffer.length; i++)
            {
                line = buffer[i];
                row = (i + vOff)*chrH;
                for (j=0; j<line.length; j++)
                    fontFace.renderCharAt(line[j], context, (j + hOff)*chrW, row);
            }

            /* Place cursor */
            fontFace.renderCharAt('block', context, (j + hOff)*chrW, row);

            /* Use psot-processor if there is any */
            if (this._postProcess)
            {
                context.putImageData(
                    this._postProcess(
                        context.getImageData(0, 0, this.width, this.height),
                        context.createImageData(this.width, this.height),
                        this.width,
                        this.height),
                    0, 0);
            }

            /* Update buffer change indicator */
            this._isBufferChanged = false;
        }
        // console.log('[DONE] screen rendered', buffer);
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.scr =
    {
        Screen : Screen,
    };
})();
