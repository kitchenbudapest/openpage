/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var PRINTABLES = g.font.VT220.printables;


    /*------------------------------------------------------------------------*/
    function Shell(frame,
                   context,
                   distort)
    {
        /* Welcome message after 'boot' */
        this._INTRO =
        [
            '  ##########',
            '  ##      ##  KITCHEN',
            '  ##      ##  BUDAPEST',
            '  ##      ##  Powered by *T**',
            '  ##########',
            '',
        ];
        /* Prompt String One */
        this._PS1   = '[visitor@kibu ~] $ ';

        /* Set shell buffer */
        this._index   = 0;
        this._history = [''];

        /* Define distortion function */


        /* Create fonts */
        var fg = [194, 255, 206];
        this._fontTight = new g.font.VT220({fillColor  : fg,
                                             charHeight : 0});
        this._fontLoose = new g.font.VT220({fillColor  : fg,
                                             charHeight : 1});

        /* Create screen */
        this._scr = new g.scr.Screen({context              : context,
                                      fontFace             : this._fontLoose,
                                      charWidth            : 2*g.font.VT220.charWidth,
                                      charHeight           : 2*g.font.VT220.charHeight,
                                      screenWidth          : 41,
                                      screenHeight         : 10,
                                      horizontalOffset     : 1.5,
                                      verticalOffset       : 0.85,
                                      backgroundColor0     : '#303030',
                                      backgroundColor1     : '#080808',
                                      foregroundColor      : fg,
                                      foregroundGlowColor  : [154, 254, 174],
                                      foregroundGlowRadius : 3,
                                      postProcessor        : distort});

        /* Create standard input/output operations */
        this._stdio =
        {
            write     : this._scr.write.bind(this._scr),
            /* The reader function should return `true` if the program
               still waiting for inputs from teh user */
            setReader : (function (reader)
            {
                this._readerHistory = '';
                this._reader        = reader;
            }).bind(this),
            writeLine : (function (text)
            {
                this._scr.write(text);
                this._scr.newLine();
            }).bind(this),
            yesOrNo   : (function (input)
            {
                switch (input)
                {
                    case '':
                    case 'y':
                    case 'Y':
                    case 'yes':
                    case 'Yes':
                    case 'YES':
                        return true;

                    case 'n':
                    case 'N':
                    case 'no':
                    case 'No':
                    case 'NO':
                        return false;

                    default:
                        this._scr.write('Invalid input: ' + input);
                        this._scr.newLine();
                        return null;
                }
            }).bind(this),
            openPopUp : (function (url)
            {
                var urlOpener = function ()
                {
                    window.open(url);
                    /* TODO: make it work with `attachEvent` as well */
                    frame.removeEventListener('click', urlOpener, false);
                    this._urlOpener = undefined;
                };
                /* If there's already an event listener */
                if (this._urlOpener)
                    frame.removeEventListener('click', this._urlOpener, false);
                frame.addEventListener('click', urlOpener, false);
                this._urlOpener = urlOpener;

                /* Write instructions on the screen */
                this._scr.newLine();
                this._scr.write('==> CLICK HERE TO OPEN LINK!');
                this._scr.newLine();
                this._scr.newLine();
            }).bind(this),
            // lock    : ,
            // release : ,
        };

        /* Prompt to the user for the first time */
        this._resetAndWriteMultiLine(this._INTRO);
        this._scr.write(this._PS1);
        this._scr.render();
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype.onKeyDown = function (event)
    {
        /* Handle special keys */
        switch (event.which || event.keyCode)
        {
            case g.kb.code.Return:
                this._scr.newLine();
                /* If a program is running */
                if (this._reader)
                {
                    /* If user did not set a new reader callback */
                    if (!this._reader(this._stdio, this._readerHistory))
                    {
                        /* Remove callback and return to prompt */
                        this._reader = undefined;
                        this._scr.write(this._PS1);
                    }
                    /* Clear input history */
                    this._readerHistory = '';
                }
                /* If only the shell is running */
                else
                {
                    /* Execute program, and create a new entry in history */
                    this._execute(this._history[this._index++]);
                    this._history[this._index] = '';
                }
                break;

            case g.kb.code.BackSpace:
                var line = this._history[this._index];
                line = line.slice(0, line.length - 1);
                this._history[this._index] = line;
                this._scr.popChar(1);
                break;

            default:
                return;
        }
        this._scr.render();
        event.preventDefault();
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype.onKeyPress = function (event)
    {
        var scr  = this._scr,
            char = String.fromCharCode(event.which || event.keyCode);

        /* If no modifiers pressed */
        if (!(event.ctrlKey ||
              event.altKey  ||
              event.metaKey))
                event.preventDefault();

        if (PRINTABLES.indexOf(char) === -1)
            return;

        /* If a program is running and waiting for input */
        if (this._reader)
            this._readerHistory += char;
        else
            this._history[this._index] += char;

        /* Write the written character */
        scr.write(char);
        scr.render();
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._resetAndWriteMultiLine = function (msg)
    {
        var scr = this._scr;
        scr.reset();
        for (var i=0; i<msg.length; i++)
        {
            scr.write(msg[i]);
            scr.newLine();
        }
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._poweroff = function (argv)
    {
        var scr = this._scr;
        scr.write('VT100 is rebooting now...');
        scr.newLine();
        scr.write('See you on the other side!');
        this._resetAndWriteMultiLine(this._INTRO);
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._execute = function (input)
    {
        /* Separate command name and arguments */
        var program,
            argv    = input.split(' '),
            command = argv[0];
        argv.shift();

        /* Execute command or alias of command */
        switch (command)
        {
            /* If no input */
            case '':
                break;

            /* If clear screen */
            case 'del':
            case 'clean':
            case 'clear':
            case 'reset':
                this._scr.reset();
                break;

            /* If (fake) reboot system */
            case 'kill':
            case 'halt':
            case 'reboot':
            case 'shutdown':
            case 'poweroff':
                program = this._poweroff.bind(this);
                break;

            /* If change from interactive mode to static text */
            case 'skip':
            case 'exit':
            case 'quit':
            case 'close':
            case 'break':
            case 'leave':
                break;

            /* If looking for available commands */
            case 'ls':
            case 'help':
            case 'info':
            case 'more':
                program = g.bin.help;
                break;

            /* Apply to the hackathon */
            case 'join':
            case 'apply':
            case 'register':
                program = g.bin.apply;
                break;

            /* Read the documentation of the hackathon */
            case 'doc':
            case 'docs':
            case 'wiki':
            case 'document':
            case 'documents':
            case 'hackathon':
                program = g.bin.doc;
                break;

            /* Get the address of the hackathon */
            case 'addr':
            case 'address':
            case 'location':
                program = g.bin.addr;
                break;

            /* Get the date of the hackathon */
            case 'date':
            case 'time':
            case 'calendar':
                program = g.bin.date;
                break;

            /* What will be the prize */
            case 'award':
            case 'prize':
            case 'winner':
            case 'victory':
                program = g.bin.award;
                break;



            /* Easter-eggs */
            case '_':
            case 'hidden':
                program = g.bin.hidden;
                break;

            case 'man':
                program = g.bin.man;
                break;

            case 'kibu':
            case 'kitchen':
            case 'kitchenbudapest':
                program = g.bin.kibu;
                break;

            case 'git':
            case 'repo':
            case 'github':
            case 'repository':
            case 'opensource':
                program = g.bin.git;
                break;

            case 'what':
            case 'vt100':
            case 'VT100':
                program = g.bin.what;
                break;

            case 'get':
            case 'fork':
            case 'patch':
                program = g.bin.fork;
                break;

            case 'su':
            case 'sudo':
            case 'author':
                program = g.bin.su;
                break;

            case '42':
            case 'fortytwo':
                program = g.bin.fortytwo;
                break;

            case 'zoom':
                program = g.bin.zoom;
                break;

            case 'line':
            case 'height':
                program = g.bin.line;
                break;

            /* Command is not listed above */
            default:
                this._scr.write('shell: ' + command + ': command not found');
                this._scr.newLine();
                break;
        }

        /* Run program is program is a function */
        if (program)
            program(this._stdio, argv);

        /* If no program is waiting for user input */
        if (!this._reader)
        {
            /* Return to the command prompt */
            this._scr.write(this._PS1);
            this._scr.render();
        }
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.shell =
    {
        Shell : Shell,
    };
})();
