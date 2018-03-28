"use strict";

// modulev
var Rustish = (function() {
    return {
        /**
         * @param {T} obj
         * @param {Error} err
         */
        Result: function(obj, err) {
            this.obj = obj;
            this.err = err;
            /** 
             * Unwrap associated element  
             * @return {T}
             */
            this.unwrap = function() {
                if (obj == undefined || err != undefined)
                    throw "Unwrap unsuccessful." + err;
                else
                    return obj;
            }
        },
        /**
         * Builder for a result type
         * @type {Object} obj
         */
        ResultBuilder: {   
            build: function(obj, err) {
                var result = new Rustish.Result(obj, err);
                // make sure obj or err is defined
                if(obj == undefined && err == undefined)
                    throw "ResultBuilder needs at least one object or one error";
                return result;
            },
        },
    }

})();

