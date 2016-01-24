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
  $('#ex1').slider();
  $('#exi').change(function(value) {
    socket.emit("speed", value);
  });
  $('#ex1').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });
});

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function () {
    if (tilt("rotation",event.beta, event.gamma, event.alpha)) {
      socket.emit("gyro", {'beta': beta, 'gamma': gamma, 'alpha': alpha});
    }
  }, true);
}
