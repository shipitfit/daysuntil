(function(global) {

    var width = 1920;
    var height = 1080;
    var centerX = width / 2;
    var centerY = height / 2;

    function resize() {

        var canvas = document.querySelector('canvas');

        // for slow connections
        if (canvas) {
            var ratio = width / height;

            ratio = window.innerWidth / (width) < window.innerHeight / (height) ? window.innerWidth / (width) : window.innerHeight / (canvas.height);

            var w2 = Math.min(width * ratio, window.innerWidth);
            var h2 = Math.min(height * ratio, window.innerHeight);

            w2 = Math.min(width, w2);
            h2 = Math.min(height, h2);

            canvas.style.width = w2 + "px";
            canvas.style.height = h2 + "px";

            //this.iframe.style.width = w2 + 20 + "px";
        }
    }


    function PixiStart() {
        var renderer = PIXI.autoDetectRenderer(width, height, {
            backgroundColor: 0x000000
        });
        document.querySelector("#game").appendChild(renderer.view);

        // create the root of the scene graph
        var stage = new PIXI.Container();

        var bgTexture = PIXI.Texture.fromImage('img/xmas1.jpg');
        var bgImage = new PIXI.Sprite(bgTexture);
        bgImage.position.x = 0;
        bgImage.position.y = 0;
        bgImage.width = 1920;
        bgImage.height = 1080;
        stage.addChild(bgImage);

        /*  
                // create a video texture from a path
                var fireworksVideo = PIXI.Texture.fromVideo('videos/fireworks.mp4');
                // create a new Sprite using the video texture (yes it's that easy)
                var videoSprite = new PIXI.Sprite(fireworksVideo);
                videoSprite.width = renderer.width;
                videoSprite.height = renderer.height;
                videoSprite.texture.baseTexture.source.loop = 'loop';
                stage.addChild(videoSprite);
        */

        // Create a new emitter
        var emitter = this.createEmitter(stage);
        emitter.emit = true;
        emitter.updateOwnerPos(centerX, centerY);


        var emitter2 = this.createEmitter2(stage);
        emitter2.emit = true;
        emitter2.updateOwnerPos(centerX, centerY);

        var elapsed = Date.now();
        var countDown = new DateUntil();

        var counter = $("#counter");

        function animate() {
            requestAnimationFrame(animate);

            var now = Date.now();

            // The emitter requires the elapsed
            // number of seconds since the last update
            emitter.update((now - elapsed) * 0.001);
            emitter2.update((now - elapsed) * 0.001);
            elapsed = now;

            counter.html(countDown.update());
            // render the container
            renderer.render(stage);
        }

        animate();

      //  this.startAudio();
    }


    var _p = PixiStart.prototype;

    _p.startAudio = function() {
        // create WebAudio API context
        var context = new AudioContext()

        // Create lineOut
        var lineOut = new WebAudiox.LineOut(context)

        // load a sound and play it immediatly
        WebAudiox.loadBuffer(context, 'audio/silent-night-disco.mp3', function(buffer) {
            // init AudioBufferSourceNode
            var source = context.createBufferSource();
            source.buffer = buffer
            source.connect(lineOut.destination)
            source.loop = true;
            // start the sound now
            source.start(0);
            $('body').click();
        });
    };

    _p.createEmitter = function createEmitter(stage) {
        var emitter = new cloudkid.Emitter(

            // The DisplayObjectContainer to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the PIXI.Stage
            stage,

            // The collection of particle images to use
            [PIXI.Texture.fromImage('img/particle.png')],

            // Emitter configuration, edit this to change the look
            // of the emitter
            {
                "alpha": {
                    "start": 1,
                    "end": 0
                },
                "scale": {
                    "start": 0.1,
                    "end": 1,
                    "minimumScaleMultiplier": 1
                },
                "color": {
                    "start": "#ffc37f",
                    "end": "#f78605"
                },
                "speed": {
                    "start": 0,
                    "end": 0
                },
                "acceleration": {
                    "x": 10,
                    "y": 10
                },
                "startRotation": {
                    "min": 0,
                    "max": 360
                },
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": 0.2,
                    "max": 1
                },
                "blendMode": "screen",
                "frequency": 0.001,
                "emitterLifetime": -1,
                "maxParticles": 50,
                "pos": {
                    "x": -centerX,
                    "y": -centerY
                },
                "addAtBack": false,
                "spawnType": "rect",
                "spawnRect": {
                    "x": 0,
                    "y": 0,
                    "w": width,
                    "h": height
                }
            }
        );

        // emitter.emitterLifetime = -1;
        // emitter.maxParticles = 50;
        // emitter.frequency = 0.001;
        // emitter.spawnType = 'rect';        
        // emitter.spawnRect.x = 0;
        // emitter.spawnRect.y = 0;
        // emitter.spawnRect.width = width;
        // emitter.spawnRect.height = height;
        //emitter.updateSpawnPos( -centerX, -centerY);

        return emitter;
    }


    _p.createEmitter2 = function createEmitter(stage) {
        var emitter = new cloudkid.Emitter(

            // The DisplayObjectContainer to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the PIXI.Stage
            stage,

            // The collection of particle images to use
            [PIXI.Texture.fromImage('img/snow.png')],

            // Emitter configuration, edit this to change the look
            // of the emitter
            {
                "alpha": {
                    "start": 0.5,
                    "end": 0.8
                },
                "scale": {
                    "start": 0.5,
                    "end": 1,
                    "minimumScaleMultiplier": 1
                },
                "color": {
                    "start": "#9e9e9e",
                    "end": "#ffffff"
                },
                "speed": {
                    "start": 50,
                    "end": 100
                },
                "acceleration": {
                    "x": 0,
                    "y": 50
                },
                "startRotation": {
                    "min": 90,
                    "max": 90
                },
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": 5,
                    "max": 10
                },
                "blendMode": "screen",
                "frequency": 0.1,
                "emitterLifetime": -1,
                "maxParticles": 50,
                "pos": {
                    "x": -centerX,
                    "y": -centerY
                },
                "addAtBack": false,
                "spawnType": "rect",
                "spawnRect": {
                    "x": 0,
                    "y": 0,
                    "w": width,
                    "h": 0
                }
            }
        );

        // emitter.emitterLifetime = -1;
        // emitter.maxParticles = 50;
        // emitter.frequency = 0.001;
        // emitter.spawnType = 'rect';        
        // emitter.spawnRect.x = 0;
        // emitter.spawnRect.y = 0;
        // emitter.spawnRect.width = width;
        // emitter.spawnRect.height = height;
        //emitter.updateSpawnPos( -centerX, -centerY);

        return emitter;
    }


    function DateUntil() {
        var year = new Date().getFullYear();
        var xmas = new Date(year, 11, 25, 0, 0, 0, 0);
        var xmasMS = xmas.getTime();



        this.update = function() {

            var ms = xmasMS - Date.now();
            var x = ms / 1000;
            var seconds = Math.floor(x % 60);
            x /= 60;
            var minutes = Math.floor(x % 60);
            x /= 60;
            var hours = Math.floor(x % 24);
            x /= 24;
            var days = Math.floor(x);

            if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
                if (days == 0 || days == -1) {
                    return "Merry Christmas!";
                } else {
                    return "Happy Holidays!"
                }

            }

            seconds = seconds <= 9 ? '0' + seconds : '' + seconds;
            minutes = minutes <= 9 ? '0' + minutes : '' + minutes;
            hours = hours <= 9 ? '0' + hours : '' + hours;
            if (days <= 0) {
                days = "";
            } else {
                days = days <= 9 ? '0' + days + ' days' : days + ' days';
            }


            return days + " " + hours + "h " + minutes + "m " + seconds + "s <br> until CHRISTMAS!"
        }
    }




    // Init
    window.addEventListener('resize', resize, false);
    global.Disco = new PixiStart();

})(window);
