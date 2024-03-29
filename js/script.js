(function(){

    /* STAR PARTICLES */

    const NUM_OF_PARTICLES = 300;

    let canvas;
    let ctx;
    let particles = [];

    canvas = document.querySelector('#stars');
    ctx = canvas.getContext('2d');

    //due to retina displays -> all values times 2
    canvas.width = window.innerWidth * 2.5;
    canvas.height = window.innerHeight * 2.5;

    //one Particle
    class Particle {
        constructor (x, y, color = 'white'){
            this.x = x;
            this.y = y;
            this.radius = Math.floor(Math.random() * (4 - 1) + 1);
            this.color = color;
        }

        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    //create particles
    for ( let i = 0; i < NUM_OF_PARTICLES; i++ ){

        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        let luminance = Math.random() * (100 - 90 ) + 90;
        luminance = Math.floor(luminance);
        let color = `hsl(177, 100%, ${luminance}%)`;

        let p = new Particle (x, y, color);
        particles.push(p);
    }

    //called every loop
    function draw(){

        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //update & draw
        particles.forEach( p => {
            p.draw();
        });
    }

    draw();

    /* PLACING THE INFO-TEXTS */

    let sunInfo = document.querySelector(".sun-section > .planet-info");
    sunInfo.style.top = "calc(100vh + 25%)";

    let mercuryInfo = document.querySelector(".mercury-section > .planet-info");
    mercuryInfo.style.top = "calc(200vh + 25%)";

    let venusInfo = document.querySelector(".venus-section > .planet-info");
    venusInfo.style.top = "calc(300vh + 25%)";

    let earthInfo = document.querySelector(".earth-section > .planet-info");
    earthInfo.style.top = "calc(400vh + 25%)";

    let marsInfo = document.querySelector(".mars-section > .planet-info");
    marsInfo.style.top = "calc(500vh + 25%)";

    let jupiterInfo = document.querySelector(".jupiter-section > .planet-info");
    jupiterInfo.style.top = "calc(600vh + 25%)";

    let saturnInfo = document.querySelector(".saturn-section > .planet-info");
    saturnInfo.style.top = "calc(700vh + 25%)";

    let uranusInfo = document.querySelector(".uranus-section > .planet-info");
    uranusInfo.style.top = "calc(800vh + 25%)";

    let neptuneInfo = document.querySelector(".neptune-section > .planet-info");
    neptuneInfo.style.top = "calc(900vh + 25%)";

    /* PLANET ANIMATION WHEN SCROLLING */

    class Planet {
        constructor (animationPath, triggerElement, tweenElement, counterElement, end, duration){
            this.path = animationPath;
            this.triggerElement = triggerElement;
            this.tweenElement = tweenElement;
            this.counterElement = counterElement;
            this.end = end;
            this.duration = duration;

            this.animate();
        }

        animate (){

            const tween = new TimelineLite();

            tween.add(
                TweenLite.to(this.tweenElement, 1, {
                    bezier: this.path,
                    ease: Power1.easeInOut
                })
            );

            const controller = new ScrollMagic.Controller();

            const scene = new ScrollMagic.Scene({
                triggerElement: this.triggerElement,
                duration: 500,
                triggerHook: 0.5

            })
                .setTween(tween)
                //.addIndicators()
                .addTo(controller);

            let obj = {
                id: this.counterElement,
                start: 0,
                end: this.end,
                duration: this.duration
            };

            let that = this;

            scene.on("end", function(e){

                that.animateCounter(that);

            });
        }

        animateCounter(planet) {

            if (planet.end === 0) return;

            let range = planet.end - 0;
            let current = 0;
            let stepTime = Math.abs(Math.floor(planet.duration / range));
            let increment = planet.end > 0? 1 : -1;

            if ( stepTime == 0 ){
                stepTime = 1;
                increment *= 2;
            }

            let obj = document.querySelector(planet.counterElement);

            let timer = setInterval(function() {
                current += increment;
                obj.innerHTML = current + " Mio. km";
                if (current == planet.end) {
                    clearInterval(timer);
                }
            }, stepTime);
        }
    }

    const sunPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: 200, y: -200}
        ]
    };

    const mercuryPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: -700, y: -200}
        ]
    };

    const venusPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: 280, y: -200}
        ]
    };

    const earthPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: -750, y: -200}
        ]
    };

    const marsPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: 280, y: -200}
        ]
    };

    const jupiterPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: -750, y: -200}
        ]
    };

    const saturnPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: 250, y: -200}
        ]
    };

    const uranusPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: -750, y: -200}
        ]
    };

    const neptunePath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: 200, y: -200}
        ]
    };

    let sun = new Planet (sunPath, '.sun-section', '.sun-planet', "#sun-distance > strong", 0, 400);
    let mercury = new Planet (mercuryPath, '.mercury-section', '.mercury-planet',"#mercury-distance > strong", 58, 400);
    let venus = new Planet (venusPath, '.venus-section', '.venus-planet', "#venus-distance > strong", 108, 400);
    let earth = new Planet (earthPath, '.earth-section', '.earth-planet', "#earth-distance > strong", 150, 400);
    let mars = new Planet (marsPath, '.mars-section', '.mars-planet', "#mars-distance > strong", 228, 400);
    let jupiter = new Planet (jupiterPath, '.jupiter-section', '.jupiter-planet', "#jupiter-distance > strong", 778, 500);
    let saturn = new Planet (saturnPath, '.saturn-section', '.saturn-planet', "#saturn-distance > strong", 1440, 600);
    let uranus = new Planet (uranusPath, '.uranus-section', '.uranus-planet', "#uranus-distance > strong", 2900, 600);
    let neptune = new Planet (neptunePath, '.neptune-section', '.neptune-planet', "#neptune-distance > strong", 4500, 600);

}());