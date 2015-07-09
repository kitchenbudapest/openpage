/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var PRINTABLES = g.font.VT220.printables;


    /*------------------------------------------------------------------------*/
    function Shell(context, distort)
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

        /* Create help message */
        this._HELP =
        [
                  /* 0123456789012345678901234567890123456789 */
            /* 0 */ 'clear  - clear terminal screen',
            /* 1 */ 'reboot - reboot the machine',
            /* 2 */ 'exit   - switch to static page',
            /* 3 */ 'help   - print all commands available',
            /* 4 */ 'apply  - send application for hackathon',
            /* 5 */ 'doc    - open hackathon documentation',
            /* 6 */ 'date   - date of the hackathon',
            /* 7 */ 'addr   - location of the hackathon',
            /* 8 */ 'award  - price of the hackathon ',
            /* 9 => PS1 */
        ];

        /* Define distortion function */


        /* Create screen */
        var fg = [194, 255, 206];
        this._scr = new g.scr.Screen({context              : context,
                                      fontFace             : new g.font.VT220(fg),
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
        this._clear();
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
                this._execute(this._history[this._index++]);
                this._history[this._index] = '';
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
        this._history[this._index] += char;
        scr.write(char);
        scr.render();
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._poweroff = function (argv)
    {
        var scr = this._scr;
        scr.write('VT100 is rebooting now...');
        scr.newLine();
        scr.write('See you on the other side!');
        this._clear();
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
    Shell.prototype._help = function (argv)
    {
        this._resetAndWriteMultiLine(this._HELP);
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._clear = function (argv)
    {
        this._resetAndWriteMultiLine(this._INTRO);
    };


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype._execute = function (input)
    {
        /* Separate command name and arguments */
        var argv    = input.split(' '),
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
                this._clear(argv);
                break;

            /* If (fake) reboot system */
            case 'kill':
            case 'halt':
            case 'reboot':
            case 'shutdown':
            case 'poweroff':
                this._poweroff(argv);
                break;

            /* If change from interactive mode to static text */
            case 'skip':
            case 'exit':
            case 'quit':
            case 'close':
            case 'break':
            case 'leave':
                break;

            /* If looking for a manual */
            case 'man':
                g.bin.man(argv);
                break;

            /* If looking for available commands */
            case 'ls':
            case 'help':
            case 'info':
            case 'more':
                this._help(argv);
                break;

            case 'join':
            case 'apply':
                g.bin.apply(argv);
                break;

            case 'doc':
            case 'docs':
            case 'wiki':
            case 'document':
            case 'documents':
            case 'hackathon':
                g.bin.doc(argv);
                break;

            case 'kibu':
            case 'kitchen':
            case 'kitchenbudapest':
                g.bin.kibu(argv);
                break;

            case 'addr':
            case 'address':
            case 'location':
                g.bin.addr(argv);
                break;

            case 'git':
            case 'repo':
            case 'github':
            case 'repository':
            case 'opensource':
                g.bin.git(argv);
                break;

            /* Easter-eggs */
            case 'what':
            case 'vt100':
            case 'VT100':
                g.bin.what(argv);
                break;

            case 'su':
            case 'sudo':
            case 'author':
                g.bin.su(argv);
                break;

            case '42':
                g.bin.fortytwo(argv);
                'the answer to life the universe and everything'
                break;

            case 'zoom':
                g.bin.zoom(argv);
                'in', 'out', '0'
                break;

            case 'line':
                /* Line height */
                g.bin.line(argv);
                '1', '2'
                break;

            /* Command is not listed above */
            default:
                this._scr.write('shell: ' + command + ': command not found');
                this._scr.newLine();
                break;
        }
        this._scr.write(this._PS1);
        this._scr.render();
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.shell =
    {
        Shell : Shell,
    }
})();
