/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var BOOT_TIME  = 1500;


    /*------------------------------------------------------------------------*/
    function Shell(screen,
                   frame)
    {
        /* Store static values */
        this._scr   = screen;
        this._frame = frame;

        /* Set frame's cursor style */
        this._frame.style.cursor = 'text';

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

        /* Fake booting process indicator */
        this._booting = false;

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
                    var urlOpener = (function ()
                    {
                        window.open(url);
                        /* TODO: make it work with `attachEvent` as well */
                        this._frame.removeEventListener('click', urlOpener, false);
                        this._frame.style.cursor = 'text';
                        this._urlOpener = undefined;
                    }).bind(this);
                    /* If there's already an event listener */
                    if (this._urlOpener)
                        this._frame.removeEventListener('click', this._urlOpener, false);
                    this._frame.addEventListener('click', urlOpener, false);
                    this._frame.style.cursor = 'pointer';
                    this._urlOpener = urlOpener;

                    /* Write instructions on the screen */
                    this._scr.newLine();
                    this._scr.write('> click on the screen to open link <');
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
            'reset',
            'poweroff',
            'shutdown',
        ], true);

        name = 'conf';
        desc = 'configure the terminal';
        g.install(name,
        {
            main : (function (std, argv)
            {
                switch (argv[0])
                {
                    case 'zoom':
                        switch (argv[1])
                        {
                            case '1':
                                this._scr.setZoom(1);
                                break;

                            case '2':
                                this._scr.setZoom(2);
                                break;

                            default:
                                std.lib.invalidArg(name, 'zoom ' + argv[1]);
                                break;
                        }
                        break;

                    case 'span':
                        switch (argv[1])
                        {
                            case '0':
                                this._scr.setSpan(0);
                                break;

                            case '1':
                                this._scr.setSpan(1);
                                break;

                            default:
                                std.lib.invalidArg(name, 'span ' + argv[1]);
                                break;
                        }
                        break;

                    default:
                        std.lib.invalidArg(name, argv[0]);
                        break;
                }
            }).bind(this),
            desc : desc,
            man  : (function ()
            {
                this._scr.write(name + ' [zoom ZOOM] or ' +
                                name + ' [span SPAN]');
                this._scr.newLine();
                this._scr.write('  ' + desc);
                this._scr.newLine();
                this._scr.write('ZOOM:');
                this._scr.newLine();
                this._scr.write('  1 : 1 pixel == 1 pixel');
                this._scr.newLine();
                this._scr.write('  2 : 1 pixel == 4 pixel');
                this._scr.newLine();
                this._scr.write('SPAN:');
                this._scr.newLine();
                this._scr.write('  0 : native character height');
                this._scr.newLine();
                this._scr.write('  1 : double character height');
                this._scr.newLine();
            }).bind(this),
        },
        [
            'pref',
            'prefs',
            'config',
            'settings',
            'configure',
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
    Shell.prototype.run = function (element)
    {
        /* Set event listeners */
        if (element.addEventListener)
        {
            element.addEventListener('keydown', this.onKeyDown.bind(this), false);
            element.addEventListener('keypress', this.onKeyPress.bind(this), false);
        }
        else
        {
            element.attachEvent('onkeydown', this.onKeyDown.bind(this));
            element.attachEvent('onkeypress', this.onKeyPress.bind(this));
        }
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype.onKeyDown = function (event)
    {
        var line;
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
                /* If a program is running */
                if (this._reader)
                    this._readerHistory =
                        this._popCharFrom(this._readerHistory);
                /* If only the shell is running */
                else
                    this._history[this._index] =
                        this._popCharFrom(this._history[this._index]);
                break;

            case g.kb.code.Up:
                /* If no program is running, move back in history */
                if (!this._reader)
                    this._moveInHistory(-1);
                break;

            case g.kb.code.Down:
                /* If no program is running, move forward in history */
                if (!this._reader)
                    this._moveInHistory(+1);
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

        if (this._scr.printables.indexOf(char) === -1)
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
    Shell.prototype._moveInHistory = function (steps)
    {
        /* Get steps-th line from current position */
        var line = this._history[this._index + steps];
        /* If steps-th line in history */
        if (line !== undefined)
        {
            /* Remove current line from the screen */
            console.log(this._history[this._index],
                        this._history[this._index].length);
            this._scr.popChar(this._history[this._index].length);
            /* Write steps-th line on the screen */
            this._scr.write(line);
            /* Update line index */
            this._index += steps;
        }
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._popCharFrom = function (line)
    {
        /* If line has characters in it */
        if (line.length)
        {
            /* Remove characters from the screen */
            this._scr.popChar(1);
            /* Update line */
            line = line.slice(0, line.length - 1);
        }
        return line;
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._poweroff = function (argv)
    {
        /* Start fake process */
        this._booting = true;

        /* Command recieved */
        this._scr.newLine();
        this._scr.write('VT100 is rebooting now...');
        this._scr.newLine();
        this._scr.render();

        var reboot = (function ()
        {
            /* Restore default settings, clear cache */
            this._index   = 0;
            this._history = [''];
            if (this._urlOpener)
                this._frame.removeEventListener('click', this._urlOpener, false);

            /* Boot */
            this._resetAndWriteMultiLine(this._INTRO);
            this._scr.write(this._PS1);
            this._scr.render();

            /* Stop fake process */
            this._booting = false;
        }).bind(this);

        var deadbeef = (function ()
        {
            /* Clear screen */
            this._scr.reset();
            this._scr.render();

            /* Schedule reboot */
            window.setTimeout(reboot, BOOT_TIME);
        }).bind(this);

        var poweroff = (function ()
        {
            /* Shutting down */
            this._scr.write('See you on the other side!');
            this._scr.newLine();
            this._scr.render();

            /* Schedule reboot */
            window.setTimeout(deadbeef, BOOT_TIME);
        }).bind(this);

        /* Schedule poweroff */
        window.setTimeout(poweroff, BOOT_TIME);
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

        /* If no program is waiting for user input and
           the machine is not fake-rebooting */
        if (!this._reader &&
            !this._booting)
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
