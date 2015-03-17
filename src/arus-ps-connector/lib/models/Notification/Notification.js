/**
 * Serializes Notification data
 *
 * @class
 */
class Notification {

  constructor(notificationData) {
    let fields = {
      id: this.id,
      tag: this.tag,
      type: this.type,
      importance: this.importance,
      dateTime: this.dateTime,
      subject: this.subject,
      message: this.message
    } = notificationData;
  }
}

module.exports = Notification;
