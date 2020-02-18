    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        66: 'b'
    };
  var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

  var konamiCodePosition = 0;

  document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
      konamiCodePosition++;
      if (konamiCodePosition == konamiCode.length) {
        activateCheats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
  
  function activateCheats() {
    var konamiRainbow = document.getElementsByClassName('konami');
    konamiRainbow[0].classList.add('rainbowText');
    konamiRainbow[1].classList.add('rainbowText');

    var audio = new Audio('\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x6d\x79\x69\x6e\x73\x74\x61\x6e\x74\x73\x2e\x63\x6f\x6d\x2f\x6d\x65\x64\x69\x61\x2f\x73\x6f\x75\x6e\x64\x73\x2f\x75\x6e\x74\x69\x74\x6c\x65\x64\x2d\x31\x5f\x71\x50\x73\x6b\x68\x66\x6e\x2e\x6d\x70\x33');
    audio.volume = 0.1;
    audio.play();
  }