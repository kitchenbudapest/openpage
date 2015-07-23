/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function VT100(onExitCallback)
    {
        /* Create canvas */
        this._canvas     = document.createElement('canvas');
        this._canvas.id  = 'terminal-display';

        /* Create image-frame */
        this._frame      = document.createElement('img');
        this._frame.src  = 'img/vt100_as_frame.002.001.png';
        this._frame.id   = 'terminal-frame';

        /* Create logo-button */
        this._logo       = document.createElement('div');
        this._logo.id    = 'terminal-logo';

        /* Create screen */
        this._screen = new g.scr.Screen({canvas               : this._canvas,
                                         fontFace             : g.font.VT220,
                                         screenWidth          : 40,  //41
                                         screenHeight         : 11,
                                         horizontalOffset     : 1.5,   //1.5,
                                         verticalOffset       : 0.4,   //0.85,
                                         backgroundColor0     : '#303030',
                                         backgroundColor1     : '#080808',
                                         foregroundColor      : [194, 255, 206],
                                         foregroundGlowColor  : [154, 254, 174],
                                         foregroundGlowRadius : 3,
                                         postProcessor        : g.postp.barrel});

        /* Create canvas-button */
        this._clicker              = document.createElement('div');
        this._clicker.id           = 'terminal-clicker';

        /* Create shell */
        this._shell  = new g.shell.Shell(this._screen,
                                         this._clicker,
                                         onExitCallback);
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    VT100.prototype.render = function (parent,
                                       listener)
    {
        /* Render elements into parent */
        parent.appendChild(this._canvas);
        parent.appendChild(this._frame);
        parent.appendChild(this._logo);
        parent.appendChild(this._clicker);

        /* Set events */
        this._logo.addEventListener('click', function ()
        {
            window.open('https://en.wikipedia.org/wiki/VT100');
        });

        /* Start running the shell */
        this._shell.run(listener);
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.term =
    {
        VT100 : VT100,
    };
})();
