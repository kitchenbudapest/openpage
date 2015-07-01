/* INFO **
** INFO */

/* Get or set globals */
var g = g || {};

/*----------------------------------------------------------------------------*/
(function ()
{
    'use strict';
    var MODULE_NAME = 'vt100';


    /*------------------------------------------------------------------------*/
    function VT100(parameters)
    {
        this._context = parameters.context;
        this._width   = parameters.width;
        this._height  = parameters.height;
        this._colors =
        {
            background : '#222222',
            foreground : '#7FF29F',
            glow       : '#C2FFD3',
            glowSize   : 4,
            font       : 'VT323',
            fontSize   : '17pt',
        };
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    VT100.prototype.render = function (buffer)
    {
        var width   = this._width,
            height  = this._height,
            colors  = this._colors,
            context = this._context;

        /* Draw background */
        context.fillStyle = colors.background;
        context.fillRect(0, 0, width, height);

        /* Draw text */
        context.fillStyle   = colors.foreground;
        context.shadowBlur  = colors.glowSize;
        context.shadowColor = colors.glow;

        /* Distort rendered image */
        context.putImageData(barrel(
        {
            frontBuffer: context.getImageData(0, 0, width, height),
            backBuffer : context.createImageData(width, height),
            width      : width,
            height     : height
        }), 0, 0);
    };


    /*------------------------------------------------------------------------*/
    /* Export objects to globals */
    g[MODULE_NAME] =
    {
        VT100: VT100,
    };
})();
