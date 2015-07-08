/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /*------------------------------------------------------------------------*/
    function Shell()
    {
        this._PS1 = '[visitor@kibu ~] $ ';
        this._history = [];
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Shell.prototype.execute = function ()
    {
        var command = '';
        switch (command)
        {
            case 'del':
            case 'clean':
            case 'clear':
            case 'reset':
                break;

            case 'kill':
            case 'halt':
            case 'reboot':
            case 'shutdown':
            case 'poweroff':
                break;

            case 'skip':
            case 'exit':
            case 'quit':
            case 'close':
            case 'break':
            case 'leave':
                break;

            case 'ls':
            case 'man':
            case 'help':
            case 'info':
            case 'more':
                break;

            case 'join':
            case 'apply':
                break;

            case 'doc':
            case 'docs':
            case 'wiki':
            case 'document':
            case 'documents':
            case 'hackathon':
                break;

            case 'kibu':
            case 'kitchenbudapest':
                break;

            case 'address':
            case 'location':
                break;

            case 'git':
            case 'repo':
            case 'github':
            case 'repository':
            case 'opensource':
                break;

            /* Easter-eggs */
            case 'what':
            case 'vt100':
            case 'VT100':
                break;

            case 'su':
            case 'sudo':
            case 'author':
                break;

            case '42':
                'the answer to life the universe and everything'
                break;

            case 'zoom':
                'in', 'out', '0'
                break;

            case 'lineheight':
                '1', '2'
                break;

            /* Command is not listed above */
            default:
                this._scr.newLine();
                this._scr.write('shell: ' + command + ': command not found');
                this._scr.newLine();
                break;
        }
        this._scr.write(this._PS1);
    };


    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.shell =
    {
        Shell : Shell,
    }
})();
