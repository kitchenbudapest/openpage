/* INFO **
** INFO */

var g = g || {};

(function ()
{
    var os = {};

    (function ()
    {
        var i      = 0,
            stdin  = g.fs.File('stdin'),
            stdout = g.fs.File('stdout'),
            stderr = g.fs.File('stderr'),
            enums  =
            {
                EOF                 = i++,
                End                 = i++,
                Start               = i++,
                Reading             = i++,
                ReadingAndWriting   = i++,
                Writing             = i++,
                WritingAndReading   = i++,
                Appending           = i++,
                AppendingAndReading = i++,
            };

        stdin.setMode(WritingAndReading);
        stdout.setMode(WritingAndReading);
        stderr.setMode(WritingAndReading);

        function setMode(mode)
        {
            return g.fs.enums.Fail;
        }

        /* Monkey patching */
        stdin

        var PATH_PATTERN = /\//g;

        /* Returns: File */
        function fopen(path, mode)
        {
            /* Parse path */
            var path = path.split(PATH_PATTERN),
                file = g.kernel.KERNEL.getFile(path);

            switch (mode)
            {
                case Reading:
                case ReadingAndWriting:
                    if (file.setMode(mode) || !file)
                        return null;
                    break;

                case Writing:
                case WritingAndReading:
                    if (!file)
                        g.kernel.KERNEL.setFile(path);
                    if (file.setMode(mode))
                        return null;
                    file.setContent('');
                    break;

                case Appending:
                case AppendingAndReading:
                    if (!file)
                        g.kernel.KERNEL.setFile(path);
                    if (file.setMode(mode))
                        return null;
                    break;

                default:
                    return null;
            }
            file.setIndex(0);
            return file;
        }

        function fclose(file)
        {

        }

        function fwrite(file)
        {

        }

        function fread(file)
        {

        }

        function fseek(file, index)
        {

        }

        function fwrite(file, value)
        {

        }

        os.stdio =
        {
            enums  : enums,
            stdin  : stdin,
            stdout : stdout,
            stderr : stderr,
            fopen  : fopen,
            fclose : fclose,
            fseek  : fseek,
            fread  : fread,
            fwrite : fwrite,
        };
    })();



    g.os = os;
})();
