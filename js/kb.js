/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    var i = 0;

    /*------------------------------------------------------------------------*/
    /* Based on: http://stackoverflow.com/a/23377822/2188562 */
    var code =
    {
        _00              : i++,
        _01              : i++,
        _02              : i++,
        Cancel           : i++,
        _03              : i++,
        _04              : i++,
        Help             : i++,
        _05              : i++,
        BackSpace        : i++,
        Tab              : i++,
        _06              : i++,
        _07              : i++,
        Clear            : i++,
        Return           : i++,
        ReturnSpecial    : i++,
        _08              : i++,
        Shift            : i++,
        Control          : i++,
        Alt              : i++,
        Pause            : i++,
        CapsLock         : i++,
        Kana             : i++,
        Eisu             : i++,
        Junja            : i++,
        Final            : i++,
        Hanja            : i++,
        _09              : i++,
        Escape           : i++,
        Convert          : i++,
        NonConvert       : i++,
        Accept           : i++,
        ModeChange       : i++,
        Space            : i++,
        PageUp           : i++,
        PageDown         : i++,
        End              : i++,
        Home             : i++,
        Left             : i++,
        Up               : i++,
        Right            : i++,
        Down             : i++,
        Select           : i++,
        Print            : i++,
        Execute          : i++,
        PrintScreen      : i++,
        Insert           : i++,
        Delete           : i++,
        _10              : i++,
        Zero             : i++,
        One              : i++,
        Two              : i++,
        Three            : i++,
        Four             : i++,
        Five             : i++,
        Six              : i++,
        Seven            : i++,
        Eight            : i++,
        Nine             : i++,
        Colon            : i++,
        SemiColon1       : i++,
        LessThan         : i++,
        Equals1          : i++,
        GreaterThan      : i++,
        QuestionMark     : i++,
        At               : i++,
        A                : i++,
        B                : i++,
        C                : i++,
        D                : i++,
        E                : i++,
        F                : i++,
        G                : i++,
        H                : i++,
        I                : i++,
        J                : i++,
        K                : i++,
        L                : i++,
        M                : i++,
        N                : i++,
        O                : i++,
        P                : i++,
        Q                : i++,
        R                : i++,
        S                : i++,
        T                : i++,
        U                : i++,
        V                : i++,
        W                : i++,
        X                : i++,
        Y                : i++,
        Z                : i++,
        Super            : i++,
        _11              : i++,
        ContextMenu      : i++,
        _12              : i++,
        Sleep            : i++,
        NumPadZero       : i++,
        NumPadOne        : i++,
        NumPadTwo        : i++,
        NumPadThree      : i++,
        NumPadFour       : i++,
        NumPadFive       : i++,
        NumPadSix        : i++,
        NumPadSeven      : i++,
        NumPadEight      : i++,
        NumPadNine       : i++,
        NumPadMultiply   : i++,
        NumPadAdd        : i++,
        NumPadSeparator  : i++,
        NumPadSubtract   : i++,
        NumPadDecimal    : i++,
        NumPadDivide     : i++,
        F1               : i++,
        F2               : i++,
        F3               : i++,
        F4               : i++,
        F5               : i++,
        F6               : i++,
        F7               : i++,
        F8               : i++,
        F9               : i++,
        F10              : i++,
        F11              : i++,
        F12              : i++,
        F13              : i++,
        F14              : i++,
        F15              : i++,
        F16              : i++,
        F17              : i++,
        F18              : i++,
        F19              : i++,
        F20              : i++,
        F21              : i++,
        F22              : i++,
        F23              : i++,
        F24              : i++,
        _13              : i++,
        _14              : i++,
        _15              : i++,
        _16              : i++,
        _17              : i++,
        _18              : i++,
        _19              : i++,
        _20              : i++,
        NumLock          : i++,
        ScrollLock       : i++,
        WinOemFjJisho    : i++,
        WinOemFjMasshou  : i++,
        WinOemFjTouroku  : i++,
        WinOemFjLoya     : i++,
        WinOemFjRoya     : i++,
        _21              : i++,
        _22              : i++,
        _23              : i++,
        _24              : i++,
        _25              : i++,
        _26              : i++,
        _27              : i++,
        _28              : i++,
        _29              : i++,
        Circumflex       : i++,
        Exclamation      : i++,
        DoubleQuote      : i++,
        Hash             : i++,
        Dollar           : i++,
        Percent          : i++,
        Ampersand        : i++,
        Underscore       : i++,
        OpenParenthesis  : i++,
        CloseParenthesis : i++,
        Asterisk         : i++,
        Plus             : i++,
        Pipe             : i++,
        HyphenMinus      : i++,
        OpenCurlyBrace   : i++,
        CloseCurlyBrace  : i++,
        Tilde            : i++,
        _30              : i++,
        _31              : i++,
        _32              : i++,
        _33              : i++,
        VolumeMute       : i++,
        VolumeDown       : i++,
        VolumeUp         : i++,
        _34              : i++,
        _35              : i++,
        SemiColon2       : i++,
        Equals2          : i++,
        Comma            : i++,
        Minus            : i++,
        Period           : i++,
        Slash            : i++,
        BackTick         : i++,
        _36              : i++,
        _37              : i++,
        _38              : i++,
        _39              : i++,
        _40              : i++,
        _41              : i++,
        _42              : i++,
        _43              : i++,
        _44              : i++,
        _45              : i++,
        _46              : i++,
        _47              : i++,
        _48              : i++,
        _49              : i++,
        _50              : i++,
        _51              : i++,
        _52              : i++,
        _53              : i++,
        _54              : i++,
        _55              : i++,
        _56              : i++,
        _57              : i++,
        _58              : i++,
        _59              : i++,
        _60              : i++,
        _61              : i++,
        OpenBracket      : i++,
        BackSlash        : i++,
        CloseBracket     : i++,
        Quote            : i++,
        _62              : i++,
        Meta             : i++,
        AltGr            : i++,
        _63              : i++,
        WinIcoHelp       : i++,
        WinIco00         : i++,
        _64              : i++,
        WinIcoClear      : i++,
        _65              : i++,
        _66              : i++,
        WinOemReset      : i++,
        WinOemJump       : i++,
        WinOemPa1        : i++,
        WinOemPa2        : i++,
        WinOemPa3        : i++,
        WinOemWctrl      : i++,
        WinOemCusel      : i++,
        WinOemAttn       : i++,
        WinOemFinish     : i++,
        WinOemCopy       : i++,
        WinOemAuto       : i++,
        WinOemEnlw       : i++,
        WinOemBacktab    : i++,
        Attn             : i++,
        Crsel            : i++,
        Exsel            : i++,
        Ereof            : i++,
        Play             : i++,
        Zoom             : i++,
        _67              : i++,
        Pa1              : i++,
        WinOemClear      : i++,
        _68              : i++,
    };
    var map = {};
    map[code.Space]            = ' ';
    map[code.Zero]             = '0';
    map[code.One]              = '1';
    map[code.Two]              = '2';
    map[code.Three]            = '3';
    map[code.Four]             = '4';
    map[code.Five]             = '5';
    map[code.Six]              = '6';
    map[code.Seven]            = '7';
    map[code.Eight]            = '8';
    map[code.Nine]             = '9';
    map[code.NumPadZero]       = '0';
    map[code.NumPadOne]        = '1';
    map[code.NumPadTwo]        = '2';
    map[code.NumPadThree]      = '3';
    map[code.NumPadFour]       = '4';
    map[code.NumPadFive]       = '5';
    map[code.NumPadSix]        = '6';
    map[code.NumPadSeven]      = '7';
    map[code.NumPadEight]      = '8';
    map[code.NumPadNine]       = '9';
    map[code.NumPadMultiply]   = '*';
    map[code.NumPadAdd]        = '+';
    map[code.NumPadSeparator]  = '';   /* TODO: Missing */
    map[code.NumPadSubtract]   = '-';
    map[code.NumPadDecimal]    = '.';
    map[code.NumPadDivide]     = '/';
    map[code.Colon]            = ':';
    map[code.SemiColon1]       = ';';
    map[code.LessThan]         = '<';
    map[code.Equals1]          = '=';
    map[code.GreaterThan]      = '>';
    map[code.QuestionMark]     = '?';
    map[code.At]               = '@';
    map[code.A]                = 'a';
    map[code.B]                = 'b';
    map[code.C]                = 'c';
    map[code.D]                = 'd';
    map[code.E]                = 'e';
    map[code.F]                = 'f';
    map[code.G]                = 'g';
    map[code.H]                = 'h';
    map[code.I]                = 'i';
    map[code.J]                = 'j';
    map[code.K]                = 'k';
    map[code.L]                = 'l';
    map[code.M]                = 'm';
    map[code.N]                = 'n';
    map[code.O]                = 'o';
    map[code.P]                = 'p';
    map[code.Q]                = 'q';
    map[code.R]                = 'r';
    map[code.S]                = 's';
    map[code.T]                = 't';
    map[code.U]                = 'u';
    map[code.V]                = 'v';
    map[code.W]                = 'w';
    map[code.X]                = 'x';
    map[code.Y]                = 'y';
    map[code.Z]                = 'z';
    map[code.Circumflex]       = '^';
    map[code.Exclamation]      = '!';
    map[code.DoubleQuote]      = '"';
    map[code.Hash]             = '#';
    map[code.Dollar]           = '$';
    map[code.Percent]          = '%';
    map[code.Ampersand]        = '&';
    map[code.Underscore]       = '_';
    map[code.OpenParenthesis]  = '(';
    map[code.CloseParenthesis] = ')';
    map[code.Asterisk]         = '*';
    map[code.Plus]             = '+';
    map[code.Pipe]             = '|';
    map[code.HyphenMinus]      = '-';
    map[code.OpenCurlyBrace]   = '{';
    map[code.CloseCurlyBrace]  = '}';
    map[code.Tilde]            = '~';
    map[code.SemiColon2]       = ';';
    map[code.Equals2]          = '=';
    map[code.Comma]            = ',';
    map[code.Minus]            = '-';
    map[code.Period]           = '.';
    map[code.Slash]            = '/';
    map[code.BackTick]         = '`';
    map[code.OpenBracket]      = '[';
    map[code.BackSlash]        = '\\';
    map[code.CloseBracket]     = ']';
    map[code.Quote]            = "'";

    /* Export objects */
    g.kb =
    {
        code : code,
        map  : map,
    };
})();
