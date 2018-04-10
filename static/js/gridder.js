"use strict";

var Gridder = function(options) {
    // set default options
    this.options = options;
    this.options.container = options.container || document.querySelector("gridder-container");
    this.options.height = options.height || 350;
    this.options.childClass = options.childClass || this.options.container.querySelectorAll("gridder-child");
    this.options.verticalMargin = options.verticalMargin || 16;
    this.options.horizontalMargin = options.horizontalMargin || 16;

    // set the container to flex
    this.options.container.style.display = "grid";
    this.options.container.style.gridColumnGap = this.options.horizontalMargin + "px";
    this.options.container.style.gridRowGap = this.options.verticalMargin + "px";

    // set up the grid by elements of three
    this.children = this.options.container.querySelectorAll(this.options.childClass);

    // spaghetti state thing
    var flip = false;

    for (var i = 0; i < this.children.length; i+= 3) {

        var firstSpan = (flip ? 2 : 3);
        var secondSpan = (flip ? 3 : 2);
        var secondStart = (flip ? 3 : 4);

        var els = [ this.children[i] ];
        els[0].style.gridColumnStart = "1";
        els[0].style.gridColumnEnd = "span " + firstSpan;

        // append second element if it exists
        if (typeof(this.children[i + 1]) !== "undefined" ) {
            els.push(this.children[i + 1])
            els[1].style.gridColumnStart = secondStart;
            els[1].style.gridColumnEnd = "span " + secondSpan;
        }
            

        // append third element if it exists
        if (typeof(this.children[i + 2]) !== "undefined" ) {
            els.push(this.children[i + 2])
            els[2].style.gridColumnStart = "1";
            els[2].style.gridColumnEnd = "span 5"
        }    
    
        // apply to all elements in queue 
        els.forEach(el => {
            // resize all elements vertically
            el.style.height = this.options.height + "px";
        });

        flip = !flip;
    };


}
