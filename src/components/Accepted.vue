<template>
    <div class="wrapper" id="canvas-wrap">
        <canvas> </canvas>
        <div id="overlay">
            <div class="modal">
                <div class="modal-top">
                    <span class="logocss">
                        <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
                    </span>
                    <img class="modal-icon" src="https://dl.dropboxusercontent.com/s/e1t2hhowjcrs7f5/100daysui_100icon.png" alt="Trophy" />
                    <div class="modal-header">Congratulations</div>
                    <div class="modal-subheader">You have been accepted to DeltaHacks V</div>
                </div>
                <div>
                    <a class="modal-bottom1" href="/">I'll not be able to make it :(</a>
                    <a class="modal-bottom2" href="/">I'll be there</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let W = window.innerWidth;
    let H = window.innerHeight;
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const maxConfettis = 150;
    const particles = [];

    const possibleColors = [
      'DodgerBlue',
      'OliveDrab',
      'Gold',
      'Pink',
      'SlateBlue',
      'LightBlue',
      'Gold',
      'Violet',
      'PaleGreen',
      'SteelBlue',
      'SandyBrown',
      'Chocolate',
      'Crimson',
    ];

    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function confettiParticle() {
      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(11, 33); // radius
      this.d = Math.random() * maxConfettis + 11;
      this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
      this.tilt = Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;

      this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
      };
    }

    function Draw() {
      const results = [];

      // Magical recursive functional love
      requestAnimationFrame(Draw);

      context.clearRect(0, 0, W, window.innerHeight);

      for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
      }

      let particle = {};
      let remainingFlakes = 0;
      for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }

      return results;
    }

    window.addEventListener(
      'resize',
      () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      false,
    );

    // Push new confetti objects to `particles[]`
    for (let i = 0; i < maxConfettis; i++) {
      particles.push(new confettiParticle());
    }

    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();
  },
};
</script>

<style scoped src="../assets/css/acceptreject.css">
#canvas-wrap {
  position: relative;
  width: 800px;
  height: 600px;
}
#canvas-wrap canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
h1 {
  position: absolute;
  margin-top: 30vh;
  width: 100%;
  text-align: center;
  font-size: 333%;
  font-family: sans-serif;
  color: grey;
  opacity: 0.5;
}

canvas {
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
}
</style>
