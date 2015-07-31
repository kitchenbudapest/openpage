/* INFO **
** INFO */

var g = g || {};

(function ()
{
    'use strict';

    /* Module level constants */
    var CREF = 0;

    /*------------------------------------------------------------------------*/
    /* Export objects */
    g.register =
    {
        register : function (inputs,
                             callback)
        {
            var cref   = 'apply' + (CREF++).toString();
            var head   = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = 'http://devops.kibu.hu/hackatonForm' +
                         '?name='     + inputs.name +
                         '&role='     + inputs.role +
                         '&mail='     + inputs.mail +
                         '&lang='     + inputs.lang +
                         '&callback=' + cref;

            /* Set JSONP callback */
            window[cref] = function (response)
            {
                head.removeChild(script);

                /* Clean up */
                delete window[cref];
                callback(response);
            };

            /* Trigger event */
            head.appendChild(script);
        },
    };
})();