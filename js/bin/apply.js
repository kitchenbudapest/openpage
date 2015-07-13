/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var FORM,
        NAME = 'apply',
        DESC = 'central github repo of Kibu';

    /*------------------------------------------------------------------------*/
    function ajax(args)
    {
        /* Get/set values based on arguments */
        if (args.connectionType !== 'GET' &&
            args.connectionType !== 'POST')
            throw new TypeError("Invalid 'connectionType' for AJAX request");
        var connectionType = args.connectionType;

        if (typeof args.connectionURL !== 'string' &&
            !(args.connectionURL instanceof String))
            throw new TypeError("'connectionURL' is not a string");
        var connectionURL = args.connectionURL;

        if (typeof args.onSuccess !== 'function')
            throw new TypeError("'onSuccess' is not a function");
        var onSuccess = args.onSuccess;

        if (typeof args.onFailure !== 'function')
            throw new TypeError("'onFailure' is not a function");
        var onFailure = args.onFailure;

        if (typeof args.onError !== 'function')
            throw new TypeError("'onError' is not a function");
        var onError = args.onError;

        /* Create a new AJAX request */
        var request = new XMLHttpRequest();
        // request.withCredentials = true;
        request.open(connectionType, connectionURL, true);

        /* Bind callback if response has been loaded */
        request.addEventListener('load',
            function ()
            {
                /* On success */
                if (request.status >= 200 && request.status < 400)
                    onSuccess(request);
                /* On failure */
                else
                    onFailure(request);
            });

        /* Bind callback if there has been an error */
        request.addEventListener('error', onError.bind(undefined, request));

        /* Trigger AJAX request */
        request.send();
    }


    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function getLangPref(std, input)
    {
        FORM.lang = input;

        ajax({connectionType : 'POST',
              connectionURL  : 'http://devops.kibu.hu/hackatonForm',
              onSuccess: function (request)
              {
                  response = JSON.parse(request.response);
                  console.log(response);
                  // std.io.writeLine('Data has been sent');
              },
              onFailure: function (request)
              {
                  std.io.writeLine('Could not send data (failure)');
              },
              onError: function (request)
              {
                  std.io.writeLine('Could not send data (error)');
              }});
    }


    /*------------------------------------------------------------------------*/
    function getMailAddr(std, input)
    {
        FORM.mail = input;
        std.io.write('Your language: ');
        std.io.setReader(getLangPref);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function getNickName(std, input)
    {
        FORM.name = input;
        std.io.write('Your mail: ');
        std.io.setReader(getMailAddr);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        FORM = {};
        std.io.write('Your name: ');
        std.io.setReader(getNickName);
    }

    /*------------------------------------------------------------------------*/
    /* Export program */
    g.install(NAME,
    {
        main : main,
        man  : man,
        desc : DESC,
    },
    [
        'join',
        'register',
    ]);
})();
