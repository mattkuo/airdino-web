var reference = new Firebase('https://airdino.firebaseio.com/');
var beta = 0;
var gamma = 0;
var alpha = 0;

var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};
reference.child('player1').push({'beta': beta, 'gamma': gamma, 'alpha': alpha});


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
        reference.child('player1').set({'beta': beta, 'gamma': gamma, 'alpha': alpha});
      }, true);
  }

// setInterval(function(){
//
//     document.getElementById('debug').innerHTML = beta + ' ' + gamma + ' ' + alpha;
//   }
//   ,0);

reference.on('child_changed', function(snapshot) {
  var rotation = snapshot.val();
  console.log(rotation.beta);
  //displayChatMessage(rotation.beta, rotation.gamma, rotation.alpha);
});
