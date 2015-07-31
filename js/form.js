/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /* Module level constants */
    var EVENTS = ['focus', 'click', /*'mousedown'*/];

    /*------------------------------------------------------------------------*/
    function Form(inputs,
                  send,
                  error,
                  errorFrame)
    {
        /* Store static values */
        this._inputs     = inputs;
        this._error      = error;
        this._errorFrame = errorFrame;

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
        var std,
            alt;

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
            input,
            inputs = this._inputs,
            keys   = Object.keys(inputs);
        for (i=0; i<keys.length; i++)
        {
            input = inputs[keys[i]];
            try
            {
                if (input)
                    if (input[std])
                        for (j=0; j<EVENTS.length; j++)
                            input[std](EVENTS[j], callback, false);
                    else
                        for (j=0; j<EVENTS.length; j++)
                            input[alt]('on' + EVENTS[j], callback);
            }
            catch (exception)
            {
                if (!(exception instanceof TypeError))
                    throw exception;
            }
        }
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype.setEventListeners = function ()
    {
        this._manageEventListeners(true, this._onSetEventListeners);
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype.delEventListeners = function ()
    {
        // pass
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype.setOnSetEventListeners= function (callback)
    {
        this._onSetEventListeners = callback;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype._onResponse = function (response)
    {
        console.log(response);
    };



    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype._onError = function (messages)
    {

    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Form.prototype._onSendClicked = function ()
    {
        var i,
            j,
            key,
            input,
            values = {},
            inputs = this._inputs,
            keys   = Object.keys(inputs);

        /* Collect current values */
        for (i=0; i<keys.length; i++)
        {
            key   = keys[i];
            input = inputs[key];
            if (input instanceof Array)
            {
                for (j=0; j<input.length; j++)
                    if (input[j].checked)
                    {
                        values[key] = input[j].value;
                        break;
                    }
            }
            else
                values[key] = input.value;
        }

        /* Send values to the server */
        g.register.register(values, this._onResponse.bind(this));
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.form =
    {
        Form : Form,
    };
})();
