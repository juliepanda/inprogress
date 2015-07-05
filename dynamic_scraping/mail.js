var keys = require('./keys.js'); // put API keys in a module
var sendgrid = require('sendgrid')(keys.getUsername(), keys.getPassword());

// var email = new sendgrid.Email();

var payload = {
  to:       'ycp217@nyu.edu',
  from:     'julie.yc.pan@gmail.com',
  subject:  'Saying Hi',
  text:     'This is an email from terminal.'
};

sendgrid.send(payload, function(err, json) {
  if (err) { console.error(err); }
  console.log(json);
});






