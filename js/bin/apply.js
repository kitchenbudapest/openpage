/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var FORM,
        CREF = 0,
        NAME = 'apply',
        DESC = 'apply to the hackathon event';


    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function getLang(std, input)
    {
        FORM.lang = input;

        var cref   = 'apply' + (CREF++).toString();
        var head   = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = 'http://devops.kibu.hu/hackatonForm' +
                     '?name='     + FORM.name      +
                     '&mail='     + FORM.mail      +
                     '&lang='     + input          +
                     '&callback=' + cref;

        /* JSONP callback */
        window[cref] = function (response)
        {
            /* Report to user */
            std.io.writeLine('Data received, processing...');
            std.io.newLine();

            /* If there was an error */
            if (!response.response)
                std.io.writeLine('Oups, an error occured: ' + response.message);
            /* If everything went fine */
            else
                std.io.writeLine("Thank you, we have received your "     +
                                 "application! If you are a developer, " +
                                 "don't forget to type in: 'doc'");

            /* Release I/O */
            std.io.release();

            /* Clean up */
            head.removeChild(script);
            delete window[cref];
        };

        /* Lock I/O */
        std.io.lock();
        /* Report to user */
        std.io.writeLine('Sending request...');

        /* Trigger event */
        head.appendChild(script);
    }


    /*------------------------------------------------------------------------*/
    function getMail(std, input)
    {
        FORM.mail = input;
        std.io.write('Programming languages you are good at (optional): ');
        std.io.setReader(getLang);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function getName(std, input)
    {
        FORM.name = input;
        std.io.write('Your mail: ');
        std.io.setReader(getMail);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        FORM = {};
        std.io.writeLine('Please fill the following form ' +
                         'to apply to the kibu hackathon event!');
        std.io.write('Your name: ');
        std.io.setReader(getName);
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
