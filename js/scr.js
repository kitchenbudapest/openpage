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
    function Screen(args) /* context,
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
        /* Create and store characters */
        this._zoom = 2;
        this._fontTight = new args.fontFace({fillColor : args.foregroundColor,
                                             charSpan  : 0,
                                             charZoom  : this._zoom});
        this._fontLoose = new args.fontFace({fillColor : args.foregroundColor,
                                             charSpan  : 1,
                                             charZoom  : this._zoom});

        /* Store static values */
        this._context      = args.context;
        this._fontFace     = this._fontLoose;
        this._charWidth    = this._zoom*args.fontFace.charWidth;
        this._charHeight   = this._zoom*args.fontFace.charHeight;
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
        var width    = (args.screenWidth + args.horizontalOffset*2)*this._charWidth*2,
            height   = (args.screenHeight + args.verticalOffset*2)*this._charHeight*2,
            centerX  = width*0.5,
            centerY  = height*0.85,
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
    Screen.prototype.reset = function ()
    {
        this._rowIndex = 0;
        this._colIndex = 0;
        this._buffer   = [''];
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.newLine = function ()
    {
        this._colIndex = 0;
        this._buffer.push('');
        if (this._rowIndex >= this._screenHeight)
            this._buffer.shift();
        else
            this._rowIndex++;
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
            screenWidth  = this._screenWidth,
            screenHeight = this._screenHeight,
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
                if (rowIndex >= screenHeight)
                    buffer.shift();
                else
                    rowIndex++;
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

        var lineCount = Math.floor(count/this._screenWidth),
            charCount = count%this._screenWidth;

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
                rowIndex = this._rowIndex,
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
    };
})();
