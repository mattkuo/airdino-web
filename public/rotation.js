var socket = io('http://localhost');
var beta = 0;
var gamma = 0;
var alpha = 0;
socket.on('connect', function(){
  socket.emit("gyro", {'beta': beta, 'gamma': gamma, 'alpha': alpha});
});

var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};


function tilt(string,x,y,z){

  beta = Math.floor(x);
  gamma = Math.floor(y);
  alpha = Math.floor(z);

  document.getElementById(string).innerHTML = "x : " + Math.floor(x) +
  '  y : ' + Math.floor(y) + '  z : ' + Math.floor(z);
}

  if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", function () {
        tilt("rotation",event.beta, event.gamma, event.alpha);
        socket.emit("gyro", {'beta': beta, 'gamma': gamma, 'alpha': alpha});
      }, true);
  }

// setInterval(function(){
//
//     document.getElementById('debug').innerHTML = beta + ' ' + gamma + ' ' + alpha;
//   }
//   ,0);
