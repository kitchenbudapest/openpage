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
        this._rowIndex = 0;
        this._colIndex = 0;
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
            colLeft,
            buffer       = this._buffer,
            colIndex     = this._colIndex,
            rowIndex     = this._rowIndex,
            screenWidth  = this._screenWidth,
            screenHeight = this._screenHeight;

        /* Wrap lines and extend buffer */
        do
        {
            /* Get remaining columns of the current line */
            colLeft = screenWidth - colIndex;
            /* If row does not exist */
            if (buffer[rowIndex] === undefined)
                buffer[rowIndex] = '';
            /* Get line as a slice from the input text */
            line = text.slice(i, colLeft);
            /* If line is empty (nothing to add to existing line) */
            if (!line)
                break;
            /* Fill remaining spaces from the input text */
            buffer[rowIndex] += line;
            /* Update values */
            i += colLeft;
            colIndex += line.length;
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
        while (i < text.length);

        /* Update position values */
        this._rowIndex = rowIndex;
        this._colIndex = colIndex;

        /* Indicate the buffer was changed */
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.popChar = function (count)
    {
        // var len = this._buffer.length,
        //     i   = len ? len - 1 : 0;
        // this._buffer[i] = this._buffer[i].slice(0, -count) || '';
        // if (!this._buffer[i] &&
        //     len !== 1)
        //     this._buffer.pop();
        var line,
            lineCount = Math.floor(count/this._screenWidth),
            charCount = count%this._screenWidth;
        if (lineCount)
            this.popLine(lineCount);

        line = this._buffer[this._rowIndex];
        if (line !== undefined)
        {
            line = line.slice(0, line.length - charCount);
            if (!line &&
                this._buffer.length > 1)
            {
                this._buffer.pop();
                --this._rowIndex;
            }
            else
                this._buffer[this._rowIndex] = line;

        }
        this._isBufferChanged = true;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Screen.prototype.popLine = function (count)
    {
        this._buffer   = this._buffer.slice(0, -count);
        this._rowIndex = this._buffer.length ? this._buffer.length - 1 : 0;
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

            console.log(buffer);

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
    }
})();
