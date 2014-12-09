talk-freely
===========


The app uses 3 APIs on the client side: 
          1. Google web speech API
          2. Microsoft translate API
          3. Microsoft translate speech synthesis API,
and on the server side:
          1. Node Js
          2. Socket.io
          3.Request.
          

The web speech API captures voice and converts it into text. That text is then sent to the server via Socket.io. The server then sends the text to other clients. The clients translate the text into their preferred language and synthesize speech for it via the Microsoft APIs.

On the server side, whenever the server wakes up from standby mode, it uses Request node module to make an ajax call to Microsoft translate server to get an authentication token which is used in each API call to authenticate the app. After that, the server requests for a token after each 8-9 minutes, as the token is valid for 10 minutes only. When the server receives the token, those are transmitted to the clients for use.

To get the app running, client ID and client secret is needed for getting authentication token from Microsoft translate server. For that the app needs to be registered and subscribed to a data package of Microsoft translate API.
Just follow the instructions given in the below link and you are good to go.

http://blogs.msdn.com/b/translation/p/gettingstarted1.aspx

The current version has full support by Chrome for windows and partial support by Chrome for Android. Rest all browsers are not supported now.
