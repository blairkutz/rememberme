function doGet() {
  var output = HtmlService.createTemplateFromFile('INDEX')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return output;
}

// FROM: https://developers.google.com/apps-script/guides/html/best-practices
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .getContent();
}

// Called from client side when page loads.
// Loads preferences and returns readers (may be empty array).
function getData() {
  var p = new Preferences();
  p.load();
  return p.getReaders();
}

function installTrigger(reader) {
  debug('Installing trigger');
  var clock_trigger_builder = ScriptApp.newTrigger('SendEmailTrigger').timeBased();
  clock_trigger_builder.nearMinute(0);
  clock_trigger_builder.atHour(reader.email_hour);
  var date = new Date();
  if(reader.freq == _DAILY) {
    clock_trigger_builder.everyDays(1);
  } else if(reader.freq == _WEEKLY) {
    var day = null;
    switch(reader.email_weekday) {
      case "0":
        day = ScriptApp.WeekDay.SUNDAY;
        break;
      case "1":
        day = ScriptApp.WeekDay.MONDAY;
        break;
      case "2":
        day = ScriptApp.WeekDay.TUESDAY;
        break;
      case "3":
        day = ScriptApp.WeekDay.WEDNESDAY;
        break;
      case "4":
        day = ScriptApp.WeekDay.THURSDAY;
        break;    
      case "5":
        day = ScriptApp.WeekDay.FRIDAY;
        break;    
      case "6":
        day = ScriptApp.WeekDay.SATURDAY;
        break;        
    }
    clock_trigger_builder.onWeekDay(day);
    clock_trigger_builder.everyWeeks(1);
  } else if(reader.freq == _MONTHLY) {
    clock_trigger_builder.onMonthDay(reader.email_month_day);
  } else if(reader.freq == _ONCE) {
    // One time triggers aren't allowed to set re-occurance
    clock_trigger_builder = ScriptApp.newTrigger('SendEmailTrigger').timeBased();
    var trigger_date = new Date(reader.email_year, reader.email_year_month, reader.email_month_day, reader.email_hour, 0);
    clock_trigger_builder.at(trigger_date);
  }
  debug('About to create trigger');
  reader.trigger = clock_trigger_builder.create().getUniqueId();
  debug('Complete. trigger uid: ' + reader.trigger);
}

// After Save button has been pressed these are the new
// preferences
function save(readers) {
  debug('Saving ' + readers.length);
  // Clear all current triggers
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i<triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  debug('All triggers deleted');
  for(var i=0; i<readers.length; i++) {
    installTrigger(readers[i]);
  }
  var p = new Preferences();
  p.setReaders(readers);
  p.save();
  return p.getReaders()
}
