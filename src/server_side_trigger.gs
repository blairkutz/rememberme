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


// Don't correct caps. Will break triggers
function SendEmailTrigger(e) {
  debug('sendEmailTrigger(' + JSON.stringify(e) + ')');
  var readers = getData();
  var trigger_uid = e.triggerUid;

  for (var i = 0; i < readers.length; i++) {
    var reader = readers[i];
    if (reader.trigger == trigger_uid) {
      debug('Reader: ' + reader.name + ' matches trigger_uid');
      sendEmail(reader);
      // Remove 'once' triggers as they are not useful any longer.
      if (reader.freq == _ONCE) {
        debug('Removing trigger because configured to execute once.');
        deleteTrigger(reader.trigger);
        var p = new Preferences();
        p.deleteReader(reader);
      }
      return;
    }
  }
}

function deleteTrigger(uid) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    if (uid == trigger.getUniqueId()) {
      debug('Deleted trigger.');
      ScriptApp.deleteTrigger(trigger);
      return true;
    }
  }
  // Could throw() here?
  debug('Could not find trigger with ID: ' + uid + ' to delete.');
  return false;
}

function sendEmail(reader) {
  // Make sure we have quota
  if (!MailApp.getRemainingDailyQuota() > 0) {
    throw ('No remaining quota!');
  }

  // Compose message
  var to = Session.getEffectiveUser().getEmail();
  if (to.length == 0) {
    throw ('Unable to get user email.');
  }

  var subject = 'Hello ' + reader.name;
  var body = '';

  if (reader.message.length != 0) {
    body = reader.message;
  } else {
    body += 'Hello,\n';
    body += 'Please remember to email me!\n';
    body += '-' + reader.name + '\n';
  }

  MailApp.sendEmail(to, subject, body, {
    replyTo: reader.email
  });
}
