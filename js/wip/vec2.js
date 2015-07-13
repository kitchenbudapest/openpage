/* INFO **
** INFO */

function Vec2(x, y)
{
    if (x instanceof Array)
    {
        y = x[1];
        x = x[0];
    }
    else if (typeof x !== 'number' ||
             typeof y !== 'number')
        throw "Argument `x` and/or `y` in Vec2() should be an " +
              "instance of either Number or Array";
    this.x = x || 0.0;
    this.y = y || 0.0;
}

Vec2.prototype._typeCheck = function(funcName,
                                     arg1Name,
                                     arg1,
                                     arg2Name,
                                     arg2)
{
    if (arg1 instanceof Vec2)
        return arg1;
    else if (arg1 instanceof Array)
    {
        arg2 = arg1[1];
        arg1 = arg1[0];
    }
    else if (typeof arg1 === 'number')
    {
        arg1 = arg1;
        arg2 = typeof arg2 === 'number' ? arg2 : 0.0;
    }
    else
        throw 'Arguments `' + arg1Name + '` and/or `' + arg2Name +
              '` in `Vec2.' + funcName + '` method should be ' +
              '(an) instance(s) of either Vec2, Array or Number';
    return Vec2(arg1, arg2);
};


Vec2.prototype.add = function(other, y)
{
    other = this._typeCheck('add', 'other', other, 'y', y);
    return Vec2(this.x + other.x, this.y + other.y);
};

Vec2.prototype.innerProduct = function(other, y)
{
    other = this._typeCheck('innerProduct',
                            'other', other,
                            'y', y !== undefined ? y : other);
    return this.x*other.x + this.y*other.y;
};

Vec2.prototype.length = function()
{
    return Math.sqrt(this.innerProduct(this));
};