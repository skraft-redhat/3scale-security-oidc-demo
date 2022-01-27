var express = require('express');
var app = express();
var stringReplace = require('string-replace-middleware');

console.log(process.env);

var BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/secured";
var SSO_URL = process.env.SSO_URL || "http://localhost:8080/auth";
console.log("BACKEND_URL: ", BACKEND_URL);
console.log("SSO_URL:", SSO_URL);

var PORT = process.env.PORT || 8080;
app.use(stringReplace({
   'PROCESS.ENVIRONMENT.BACKEND_URL': BACKEND_URL,
   'PROCESS.ENVIRONMENT.SSO_URL': SSO_URL
}));
app.use(express.static('template/dest'))

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/client.js', function(req, res) {
    res.render('client.js');
});

//app.listen(8080);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
