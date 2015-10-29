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

// NOTE: Running these tests clears all information.
////////////////////////////////////////////////////
// UNIT TEST FRAMEWORK //
////////////////////////////////////////////////////
function assert(b, msg) {
  if (!b) {
    throw msg;
  }
}

function testAll() {
  SingleReader();
  MultipleReaders();
  PrintAll();
  testDeleteTrigger();
  DeleteReaderTest();
  saveButtonPress();
  ClearAll();
}

////////////////////////////////////////////////////
// PROPERTY TEST //
////////////////////////////////////////////////////
function SingleReader() {
  var p = new Preferences();
  p.clearAll();
  assert(!p.load(), 'No prefs should be found');
  var reader = new Reader();
  reader.name = 'Gwen and Abby';
  reader.email_hour = 3;
  reader.freq = _DAILY;
  p.addReader(reader);
  p.save();
  p = null;

  var p = new Preferences();
  assert(p.load(), 'Load should succeed');
  assert(p.readers.length == 1, p.readers.length);
  assert(p.readers[0].name == 'Gwen and Abby', p.readers[0].name);
  assert(p.readers[0].email_hour == 3, 'email hour is: ' + p.readers[0].email_hour);
  assert(p.readers[0].freq == _DAILY, 'email freq is: ' + p.readers[0].freq);
}

function DeleteReaderTest() {
  ClearAll();

  var reader = new Reader();
  reader.name = 'Gwen and Abby';
  reader.email_hour = 3;
  reader.freq = _DAILY;
  reader.trigger = 1;
  var p = new Preferences();
  p.addReader(reader);

  reader = new Reader();
  reader.name = 'Misha';
  reader.email_hour = 3;
  reader.freq = _DAILY;
  reader.trigger = 2;
  p.addReader(reader);
  p.save();
  p = null;

  var p = new Preferences();
  assert(p.load(), 'Load should succeed');
  assert(p.readers.length == 2, p.readers.length);

  // Now delete the reader with trigger 2;
  r = new Reader();
  r.trigger = 2;
  assert(p.deleteReader(r), 'Could not delete reader');
  assert(p.readers.length == 1, p.readers.length);

  // Check that reloading only has the correct reader
  var p = new Preferences();
  assert(p.load(), 'Load should succeed');
  assert(p.readers.length == 1, p.readers.length);
  assert(1 == p.readers[0].trigger, 'Actual trigger: ' + p.readers[0].trigger);

}

function MultipleReaders() {
  ClearAll();
  var p = new Preferences();
  var reader1 = new Reader();
  reader1.freq = _WEEKLY;
  reader1.name = 'Gwen';
  var gwen_date = new Date();
  gwen_date.setMonth(3 - 1);
  gwen_date.setDate(5);
  gwen_date.setFullYear(2011);
  p.addReader(reader1);

  var reader2 = new Reader();
  reader2.freq = _ONCE;
  reader2.name = 'Abby';
  var abby_date = new Date();
  abby_date.setMonth(6 - 1);
  abby_date.setDate(27);
  abby_date.setFullYear(2013);
  p.addReader(reader2);

  p.save();

  var p = new Preferences();
  assert(p.load(), 'Load should succeed');
  assert(p.readers.length == 2, p.readers.length);
  var gwen_index = 0;
  var abby_index = 1;
  if (p.readers[0].name == 'Abby') {
    gwen_index = 1;
    abby_index = 0;
  }
  assert(p.readers[gwen_index].freq == _WEEKLY, 'Gwen freq:' + p.readers[gwen_index].freq);
  assert(p.readers[gwen_index].name == 'Gwen', 'Gwen name:' + p.readers[gwen_index].name);
  assert(p.readers[abby_index].freq == _ONCE, 'Abby freq:' + p.readers[abby_index].freq);
  assert(p.readers[abby_index].name == 'Abby', 'Abby name:' + p.readers[abby_index].name);
}

function saveButtonPress() {
  ClearAll();

  var r1 = new Reader();
  r1.name = 'Gwen';
  r1.freq = _DAILY;
  r1.email_hour = 1;

  save([r1]);
  var p = new Preferences();
  p.load();
  assert(1, p.readers.length, 'failed to save');
  assert('Gwen', p.readers[0].name, 'Actual name: ' + p.readers[0].name);

  var r2 = new Reader();
  r2.name = 'Abby';
  r2.freq = _DAILY;
  r2.email_hour = 1;

  save([r2]);

  p = new Preferences();
  p.load();
  assert(1, p.readers.length, 'failed to save');
  assert('Abby', p.readers[0].name, 'Actual name: ' + p.readers[0].name);
}

function testWeeklyTimer() {
  ScriptApp.newTrigger("TriggerFiredTest")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SATURDAY)
    .everyWeeks(1)
    .atHour(7)
    .nearMinute(0)
    .create();
}

function ClearAll() {
  var p = new Preferences();
  p.clearAll();

  // Clear all current triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

function testDeleteTrigger() {
  // Create a trigger
  var trigger = ScriptApp.newTrigger('anything')
    .timeBased()
    .after(10000)
    .create();
  var uid = trigger.getUniqueId();
  debug('Trigger UID:' + uid);

  // Should work the first time
  assert(deleteTrigger(uid), 'failed to delete trigger');
  // But not work the second time
  assert(!deleteTrigger(uid), 'should have failed');
}

function PrintAll() {
  var p = new Preferences();
  p.load();
}
