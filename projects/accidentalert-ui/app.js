var express = require('express');
var app = express();
var stringReplace = require('string-replace-middleware');

console.log(process.env);

// writing from Deployment Config to temporary variables
var BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/secured";
var SSO_URL = process.env.SSO_URL || "http://localhost:8080/auth";
var KEYCLOAK_REALM = process.env.KEYCLOAK_REALM || "insurance";
var KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || "accidentui-client";
var KEYCLOAK_ROLE = process.env.AUTHENTICATION_OPTION || "none";
var AUTHENTICATION_OPTION = process.env.AUTHENTICATION_OPTION || "none";

var PORT = process.env.PORT || 8080;

// adding values into the source code
app.use(stringReplace({
   'ENVIRONMENT.BACKEND_URL': BACKEND_URL,
   'ENVIRONMENT.SSO_URL': SSO_URL,
   'ENVIRONMENT.KEYCLOAK_REALM' : KEYCLOAK_REALM,
   'ENVIRONMENT.KEYCLOAK_CLIENT_ID': KEYCLOAK_CLIENT_ID,
   'ENVIRONMENT.KEYCLOAK_ROLE' : KEYCLOAK_ROLE,
   'ENVIRONMENT.AUTHENTICATION_OPTION': AUTHENTICATION_OPTION
}));

app.use(express.static('templates/dist'))

app.get('/', function(req, res) {
    res.render('index.html');
});

//app.listen(8080);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
