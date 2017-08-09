# RememberMe

## Table of Contents
* [What](#what)
* [Why](#why)
* [Examples](#examples)
* [Setting up](#setting-up)
* [Configuring](#configuring)
* [Tutorial](#tutorial)
* [Questions / Issues](#questions--issues)
* [Uninstalling](#uninstalling)
* [Details of how it works](#details-of-how-it-works)
* [FAQ](#faq)
* [Code](#code)

## What
In a highly connected world, the number of ways to stay in touch are overwhelming.  Between Facebook, Twitter, G+, Snapchat etc. a significant amount of time is spent checking if there is anything to check. Despite its age, email remains the standard which schools and businesses operate. This forces most to have email addresses and check them regularly.

## Why
The inspiration from this project came from my late cousin, [Jeremy Monnett](https://www.google.com/search?q=Jeremy%20Monnett). Jeremy was killed in a plane crash in 2015. He was an amazing person in every way. He left behind his wife and two young boys. I realized that we can’t keep these types of accidents from happening but the more we can leave behind of who we are, the better off the world will be.

I now have an email address for my three young girls. Multiple times a week I use RememberMe to send them an email of what they said, did and things that I’m thinking about. Hopefully one day it will be a window into their childhood and their Dad.

## Examples
RememberMe is a mechanism to use email as a reminder service. The idea is simple; at a configured time or interval have an email show up in **your** inbox, reminding you to complete an action. The action could be anything from sending a birthday greeting to remembering to sign up for swimming lessons. The email will be **from your account**, **to  your account**. The ‘reply-to’ field is set such that replying to that email will send the message to whom you have selected in the configuration.

Below are some examples for how you might use RememberMe.

#### Diary example:
Misha's days (and nights) are busy with three daughters. She would love to remember all the day to day things they say and do but doesn't have time to sit down to a diary every day. RememberMe can help.

Misha could create an email account for her kids. Each morning at a convenient time (eg. 9PM) RememberMe will send her an email reminder. By responding to that reminder email with a summary of all the funny things that happened the night before, she can remember every moment. And her kids have an invaluable story of their childhood.

#### Keeping in touch
Gwen lives a busy life, but would love to make sure she sends an email to her Dad every week.

She can configure RememberMe to deliver an email reminder at a convenient time (eg. Mondays at 6PM) that can help her maintain an important relationship.

#### Important event
Abigail has a busy job at the aquarium and needs to be reminded when she scheduled dinner at her parents house.

She can schedule an email to be delivered the day before reminding her to clear some time.

#### Summary
All the examples could easily be accomplished in a variety of ways on different platforms (eg. Google Calendar reminders, etc). The purpose of this project is to provide a single simple solution which serves reminders in a method which is accessed often (email).

## Setting up
Below are the step by step instructions for using RememberMe.

**Note that emails will be sent only to you.**

#### Installing
* Vist the link [here](https://script.google.com/macros/s/AKfycbza4-Ue0CaRQevhEWJ6WpcerTlXlSYK1Un74-wn8a7iBY8rwYu5/exec).
* **Tip:** Bookmark the installation link, you’ll need to revisit it to make changes.

#### Permissions
During installation the script will ask permissions for the following:

1. Know who you are on Google
2. View your email address
3. View and manage data associated with the application
4. Allow this application to run when you are not present
5. Send email as you

Requests 1,2: Allows the script to determine the address of the current user (eg. you) because all emails will be sent back to your address.

Requests 3: Allows the script to save your settings.

Request 4: Allows the script to set triggers to wake up and send emails at the correct times.

Request 5: Allows the script to send email to you.

**NOTE:** The script does not have access to your entire inbox.

## Configuring
There are two required fields to each RememberMe reminder:

* **'Recipient Name'** is who you would like to ultimately remember who to contact (eg. 'Mom'). The email that is sent to you will have a subject like: 'Hello $name' where $name is the 'Recipient Name' entered.
* **'Recipient Email'** is at which email address you'd like to contact that person (eg. mom@yahoo.com)

Optional fields:

* **'Freq'** is how often you would like to receive reminder emails to contact this recipient. The 'Day/Week/Month/Year' selections allow you to configure exactly when your reminder will showup in your inbox.
* **'Reminder email text'** is the text of the email that will be sent to you. When using RememberMe for keeping track of events, this text might contain something like 'Tomorrow is your anniversary, better get on it!'. As long as you remove this text before replying to the email your 'Recipient' will not see this text.

## Tutorial
Lets go through a simple example. Choose somebody you would like to remember to contact. For this example I'll choose wifey@hotmail.com.

* Open the [RememberMe app](https://script.google.com/macros/s/AKfycbza4-Ue0CaRQevhEWJ6WpcerTlXlSYK1Un74-wn8a7iBY8rwYu5/exec).
* Enter 'Wifey' in 'Recipient Name' box. Enter 'wifey@hotmail.com' in 'Recipient Email' box.
* Click 'Save'
* At 9AM on Monday every week I'll receive an email titled 'Hello Wifey' which will come from my own account.
* When I reply to that email the contents will be sent to 'wifey@hotmail.com'.

## Questions / Issues
Questions and discussion: [RememberMeScript Google Group](https://groups.google.com/forum/#!forum/remembermescript).

File issues [here](https://github.com/blairkutz/rememberme/issues)

## Uninstalling
Uninstall the script [here](https://script.google.com/macros/s/AKfycbza4-Ue0CaRQevhEWJ6WpcerTlXlSYK1Un74-wn8a7iBY8rwYu5/manage/uninstall)

[Advanced users: View the installed triggers by the script [here](https://script.google.com/macros/triggers?id=MrBIrlX3Ctb1bRUehVYD15C6lgTFfYko9)]

## Details of how it works
RememberMe runs on a framework called [Google Apps Scripts](https://developers.google.com/apps-script/?hl=en). It’s a really cool way to programatically access Google services (such as Gmail, Google Calendar, Google Docs/Spreadsheets, etc).

Using something called a [trigger](https://developers.google.com/apps-script/guides/triggers/) the script wakes up at a specific date/time you have configured. It then sends an email from your account to your account. The [reply-to](https://en.wikipedia.org/wiki/Email#Header_fields) field is set such that replying to that email will send the message to whom you have selected in the configuration.

## FAQ
#### What does the recipient see?
Short answer: Everything that you send them.

The email that arrives in your inbox will have the subject line: 'Hello $name' where $name is the 'Recipient' name you configured. The contents of the email will be whatever was in the 'Reminder email text' section.

When replying you might want to edit the subject of the mail ([instructions](https://productforums.google.com/forum/#!topic/gmail/Vz4AX7UfanA)) if you do not want the recipient to see a subject line like: 'Re: Hello $name'.

#### Why is only Gmail supported?
As mentioned in the section above, the script uses Google Apps Script to automate the sending of mail, so  Gmail is required.

While it's true that you need a Gmail account to setup the script, you can still use a non-gmail client to send email:

*  If you usually used an email account me@foo.com
*  Create a Gmail account: me@gmail.com
*  Inside Gmail configure all mail to be forwarded to me@foo.com ([instructions](https://support.google.com/mail/answer/10957?hl=en))
*  Install RememberMe under me@gmail.com
*  You should receive email to me@foo.com that you can reply to and remember important people!

#### When exactly are reminder emails sent?
According to Google Apps Script your trigger will fire +-15 minutes of when you have scheduled it.  Email delivery could introduce some delay but it is not common.

## Code
Source code for this project is open source and posted [here](https://github.com/blairkutz/rememberme).

You can also view and host the Google Script itself [here](https://script.google.com/d/1MyWWhQJEwwIVtzO1lLsbALmvAYFFRmhtA_uUnoYmu-mewIrYnoHmWfmr/edit?usp=sharing).
