var submit = document.getElementById('submit_btn');

submit.onclick = function () {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        
      if (request.readystate === XMLHttpRequest.DONE) {
      
          if (request.status === 200 ) {
             alert('Logged in');
          }  else if (request.status === 403 ) {
             alert('Not logged in');
          } else if (request.status === 500 ) {
             alert('server issue');
          }
      }
    };  
}

var username = document.getElementById('username').value;
var password = document.getElementById('password').value;

console.log(username);
console.log(password);

request.open('POST','http://coco98.imad.hasura-app.in/login', true);
request.setRequestHeader('Content-type', 'application/json');
request.send(JSON.stringify({username : username, password : password}));


