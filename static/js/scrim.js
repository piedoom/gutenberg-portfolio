// create a scroll progress indicator with clickable links to skip
"use strict";

var ScrimTool = (function(){

    return {
        Scrim: function(options) {
            /**
             * @return {null}
             */
            this.setup = function() {
                var _this = this; 

                // add scrollbar
                var scrollBar = document.createElement("DIV");
                var progressBar = document.createElement("DIV");

                scrollBar.classList.add("scrim-scroll-bar")
                progressBar.classList.add("scrim-progress-bar")

                scrollBar.appendChild(progressBar);
                this.container.appendChild(scrollBar);

                // track position
                window.addEventListener('scroll', function(e){
                    var completion = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
                    progressBar.style.height = (completion * scrollBar.clientHeight) + "px";
                });

                // finally, loop through page to find key elements
                var selector = this.options.hasOwnProperty('selector') ? this.options.selector : ".scrim-key";
                document.querySelectorAll(selector).forEach(function(e) {
                    // add each key to the timeline
                    // first find their relative distance down the page from 0 - 1
                    var offset = e.offsetTop / document.body.clientHeight;
                    // now create a new element at that coordinate
                    var node = document.createElement("DIV");
                    node.classList.add("scrim-point")
                    node.style.top = (offset * scrollBar.clientHeight) + "px";
                    _this.container.appendChild(node);

                    window.addEventListener('scroll', function(e){
                        var completion = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
                        if (offset <= completion) 
                            node.classList.add("past");
                        else 
                            node.classList.remove("past");
                        
                    });
                });


            }.bind(this);

            this.container = options.container;
            this.options = options;
            this.setup();            
        }
    }


})();