module.exports = {
  Profile: require('./Profile.js'),
  Picture: require('./Picture.js'),
  ScheduleModels: {
    Schedule: require('./Schedule/Schedule.js'),
    Term: require('./Schedule/Term.js'),
    Course: require('./Schedule/Course.js'),
    Session: require('./Schedule/Session.js')
  },
  NotificationModels: {
    Notification: require('./Notification/Notification.js'),
    NtfEvent: require('./Notification/NtfEvent.js')
  }
}
