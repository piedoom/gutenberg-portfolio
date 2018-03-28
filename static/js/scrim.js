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
                zenscroll.setup(500,-20)
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
                    progressBar.style.height = ((window.pageYOffset / (document.body.scrollHeight)) * scrollBar.clientHeight) + "px";
                });

                // finally, loop through page to find key elements
                var selector = this.options.hasOwnProperty('selector') ? this.options.selector : ".scrim-key";
                document.querySelectorAll(selector).forEach(function(e) {
                    // add each key to the timeline
                    var node = document.createElement("DIV");
                    node.classList.add("scrim-point")
                    node.dataset.scrimTarget = e.dataset.scrimTitle;
                    _this.container.appendChild(node);
                    // also create a new div for text
                    var title = e.dataset.scrimTitle;
                    var text = document.createElement("DIV");
                    text.classList.add("scrim-title");
                    text.dataset.scrimTarget = e.dataset.scrimTitle;
                    text.innerHTML = title;
                    text.style.left = scrollBar.clientWidth + 24 + "px"
                    
                    _this.container.appendChild(text);

                    // add clicking functionality
                    var smoothClick = function(e) {
                        var el = document.querySelector('.scrim-key[data-scrim-title="' + e.target.dataset.scrimTarget + '"]');
                        zenscroll.to(el);
                    }

                    // get offset 
                    var getOffsetRaw = function(el) {
                        return (el.offsetTop - el.clientHeight);
                    }

                    var getOffset = function(el) {
                        return getOffsetRaw(el) / document.body.clientHeight;
                    }

                    // redistribute nodes on resize
                    var setPosition = function() {
                        // first find their relative distance down the page from 0 - 1
                        var offset = getOffset(e);
                        var offsetPixels = (offset * scrollBar.clientHeight) + "px";

                        // apply height
                        node.style.top = offsetPixels;
                        text.style.top = offset * scrollBar.clientHeight + 6 + "px";
                    }

                    setPosition();

                    node.addEventListener('click', smoothClick);
                    window.addEventListener('resize', setPosition);

                    window.addEventListener('scroll', function(){
                        var completion = window.pageYOffset / (document.body.scrollHeight);
                        var offset = getOffset(e);
                        if (offset <= completion || (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                            node.classList.add("past");
                            text.classList.add("past");
                            progressBar.classList.add("full");
                        } 
                        else {
                            node.classList.remove("past");
                            text.classList.remove("past");
                            progressBar.classList.remove("full");
                        }
                        
                    });
                });


            }.bind(this);

            this.container = options.container;
            this.options = options;
            this.setup();            
        }
    }


})();