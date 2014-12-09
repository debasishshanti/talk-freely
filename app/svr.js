var express = require('express'),
  app = express(),
   server = require('http').createServer(app),
   io = require('socket.io').listen(server);
   
server.listen(8080);

var token = '', clientCounter = 0, timer;

app.get('/', function(req, res)
{
  res.sendfile( 'index.html');
});

function gettoken() {

var request = require('request');
request.post(
    'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/',
    { form: { 
       client_id : '<your client id here>', 
       client_secret  : '<your client secret here>', 
       scope  : 'http://api.microsofttranslator.com', 
       grant_type  : 'client_credentials' 
    } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsBody = JSON.parse(body);
            token = jsBody.access_token;
            io.emit('token', token);
        }
        else
        {
            console.log('error in request');            
        }
    }
);
}

io.on('connection', function(socket)
{
    if(!clientCounter)
    {
      gettoken();
      timer = setInterval(function(){
        token = '';
        gettoken();
      }, 480000);
    }
    clientCounter++;
    if(token.length>1)
    {
      socket.emit('token', token);
    }
    
    io.emit('token', token);
    socket.on('send msg', function(data){
      socket.broadcast.emit('new msg', data);
    });

    socket.on('disconnect', function(){
      clientCounter--;
      if(clientCounter == 0)
      {
        clearInterval(timer);
      }
    });

});
