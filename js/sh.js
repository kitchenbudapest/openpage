/* INFO **
** INFO */

var g = g || {};

(function ()
{
    function Shell(user)
    {
        this._user = user;
    }


    Shell.prototype.main = function (argv)
    {
        var userInput,
            currentDir = ;

        while (true)
        {

            g.stdio.fprint('[' + this._user + '@kibu ' + currentDir. + ']');
            userInput = g.os.stdio.fread(g.os.stdio.stdin);
        }
    }


    g.sh =
    {
        Shell = Shell,
    };
})();
