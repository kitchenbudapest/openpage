/* INFO **
** INFO */

function Terminal(root,
                  frame,
                  shell)
{
    this._shell = new shell();
    this._frame = new frame({context : root.getContext('2d'),
                             width   : root.width,
                             height  : root.height});
}

Terminal.prototype.onKeyDown = function (event)
{
    this._shell.setKey(event.keyCode);
    this._frame.render(this._shell.getBuffer());
};
