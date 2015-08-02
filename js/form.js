/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /* Module level constants */
    var EVENTS =
        [
            'focus',
            'click',
            //'mousedown'
        ],
        ERROR  = 0,
        ERRORS =
        [
            'Oopsie, Daisy!',
            'Holy Moly!',
            'Noooooo!',
            'Darn it!',
            'Oh, heck!',
            "That's a bummer!",
            'Wel, well, well...',
            'Oh-My-Blob!',
        ];



    /*------------------------------------------------------------------------*/
    function Form(inputs,
                  inputFrames,
                  send,
                  error,
                  errorFrame,
                  classes)
    {
        /* Store static values */
        this._inputs      = inputs;
        this._inputFrames = inputFrames;
        this._error       = error;
        this._errorFrame  = errorFrame;
        this._errorInputs = 0;
        this._classes     = classes;

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
        var p,
            div,
            error      = this._error,
            errorFrame = this._errorFrame;

        /* Reset error frame's content */
        errorFrame.innerHTML = '';


        /* If everything went fine */
        if (response.response)
        {
            /* Feedback header */
            p = document.createElement('p');
            p.innerHTML = 'Brilliant, thank you!';
            errorFrame.appendChild(p);

            div = document.createElement('div');

            p = document.createElement('p');
            p.innerHTML = 'note:';
            div.appendChild(p);

            p = document.createElement('p');
            p.innerHTML = 'We are sending you a feedback mail to your address. ' +
                          'If the message does not appear in your inbox in the next ' +
                          '5 minutes, please contact use, at hello@kitchenbudapest.hu';
            div.appendChild(p);

            errorFrame.appendChild(div);
        }
        /* If something went wrong */
        else
        {

            /* Generic error header */
            p = document.createElement('p');
            p.innerHTML = ERRORS[ERROR++ % ERRORS.length];
            errorFrame.appendChild(p);

            var input,
                inputFrame,
                message = response.message;

            /* If message is not an object */
            if (!(message instanceof Object))
                /* Make it an object */
                message = {server: message};

            /* Get/set variables and local references */
            var i,
                j,
                key,
                errorInputs = [],
                inputs      = this._inputs,
                classes     = this._classes,
                inputFrames = this._inputFrames,
                keys        = Object.keys(message),
                backToBasic = function (input,
                                        inputFrame)
                {
                    /* Change input back to basic */
                    return function ()
                    {
                        var i = errorInputs.indexOf(input);

                        /* If input already removed */
                        if (i === -1)
                            return;
                        /* Remove input */
                        else
                            errorInputs.splice(i, 1);

                        /* Switch class back to basics */
                        input.className      =
                        inputFrame.className = classes.basic;

                        /* Remove listener */
                        for (j=0; j<EVENTS.length; j++)
                            if (input.removeEventListener)
                                input.removeEventListener(EVENTS[j], backToBasic, false);
                            else
                                input.detachEvent('on' + EVENTS[j], backToBasic);

                        /* Remove error area if this was the last input */
                        if (!errorInputs.length)
                            error.removeChild(errorFrame);
                    };
                };

            /* Write out messages, change styles and set event handlers */
            for (i=0; i<keys.length; i++)
            {
                key = keys[i];
                div = document.createElement('div');

                p = document.createElement('p');
                p.innerHTML = key + ':';
                div.appendChild(p);

                p = document.createElement('p');
                p.innerHTML = message[key];
                div.appendChild(p);

                input      = inputs[key];
                inputFrame = inputFrames[key];
                if (inputFrame)
                {
                    input.className      =
                    inputFrame.className = classes.error;

                    for (j=0; j<EVENTS.length; j++)
                        if (input.addEventListener)
                            input.addEventListener(EVENTS[j],
                                                   backToBasic(input, inputFrame),
                                                   false);
                        else
                            input.attachEvent('on' + EVENTS[j],
                                              backToBasic(input, inputFrame));
                    /* Collect input */
                    errorInputs.push(input);
                }
                errorFrame.appendChild(div);
            }
        }
        /* Inform user, render message */
        error.appendChild(errorFrame);

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
