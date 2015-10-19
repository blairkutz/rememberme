_DAILY = 'daily';
_WEEKLY = 'weekly';
_MONTHLY = 'monthly';
_ONCE = 'once';

// Name of preferences key
_PREFERENCES_KEY = 'preferences';

///// READER //////
function Reader() {
 // Name of the reader (eg. "Gwen" || "Abby")
 this.name = null;
 
 // Reader email's address
 this.email = null;
 
 // Unique ID of the trigger
 this.trigger = null;
 
 // How often we will send emails
 // If _DAILY then email_hour set too
 // If _WEEKLY then email_hour and email_weekday set too
 // If _MONTHLY then email_hour, email_weekday and email_month_day set too
 // If _ONCE then email_hour, email_weekday, email_month_day and email_year_month set too
 this.freq = null;
 
 // Hour to send daily emails (Date().getHour(), 0-23)
 this.email_hour = null;
 
 // Day of week to send weekly emails (Date().getDay(), 0-6)
 this.email_weekday = null;
 
 // Day of the month to send monthly emails (Date().getDate(), 1-31)
 this.email_month_day = null;
 
 // Month of the year to send once emails (Date().getMonth(), 0-11)
 this.email_year_month = null;
 
 // Year to send 'once' emails
 this.email_year = null;
 
 // The message to send
 this.message = null;
}

///// PREFERENCES //////
function Preferences() {
  // List of Readers
  this.readers = [];

}
Preferences.prototype.save = function() {
  debug('Saving preferences');
  PropertiesService.getUserProperties().setProperty(_PREFERENCES_KEY, JSON.stringify(this.readers));
  debug('Success saving');
}
// Return true/false if Load succeeds
Preferences.prototype.load = function() {
  debug('Loading preferences');
  var prefs = PropertiesService.getUserProperties().getProperty(_PREFERENCES_KEY);
  if(null == prefs) {
    debug('No saved preferences.');
    return false;
  } else {
    debug('Found saved preferences:' + prefs);
    this.readers = JSON.parse(prefs);
    // Sort by name of reader
    this.readers.sort(function(a,b) {
      var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
       }
      return 0;
    });
    return true;
  }
}
Preferences.prototype.clearAll = function() {
  debug('Clearing preferences');
  PropertiesService.getUserProperties().deleteProperty(_PREFERENCES_KEY);
}
Preferences.prototype.addReader = function(reader) {
  this.readers.push(reader);
}
Preferences.prototype.getReaders = function() {
  return this.readers;
}
Preferences.prototype.setReaders = function(readers) {
  this.readers = readers;
}
