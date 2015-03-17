/**
 * Serves as the model for NtfEvent data
 *
 * @class
 */
class NtfEvent {

  constructor(fields) {
    let fields = {
      id: this.id,
      status: this.status,
      startDate: this.startDate,
      message: this.message
    } = fields;
  }
}

module.exports = NtfEvent;
