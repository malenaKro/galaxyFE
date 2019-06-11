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

            //this.vx = Math.random() - 0.5;
            this.vy = Math.random() * 0.1 - 0.05;
        }

        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            //ctx.fillRect(this.x, this.y, 8, 8);
        }
        update(){
            this.y+=this.vy;

            //check out of bounds
            if (this.y <= 0) {
                this.y = canvas.height;
            }
            if (this.y >= canvas.height){
                this.y = 0;
            }
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
            p.update();
            p.draw();
        });

        window.requestAnimationFrame(draw);
    }

    draw();

    /* PLANET ANIMATION WHEN SCROLLING */

    const sunPath = {
        curviness: 1.25,
        autoRotate: true,
        values: [
            {x: 200, y: -200}
        ]
    }

    const tween = new TimelineLite();

    tween.add(
      TweenLite.to('.sun-info', 2, {
          bezier: sunPath,
          ease: Power1.easeInOut
      })
    );

    const sunController = new ScrollMagic.Controller();

    const sunScene = new ScrollMagic.Scene({
        triggerElement: 'sun-section',
        duration: 800,
        triggerHook: 0.8

    })
        .setTween(tween)
        .addIndicators()
        .addTo(sunController);

}());