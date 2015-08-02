/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var FORM,
        PROG = 'programmer',
        NAME = 'apply',
        DESC = 'apply to the hackathon event';


    /*------------------------------------------------------------------------*/
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }


    /*------------------------------------------------------------------------*/
    function sendForm(std)
    {
        /* Lock I/O */
        std.io.lock();
        /* Report to user */
        std.io.writeLine('Sending request...');

        /* Send registration */
        g.register.register(FORM, function (response)
        {
            /* Report to user */
            std.io.writeLine('Data received, processing...');
            std.io.newLine();

            /* If there was an error */
            if (!response.response)
            {
                var message = response.message;

                /* If message is not an object */
                if (!(message instanceof Object))
                    /* Make it an object */
                    message = {server: message};

                /* Print fields which have errors */
                var keys = Object.keys(message);
                std.io.writeLine('Oups, error(s) occured in ' +
                                 keys.join(', ') + ':');

                /* Print errors of the fields */
                for (var i=0; i<keys.length; i++)
                    std.io.writeLine(keys[i] + ': ' + message[keys[i]]);
            }
            /* If everything went fine */
            else
            {
                std.io.writeLine('Thank you, we have received your application!');
                if (FORM.role === PROG)
                    std.io.writeLine('Do not forget to type in: `doc`!');
            }

            /* Release I/O */
            std.io.release();
        });
    }


    /*------------------------------------------------------------------------*/
    function getLang(std, input)
    {
        /* Collect last input */
        FORM.lang = input;
        sendForm(std);
    }


    /*------------------------------------------------------------------------*/
    function getMail(std, input)
    {
        FORM.mail = input;

        /* If user is a programmer */
        if (FORM.role === PROG)
        {
            std.io.write('Programming languages you are good at (optional): ');
            std.io.setReader(getLang);
            return true;
        }

        /* If user is other */
        sendForm(std);
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
    function getRole(std, input)
    {
        FORM.role = input;
        switch (input)
        {
            case 'e':
            case 'E':
            case 'entrepreneur':
            case 'Entrepreneur':
            case 'ENTREPRENEUR':
                FORM.role = 'entrepreneur';
                break;

            default:
                FORM.role = 'programmer';
        }

        std.io.write('Your name: ');
        std.io.setReader(getName);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        FORM = {};
        std.io.writeLine('Please fill the following form ' +
                         'to apply to the kibu hackathon event!');
        std.io.write('Which role fits you: programmer or entrepreneur? [P/e] ');
        std.io.setReader(getRole);
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
