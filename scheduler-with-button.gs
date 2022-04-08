function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Google App Script').addItem('Run Scheduler', 'scheduler').addToUi();
}

function isCellData(e) {
  return e.join().replace(/,/g, '').length;
}

function formatDate(date) {
  // choose timezone and preferred format
  return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd E HH:mm');
}

function scheduler() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('Update Google Calender', 'Are you sure you want to continue?', ui.ButtonSet.YES_NO);

  if (response === ui.Button.YES) {
    ui.alert('Start updating calender');
  } else {
    return ui.alert('Cancelled');
  }

  let count = 0;

  // make sure target sheet name is set
  const scheduleSheet = SpreadsheetApp.getActive().getSheetByName('schedule');
  const scheduleList = scheduleSheet.getRange(2, 1, scheduleSheet.getLastRow(), 9).getValues().filter(isCellData);

  for (const [index, schedule] of scheduleList.entries()) {
    count = count + 1;

    const title = schedule[0];
    const year = schedule[1];
    const month = schedule[2];
    const day = schedule[3];
    const startTime = schedule[4];
    const endTime = schedule[5];
    const description = schedule[6];
    const calendarId = schedule[7];
    const eventId = schedule[8];
    const calender = CalendarApp.getCalendarById(calendarId);

    if (eventId) {
      const existingEvent = calender.getEventById(eventId);

      existingEvent.deleteEvent();
      scheduleSheet.getRange(2 + index, 9).setValue('');
    }

    // may need to change how to setup date depending on timezone
    // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    const startDateTime = new Date(`${year}-${month}-${day} ${startTime} GMT+9`);
    const endDateTime = new Date(`${year}-${month}-${day} ${endTime} GMT+9`);
    const newEvent = calender.createEvent(title, startDateTime, endDateTime, { description });
    const newEventId = newEvent.getId();

    scheduleSheet.getRange(2 + index, 9).setValue(newEventId);

    const startAt = formatDate(newEvent.getStartTime());
    const endAt = formatDate(newEvent.getEndTime());

    Logger.log(`New event created: ${title} at ${startAt} to ${endAt}, event ID: ${newEventId}`);
  }

  Logger.log(`Created ${count} schedules`);
}
