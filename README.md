
The VT100 Emulator aka Landing-Page for the Kibu Hackathon
==========================================================

This project is the official landing-page of the Kibu Hackathon series. It
contains a VT100 emulator, with several small applications, even hidden ones.
It is a Free and Open Source software, and we highly encourage you, to fork it,
experiment with it, and commit back your changes!



Table of Content
----------------

- [Writing an Application](#writing-an-application)
- [Standard Functions](#standard-functions)
- [Visit Page](#visit-page)
- [Development](#development)



Writing an Application
----------------------

The system can be easily extended with "programs". A *program* in this emulation
is a simple `Object`, containing a `main` function, and optionally can have a
`desc` *(description)* string and a `man` *(manual)* function to provide more
information to the user, about what it does and how it does that.

The project uses a single global variable, called `g`, which is an `Object`. It
is a good idea, to start your source file as follows:

```javascript
var g = g || {};
```

To avoid polluting the global-namespace it is also a best practice to put the
definition of the program inside a closure. After everything has been
implemented, you should install the program, by calling the `g.install`
function, which requires 4 arguments:

- **name**: (`String`) the name of the program,
- **program**: (`Function`) the program `Object`,
- **aliases**: (optional, `Array`) if the user can refer to this program by
  other name(s),
- **hidden**: (optional, `Boolean`) if the program should be hidden from `help`

```javascript
(function ()
{
    'use strict';

    var NAME = 'example',
        DESC = 'My example program';

    /* Information to the user */
    function man(std)
    {
        std.io.writeLine(NAME);
        std.io.writeLine('  ' + DESC);
    }

    /* Single entry point */
    function main(std, argv)
    {
        // The implementation of the program goes here
    }

    /* Install program */
    g.install(NAME,
              {main : main,
               man  : man,
               desc : DESC},
              ['sample', 'test', 'myprog'],
              true);

})();
```

To make it work, the program has to be included in the `head` section of the
`index.html`, right after the `js/bin.js` script. *(Otherwise the `g.install`
function won't work.)*



Standard Functions
------------------

Both the `man` and the `main` functions take an `Object` called `std` as their
first arguments. This `Object` has two sub-objects, `io` (Input/Output) and
`lib` (library). The functions defined in the former one, can "manipulate the
screen" *(clear it, write or read from it)*, while the latter contains
convenient utilities, such as handling the 'Yes/No' answers given to questions,
or to open external links by requiring the user to click inside the screen.

The input/output functions:

- `std.io.clear()`: remove everything from the screen,
- `std.io.write(String)`: write something on the screen,
- `std.io.writeLine(String)`: write something on the screen and insert a new
  line after it,
- `std.io.setReader(Function)`: set a function, which will process the user
  input. (The callback function takes two arguments, the `std` `Object` and the
  user's input `String`). If this function schedules another *reader* function,
  then it must return `true`

The library functions:

- `std.lib.yesOrNo(String)`: if the string is a valid 'yes' it returns `true`;
  if it is a valid 'no' returns `false`; returns `null` otherwise,
- `std.lib.invalidArg(String, String)`: prints the standard invalid argument
  error on the screen. Takes two aguments: the name of the command and the
  invalid option the user passed,
- `std.lib.openPopUp(String)`: make the screen ready to be clicked on to
  redirect the user to another URL. It also prints the necessary messages to
  inform the user of this new functionality



Visit Page
----------

Try it for yourself, by [clicking here](http://open.kibu.hu)!



Development
-----------

The development of this project has only two minor dependencies, because these
tools are called in the `pre-commit` hook of git, by a bash script.

- [`UglifyJS2`](https://github.com/mishoo/UglifyJS2) (node)
- [`JSHint`](https://github.com/jshint/jshint) (node)
