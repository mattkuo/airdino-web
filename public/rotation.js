function tilt(string,x,y,z){
  document.getElementById(string).innerHTML = "x : " + Math.floor(x) +
  '  y : ' + Math.floor(y) + '  z : ' + Math.floor(z);
}

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function () {
      tilt("rotation",event.beta, event.gamma, event.alpha);
    }, true);
}
