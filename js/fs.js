/* INFO **
** INFO */

var g = g || {};

(function ()
{

    var i     = 0;
        enums =
    {
        Okay          : i++,
        Fail          : i++,
        InvalidPath   : i++,
        NotADirectory : i++,
        FileExists    : i++,
    };


    /*------------------------------------------------------------------------*/
    function Dir(name, parent)
    {
        this._name = name;
        if (parent instanceof Dir)
            this._parent = parent;
        this._children = {};
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Dir.prototype.getParent = function ()
    {
        return this._parent;
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Dir.prototype.getChild = function (name)
    {
        return this._children[name];
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Dir.prototype.setChild = function (name, value)
    {
        this._children[name] = value;
    }



    /*------------------------------------------------------------------------*/
    function File(name)
    {
        this._name    = name;
        this._mode    = ;
        this._index   = 0;
        this._content = '';
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    File.prototype.getMode = function ()
    {
        return this._mode;
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    File.prototype.setMode = function (mode)
    {
        this._mode = mode;
        return enums.Okay;
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    File.prototype.getIndex = function ()
    {
        return this._index;
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    File.prototype.setIndex = function (index)
    {
        this._index = index;
        return enums.Okay;
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    File.prototype.getContent = function ()
    {
        return this._content.slice(this._index);
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    File.prototype.setContent = function (content)
    {
        this._content = content;
        return enums.Okay;
    }


    /*------------------------------------------------------------------------*/
    function Bin(name)
    {
        // pass
    }


    /*------------------------------------------------------------------------*/
    function Link(name, source)
    {
        this._name = name;
        this._source = source;
    }



    /*------------------------------------------------------------------------*/
    function FileSystem()
    {
        this._root = Dir('/');
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    FileSystem.prototype.getFile = function (path)
    {
        var result = this._getParentDir(path);
        if (result.error !== enums.Okay)
            return result.error;
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    FileSystem.prototype.getDir = function (path)
    {
        return this.getFile();

        if (!(path instanceof Array))
            return {error: enums.InvalidPath};

        var dir = this._root,
        for (var i=0; i<path.length-1; i++)
        {
            dir = dir.getChild(path[i]);
            if (!(dir instanceof Dir))
                return {error: enums.NotADirectory};
        }
        return {error: enums.Okay, dir: dir};
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* path has to be an array of strings. It has to be an absolute path */
    FileSystem.prototype.makeDir = function (path)
    {
        var result = this._getParentDir(path);
        if (result.error !== enums.Okay)
            return result.error;

        var name = path[path.length - 1];
        if (result.dir.getChild(name))
            return enums.FileExists;

        result.dir.setChild(Dir(name, result.dir));
        return enums.Okay;
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    FileSystem.prototype.makeFile = function (path)
    {
        var result = this._getParentDir(path);
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    FileSystem.prototype.makeLink = function (path)
    {
        var result = this._getParentDir(path);
    }



    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.fs =
    {
        FileSystem : FileSystem,
        enums      : enums,
    };

})();
