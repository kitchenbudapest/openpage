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

        /* Create screen */
        this._scr = new g.scr.Screen({context              : context,
                                      fontFace             : g.font.VT220,
                                      screenWidth          : 41,
                                      screenHeight         : 10,
                                      horizontalOffset     : 1.5,
                                      verticalOffset       : 0.85,
                                      backgroundColor0     : '#303030',
                                      backgroundColor1     : '#080808',
                                      foregroundColor      : [194, 255, 206],
                                      foregroundGlowColor  : [154, 254, 174],
                                      foregroundGlowRadius : 3,
                                      postProcessor        : distort});

        /* Create standard input/output operations */
        this._std =
        {
            io:
            {
                /* The reader function should return `true` if the program
                   still waiting for inputs from teh user */
                setReader  : (function (reader)
                {
                    this._readerHistory = '';
                    this._reader        = reader;
                }).bind(this),
                clear      : this._scr.reset.bind(this._scr),
                write      : this._scr.write.bind(this._scr),
                writeLine  : (function (text)
                {
                    this._scr.write(text);
                    this._scr.newLine();
                }).bind(this),
                // lock    : ,
                // release : ,
            },
            lib:
            {
                yesOrNo    : (function (input)
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
                invalidArg : (function (command, option)
                {
                    this._scr.write(command + ": unrecognized option '" +
                                    (option || '') + "'");
                    this._scr.newLine();
                    this._scr.write("Try 'man " + command + "' for more information");
                    this._scr.newLine();
                }).bind(this),
                openPopUp  : (function (url)
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
            },
        };

        /* Install built-in programs */
        var name = 'clear',
        desc = 'clear the terminal screen';
        g.install(name,
        {
            main : this._scr.reset.bind(this._scr),
            desc : desc,
            man  : (function ()
            {
                this._scr.write(name);
                this._scr.newLine();
                this._scr.write('  ' + desc);
                this._scr.newLine();
            }).bind(this),
        },
        [
            'del',
            'clean',
            'reset',
        ]);

        name = 'reboot';
        desc = 'reboot the machine';
        g.install(name,
        {
            main : this._poweroff.bind(this),
            desc : desc,
            man  : (function ()
            {
                this._scr.write(name);
                this._scr.newLine();
                this._scr.write('  ' + desc);
                this._scr.newLine();
            }).bind(this),
        },
        [
            'kill',
            'halt',
            'poweroff',
            'shutdown',
        ], true);

        // name = 'exit';
        // desc = '';
        // g.install(name,
        // {
        //     main : ,
        //     desc : desc,
        //     man  : (function ()
        //     {
        //         this._scr.write(name);
        //         this._scr.newLine();
        //         this._scr.write('  ' + desc);
        //         this._scr.newLine();
        //     }).bind(this),
        // },
        // [
        //     'skip',
        //     'quit',
        //     'close',
        //     'break',
        //     'leave',
        // ]);

        // name = 'apply';
        // desc = '';
        // g.install(name,
        // {
        //     main : ,
        //     desc : desc,
        //     man  : (function ()
        //     {
        //         this._scr.write(name);
        //         this._scr.newLine();
        //         this._scr.write('  ' + desc);
        //         this._scr.newLine();
        //     }).bind(this),
        // },
        // [
        //     'join',
        //     'register',
        // ]);

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
                    if (!this._reader(this._std, this._readerHistory))
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
                var line;
                /* If a program is running */
                if (this._reader)
                {
                    line = this._readerHistory;
                    this._readerHistory = line.slice(0, line.length - 1);
                }
                /* If only the shell is running */
                else
                {
                    line = this._history[this._index];
                    line = line.slice(0, line.length - 1);
                    this._history[this._index] = line;
                }
                /* Remove character from teh screen */
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

        /* If not empty string */
        if (command)
        {
            program = g.bin(command).main;
            /* If command is a valid program, run it */
            if (program instanceof Function)
                program(this._std, argv);
            /* If program does not exist */
            else
            {
                this._scr.write('shell: ' + command + ': command not found');
                this._scr.newLine();
            }
        }

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
