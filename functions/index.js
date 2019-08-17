const functions = require('firebase-functions');
const axios = require('axios');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.authenticate = functions.https.onRequest((request, response) => {
  console.log(JSON.stringify(request.body));
  console.log(functions.config().todoist.clientsecret);
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  axios
    .post('https://todoist.com/oauth/access_token', {
      client_id: functions.config().todoist.clientid,
      client_secret: functions.config().todoist.clientsecret,
      code: request.body.appCode
    })
    .then(result => {
      console.log(result.config)
      console.log(result.data);
      response.send(result.data);
    })
    .catch(err => {
      console.log(err);
      response.send(err);
    });
});
