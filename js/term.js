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

        /* Add event listener to it */
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
        this._shell.boundEventCallbacks();

        /* Event focus */
        this._hasFocus   = false;
        this._eventOwner = eventOwner;
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
        parent.insertBefore(this._clicker, firstElement);
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.term =
    {
        VT100 : VT100,
    };
})();
