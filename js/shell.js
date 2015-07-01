/* INFO **
** INFO */

function Shell()
{
    this._programs = {};
}

Shell.prototype.addProgram = function (parameters)
{
    this._programs[parameters.name] = parameters.exec;
};
