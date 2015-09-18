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
                           /* 0123456789012345678901234567890123456789 */
            std.io.writeLine('Programming languages you are good at');
            std.io.write('(optional): ');
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
    function getCity(std, input)
    {
        switch (input)
        {
            case 's':
            case 'S':
            case 'sz':
            case 'Sz':
            case 'SZ':
            case 'szeged':
            case 'Szeged':
            case 'SZEGED':
                FORM.city = 'szeged';
                break;

            default:
                FORM.city = 'budapest';
                break;
        }
        std.io.write('Your name: ');
        std.io.setReader(getName);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function getRole(std, input)
    {
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
                break;
        }

        std.io.write('Which location do you choose Budapest or Szeged? [B/s] ');
        std.io.setReader(getCity);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function getTerm(std, input)
    {
        if (std.lib.yesOrNo(input))
            std.lib.openPopUp('https://github.com/kitchenbudapest/' +
                              'openpage/blob/gh-pages/etc/'         +
                              'terms_and_conditions.md');
        std.io.writeLine('Please fill the following form ' +
                         'to apply to the kibu hackathon event!');
        std.io.writeLine('');
        std.io.write('Which role fits you: programmer or entrepreneur? [P/e] ');
        std.io.setReader(getRole);
        return true;
    }


    /*------------------------------------------------------------------------*/
    function main(std, argv)
    {
        FORM = {from: 'term'};
                       /* 0123456789012345678901234567890123456789 */
        std.io.writeLine('By registering through the next form,');
        std.io.writeLine('you accept the terms and conditions of');
        std.io.writeLine('the hackathon.');
        std.io.write('Do you want to read it first? [Y/n] ');
        std.io.setReader(getTerm);
        return true;
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
