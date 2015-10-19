// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
