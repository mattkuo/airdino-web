var myDataRef = new Firebase('https://airdino.firebaseio.com/');
var beta = 0;
var gamma = 0;
var alpha = 0;

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
      }, true);
  }

setInterval(function(){
  myDataRef.push({'beta': beta, 'gamma': gamma, 'alpha': alpha});
    document.getElementById('debug').innerHTML = beta + ' ' + gamma + ' ' + alpha;
  }
  ,5000);

myDataRef.on('child_changed', function(snapshot) {
  var rotation = snapshot.val();
  console.log(rotation.beta);
  //displayChatMessage(rotation.beta, rotation.gamma, rotation.alpha);
});

// function displayChatMessage(x,y,z) {
//   document.getElementById("output").innerHTML = "x : " + Math.floor(x) +
//   '  y : ' + Math.floor(y) + '  z : ' + Math.floor(z);
//   // $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
//   // $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
// };
