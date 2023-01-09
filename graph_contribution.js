let rects = [];

function visualize(analyser) {
  analyser.fftSize = 2048;
  var bufferLength = analyser.fftSize;
  var dataArray = new Uint8Array(bufferLength);

  function run() {
    analyser.fftSize = 2048;
    var bufferLengthAlt = analyser.frequencyBinCount;
    var dataArrayAlt = new Uint8Array(bufferLengthAlt);

    function stepp(value) {
      if (value < 1) {
        return 0;
      } else if (value < 30) {
        return 1;
      } else if (value < 60) {
        return 2;
      } else if (value < 90) {
        return 3;
      } else if (value < 120) {
        return 4;
      } else if (value < 150) {
        return 5;
      } else if (value < 170) {
        return 6;
      } else if (value < 200) {
        return 7;
      } else {
        return 8;
      }
    }

    var draw = function() {
      drawVisual = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArrayAlt);

      for (var j = 0; j < rects.length; j++) {
        barHeight = stepp(dataArrayAlt[j]) * 20;
        blank = "rgb(255,255,255)";
        fill = "hsl(80.2,62.2%," + (9 - stepp(barHeight)) * 10 + "%)";
        if (stepp(barHeight) < 6 - (j % 7))
          rects[j].setAttribute("fill", blank);
        else rects[j].setAttribute("fill", fill);
      }
    };
    draw();
  }
  run();
}

function dothething() {
  var constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createMediaStreamSource(stream);
    var analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    visualize(analyser);
  });
}
document.getElementsByClassName("js-yearly-contributions")[0].onclick = () => {
  console.log("It's on!");
  dothething();
};
const gs = document
  .getElementsByClassName("js-calendar-graph-svg")[0]
  .getElementsByTagName("g")[0]
  .getElementsByTagName("g");

Array.from(gs).forEach(g => {
  rects = [...rects, ...Array.from(g.getElementsByTagName("rect"))];
});
