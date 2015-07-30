/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function VT100(onExitCallback,
                   eventOwner)
    {
        /* Create canvas */
        this._canvas     = document.createElement('canvas');
        this._canvas.id  = 'header-terminal-display';

        /* Create image-frame */
        this._frame      = document.createElement('img');
        this._frame.src  = 'img/vt100_as_frame.002.001.png';
        this._frame.id   = 'header-terminal-frame';

        /* Create logo-button */
        this._logo       = document.createElement('div');
        this._logo.id    = 'header-terminal-logo';

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
        this._clicker.id           = 'header-terminal-clicker';

        /* Make clicker and event listener */
        if (this._clicker.addEventListener)
            this._clicker.addEventListener('click',
                                           this.setEventListeners.bind(this),
                                           false);
        else
            this._clicker.attachEvent('onclick',
                                      this.setEventListeners.bind(this));

        /* Create shell */
        this._shell  = new g.shell.Shell(this._screen,
                                         this._clicker,
                                         onExitCallback);

        /* Event focus */
        this._hasFocus = true;
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    VT100.prototype.setEventListeners = function ()
    {
        /* Only set event listeners when they do not exist */
        if (!this._hasFocus)
        {
            this._shell.setEventListeners(this._eventOwner);
            this._hasFocus = true;
        }
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    VT100.prototype.delEventListeners = function ()
    {
        /* Only remove event listeners, when they exist */
        if (this._hasFocus)
        {
            this._shell.delEventListeners(this._eventOwner);
            this._hasFocus = false;
        }
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    VT100.prototype.render = function (parent,
                                       listener)
    {
        /* Get first element in parent */
        var firstElement = parent.childNodes[0];

        /* Render elements into parent */
        parent.insertBefore(this._canvas , firstElement);
        parent.insertBefore(this._frame  , firstElement);
        parent.insertBefore(this._logo   , firstElement);
        parent.insertBefore(this._clicker, firstElement);

        /* Set events */
        this._logo.addEventListener('click', function ()
        {
            window.open('https://en.wikipedia.org/wiki/VT100');
        });
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.term =
    {
        VT100 : VT100,
    };
})();
