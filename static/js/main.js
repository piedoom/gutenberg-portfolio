(function(){
    window.onload = function() {

        new ScrimTool.Scrim({
            container: document.querySelector(".scrim-container")
        });

        // anime js stuff
        var nameEl = document.querySelector('.logotype h1');
        if (nameEl) {
            animate.wrapCharMod(nameEl);

            anime({
                targets: nameEl.querySelectorAll("*"),
                elasticity: 400,
                scale: [0.8, 1],
                translateY: [100, 0],
                delay: function(el, i) {
                    return 100 + (i * 10);
                },
                opacity: [0, 1]
            });

            nameEl.addEventListener(
                'mouseenter', 
                (f => animateText(nameEl.querySelectorAll('*'), 1.05, 0, -10, 800, 400)), 
                false);

            nameEl.addEventListener(
                'mouseleave', 
                (f => animateText(nameEl.querySelectorAll('*'), 1.0, 0, 0, 600, 300)), 
                false);
        }

        function animateText(el, scale, x, y, duration, elasticity) {
            anime.remove(el);
            anime({
                targets: el,
                scale: scale,
                translateX: x,
                translateY: y,
                duration: duration,
                delay: ((x, i) => (i * 10)),
                elasticity: elasticity,
            });
        }
    }
})();