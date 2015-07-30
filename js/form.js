/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /* Module level constants */
    var EVENTS = ['focus', 'click', /*'mousedown'*/];

    /*------------------------------------------------------------------------*/
    function Form(inputs, send)
    {
        this._inputs = inputs;

        /* Set click event to send */
        if (send.addEventListener)
            send.addEventListener('click', this._onSendClicked.bind(this), false);
        else
            send.attachEvent('click', this._onSendClicked.bind(this));
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype._manageEventListeners = function (add,
                                                     callback)
    {
        /* If adding event handlers */
        if (add)
        {
            std = 'addEventListener';
            alt = 'attachEvent';
        }
        /* If removing event handlers */
        else
        {
            std = 'removeEventListener';
            alt = 'detachEvent';
        }

        /* Manage event handlers on all inputs */
        var i,
            j,
            inputs = this._inputs,
            keys   = Object.keys(inputs);
        for (i=0; i<keys.length; i++)
        {
            input = inputs[keys[i]];
            if (input)
                if (input[std])
                    for (j=0; j<EVENTS.length; j++)
                        input[std](EVENTS[j], callback, false);
                else
                    for (j=0; j<EVENTS.length; j++)
                        input[alt]('on' + EVENTS[j], callback);
        }
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype.setEventListeners = function ()
    {
        this._manageEventListeners(true, this._onDelEventListeners);
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype.delEventListeners = function ()
    {
        this._manageEventListeners(false);
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype.setEventListenerDeleterCallback = function (callback)
    {
        this._onDelEventListeners = callback;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    VT100.prototype._onSendClicked = function ()
    {
        var key,
            values = {},
            inputs = this._inputs,
            keys   = Object.keys(inputs);

        /* Collect current values */
        for (var i=0; i<keys.length; i++)
        {
            key = keys[i];
            values[key] = inputs[key].value;
        }

        /* Send values to the server */
        console.log(values);
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.form =
    {
        Form : Form,
    };
})();
