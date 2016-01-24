var socket = io('http://45.79.134.17:7777');

var TOLERANCE = 2;
var beta = 0,
    gamma = 0,
    alpha = 0;

function tilt(string,x,y,z){
  var changeSignificant = false;
  if (isChangeSignificant(beta, Math.floor(x)) ||
      isChangeSignificant(gamma, Math.floor(y) ||
      isChangeSignificant(alpha, Math.floor(z)))) {
    changeSignificant = true;
  }

  beta = Math.floor(x);
  gamma = Math.floor(y);
  alpha = Math.floor(z);

  document.getElementById(string).innerHTML = "x : " + Math.floor(x) +
  '  y : ' + Math.floor(y) + '  z : ' + Math.floor(z);

  return changeSignificant;
}

function isChangeSignificant(oldVal, newVal) {
  return Math.abs(newVal - oldVal) > TOLERANCE;
}


$(document).ready(function(){
  $('#slow').button();
  $('#slow').click(function() {
    socket.emit("speed", -10);
  });
  $('#fast').button();
  $('#fast').click(function() {
    socket.emit("speed",10);
  });

});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function () {
    if (tilt("rotation",event.beta, event.gamma, event.alpha)) {
      socket.emit("gyro", {'beta': beta, 'gamma': gamma, 'alpha': alpha});
    }
  }, true);
}
