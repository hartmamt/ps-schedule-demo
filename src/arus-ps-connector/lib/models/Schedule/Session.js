/**
 * Serves as a model for Session data
 *
 * @class
 */
class Session {

  constructor(sessionData) {
    let fields = {
      classNumber: this.classNumber,
      classSection: this.classSection,
      component: this.component,
      daysTimes: this.daysTimes,
      room: this.room,
      instructor: this.instructor,
      startDate: this.startDate,
      endDate: this.endDate
    } = sessionData;
  }
}

module.exports = Session;
