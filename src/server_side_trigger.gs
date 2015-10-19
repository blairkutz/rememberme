function SendEmailTrigger(e) {
  var readers = getData();
  var trigger_uid = e.triggerUid

  for(var i=0; i<readers.length; i++) {
    var reader = readers[i];
    if(reader.trigger == trigger_uid) {
      SendEmail(reader);
    }
  }
}


function SendEmail(reader) {
  // Make sure we have quota
  if(!MailApp.getRemainingDailyQuota() > 0) {
    throw('No remaining quota!');
  }

  // Compose message
  var to = Session.getEffectiveUser().getEmail();
  if(to.length == 0) {
    throw('Unable to get user email.');
  }
  
  var subject = 'Hello ' + reader.name;
  var body = '';
  
  if(reader.message.length != 0) {
    body = reader.message;
  } else {
    body += 'Hello,\n';
    body += 'Please remember to email me!\n';
    body += '-' + reader.name + '\n';  
  }
  
  MailApp.sendEmail(to, subject, body, {replyTo: reader.email});
}
