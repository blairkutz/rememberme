////////////////////////////////////////////////////
// UNIT TEST FRAMEWORK //
////////////////////////////////////////////////////
function assert(b, msg) {
  if(!b) {
    throw msg;
  }
}

function testAll() {
  SingleReader();
  MultipleReaders();
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

function MultipleReaders() {
  var p = new Preferences();
  p.clearAll();
  
  var reader1 = new Reader();
  reader1.freq = _WEEKLY;
  reader1.name = 'Gwen';
  var gwen_date = new Date();
  gwen_date.setMonth(3-1);
  gwen_date.setDate(5);
  gwen_date.setFullYear(2011);
  reader1.special_dates.push(gwen_date.toString());
  p.addReader(reader1);
    
  var reader2 = new Reader();
  reader2.freq = _ONCE;
  reader2.name = 'Abby';
  var abby_date = new Date();
  abby_date.setMonth(6-1);
  abby_date.setDate(27);
  abby_date.setFullYear(2013);
  reader2.special_dates.push(abby_date.toString());
  p.addReader(reader2);
  
  p.save();
  
  var p = new Preferences();
  assert(p.load(), 'Load should succeed');
  assert(p.readers.length == 2, p.readers.length);
  var gwen_index = 0;
  var abby_index = 1;
  if(p.readers[0].name == 'Abby') {
    gwen_index = 1;
    abby_index = 0;
  }
  assert(p.readers[gwen_index].freq == _WEEKLY, 'Gwen freq:' + p.readers[gwen_index].freq);
  assert(p.readers[gwen_index].name == 'Gwen', 'Gwen name:' + p.readers[gwen_index].name);
  assert(p.readers[gwen_index].special_dates.length == 1, 'Gwen special_dates:' + p.readers[gwen_index].special_dates.length);
  assert(p.readers[gwen_index].special_dates[0] == gwen_date.toString(), 'Gwen date:' + p.readers[gwen_index].special_dates[0]);
  assert(p.readers[abby_index].freq == _ONCE, 'Abby freq:' + p.readers[abby_index].freq);
  assert(p.readers[abby_index].name == 'Abby', 'Abby name:' + p.readers[abby_index].name);
  assert(p.readers[abby_index].special_dates.length == 1, 'Abby special_dates:' + p.readers[abby_index].special_dates.length);
  assert(p.readers[abby_index].special_dates[0] == abby_date.toString(), 'Abby date:' + p.readers[abby_index].special_dates[0]);
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
}

function PrintAll() {
  var p = new Preferences();
  p.load();
}

function EmailTest() {
  var r = new Reader();
  r.name = 'Gwen and Abby';
  r.email = 'kutzman.kids@gmail.com';
  r.freq = _DAILY;
  SendEmail(r);
}

function TriggerFiredTest(e) {
  MailApp.sendEmail('blairkutz@gmail.com', 'blairkutz@gmail.com', 'Trigger element', 'Trigger Element contains:' + JSON.stringify(e));
}

function TriggerTest() {
  clock_trigger_builder = ScriptApp.newTrigger('TriggerFiredTest').timeBased();
  var trigger_date = new Date();
  debug('Original date: ' + trigger_date);
  trigger_date.setMinutes(trigger_date.getMinutes() + 1);
  debug('New date: ' + trigger_date);
  clock_trigger_builder.at(trigger_date);
  var uid = clock_trigger_builder.create().getUniqueId();
  debug('Complete. trigger uid: ' + uid);
}

function ClearTriggers() {
 // TODO(bkutzman)
}
