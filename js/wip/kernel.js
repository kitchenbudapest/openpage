/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';
    function Kernel()
    {
        /* Create file system */
        var fs = this._fs = g.fs.FileSystem();
        fs.makeDir(['etc']);
        fs.makeDir(['home']);
        fs.makeDir(['tmp']);
        fs.makeDir(['usr']);

        fs.makeDir(['home', 'visitor']);
        fs.makeDir(['home', 'visitor', 'documents']);
        fs.makeDir(['home', 'visitor', '.config']);
        fs.makeDir(['usr', 'bin']);
        fs.makeDir(['usr', 'lib']);

        fs.makeLink(['usr', 'bin'], ['bin']);
        fs.makeLink(['usr', 'lib'], ['lib']);

        fs.makeFile(['etc', 'vt100.conf']);
        fs.makeFile(['home', 'visitor', 'documents', 'README']);
        fs.makeFile(['home', 'visitor', '.config', 'vt100.conf']);
        fs.makeFile(['home', 'visitor', '.shellrc']);

        /* Run shell */
        var sh = this._sh = g.sh.Shell('visitor');
    }

    Kernel.prototype.getFile = function (path)
    {
        var result = this._fs.getFile(path);
        if (result.error !== g.fs.enums.Okay)
            return null;


    }

    Kernel.prototype.setFile = function (path)
    {
        var result = this._fs.makeFile(path)

        return result.file;
    }

    g.kernel =
    {
        KERNEL: Kernel(),
    }
})();
