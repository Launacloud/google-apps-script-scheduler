# Google Apps Script Scheduler
Example code for updating your Google Calender using Google Spreadsheet with Google Apps Script.

## Getting Started
You will need to setup Google Spreadsheet like below:

*Note*: `event id` will be automatically created once running the script - initially empty.

| title | year | month | day |start time | end time | description | calendar id | event id |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |  :---: |  :---: |
| my event 1 | 2022 | 4 | 8 | 9:30  | 10:00 | some description | example@gmail.com |  |
| my event 2 | 2022 | 4 | 10  | 13:30  | 14:30 | some description | example@gmail.com |  |

Once setting up your spreadsheet, copy and paste code and run the script. You'll see `event id` filled with something like: `xxxx-xxxx-xxxx@google.com`.

## Custom Menu
You can create custom menu on Google Spreadsheet. This should make running the script much easier rather than visiting Google Apps Script page and running it. You can check `scheduler-with-button.gs`.

## Warning
**_🔥 DO NOT DELETE EVENT ID!_**

Manually deleting `event id` is dangerous as these IDs are way to track existing events - when running the script, IDs are automatically updated. If you are remove then, make sure you are doing this carefully.

## Reference
- [G Suite Pro Tips: how to automatically add a schedule from Google Sheets into Calendar](https://cloud.google.com/blog/products/g-suite/g-suite-pro-tip-how-to-automatically-add-a-schedule-from-google-sheets-into-calendar)
- [Calendar Service | Google Apps Script Reference](https://developers.google.com/apps-script/reference/calendar)
