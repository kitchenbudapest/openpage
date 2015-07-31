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
        /* Collect last input */
        FORM.lang = input;

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
                /* Print fields which have errors */
                var keys = Object.keys(response.message);
                std.io.writeLine('Oups, error(s) occured in ' +
                                 keys.join(', ') + ':');

                /* Print errors of the fields */
                for (var i=0; i<keys.length; i++)
                    std.io.writeLine(keys[i] + ': ' + response.message[keys[i]]);
            }
            /* If everything went fine */
            else
                std.io.writeLine("Thank you, we have received your "     +
                                 "application! If you are a developer, " +
                                 "don't forget to type in: 'doc'");

            /* Release I/O */
            std.io.release();
        });
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
        std.io.write('Are you a programmer or entrepreneur? [P/e] ');
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
