(function(){
    window.onload = function() {

        new ScrimTool.Scrim({
            container: document.querySelector(".scrim-container")
        });

        new Gridder({
            container: document.querySelector(".projects"),
            height: 450,
            childClass: ".project",
            verticalMargin: 16,
            horizontalMargin: 16
        })
    }
})();