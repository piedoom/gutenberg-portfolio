// Reusable animation stuff for the website using anime.js
var animate = (function() {
    return {
        /**
         * Wrap each char in a span so it may be animated individually.
         * Does not replace value.
         */
        wrapChar: function(el) {
            // check if valid
            if (!(el instanceof Element)) {
                return;
            }
            // get text of element
            // use nbsp instead of space chars to preserve
            // space distance
            // wrap each char in a span
            return el.outerText
                .split('')
                .map(x => "<span>"+x+"</span>")
                .join('')
                .replace(/\<span\> \<\/span\>/g, '</br>')
         //       .replace(/\<span\>\<\/br\>\<\/span\>/g, '</br>')
        },

        defaultFor: function(arg, val) { 
            return typeof arg !== 'undefined' ? arg : val; 
        },

        /**
         * wrapChar, but modifies value
         */
        wrapCharMod: function(el) {
            if (NodeList.prototype.isPrototypeOf(el)) {
                el.forEach( x => x.innerHTML = this.wrapChar(x));
            } else {
                el.innerHTML = this.wrapChar(el);
            }
        }
    }
})();