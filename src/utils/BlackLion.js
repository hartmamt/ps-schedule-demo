var Reflux = require('reflux');
var Connector = require('./ArusConnector.js');

let connector;

//SET BACKEND SIS CONNECTOR
function SetSISConnector(defaultConnector){
  connector = new Connector(defaultConnector);
}

var ProfileActions = Reflux.createActions([
  'load'
]);

var ProfileStore = Reflux.createStore({
  listenables: [ProfileActions],

  init() {
    this.listenTo(ProfileActions.load, this.fetchData);
  },

  fetchData(useCached, model, otherConnector) {
    connector.getProfile(useCached, model, otherConnector)
      .then(res => {
        this.trigger(res);
      }).catch(err => {
        console.log(err.stack);
      });
  }

});

var PictureActions = Reflux.createActions([
  'load'
]);

var PictureStore = Reflux.createStore({
  listenables: [PictureActions],

  init() {
    this.listenTo(PictureActions.load, this.fetchData);
  },

  fetchData(useCached, model, otherConnector) {
    connector.getPicture(useCached, model, otherConnector)
      .then(res => {
        this.trigger(res);
      }).catch(err => {
        console.log(err.stack);
      });
  }

});

var ScheduleActions = Reflux.createActions([
  'load'
]);

var ScheduleStore = Reflux.createStore({
  listenables: [ScheduleActions],

  init() {
    this.listenTo(ScheduleActions.load, this.fetchData);
  },

  fetchData(mode, useCached, model, otherConnector) {
    connector.getSchedule(mode, useCached, model, otherConnector)
      .then(res => {
        this.trigger(res);
      }).catch(err => {
        console.log(err.stack);
      });
  }
});

var NotificationActions = Reflux.createActions([
  'load'
]);

var NotificationStore = Reflux.createStore({
  listenables: [NotificationActions],

  init() {
    this.listenTo(NotificationActions.load, this.fetchData);
  },

  fetchData(model, otherConnector) {
    connector.getNotifications(model, otherConnector)
      .then(res => {
        this.trigger(res);
      }).catch(err => {
        console.log(err.stack);
      });
  }
});

var EventActions = Reflux.createActions([
  'load',
  'changeReadStatus'
]);

var EventStore = Reflux.createStore({
  listenables: [EventActions],

  init() {
    this.listenTo(EventActions.load, this.fetchData);
    this.listenTo(EventActions.changeReadStatus, this.updateData);
  },

  fetchData(model, numDaysPast, otherConnector) {
    connector.getEvents(model, numDaysPast, otherConnector)
      .then(res => {
        this.trigger(res);
      }).catch(err => {
        console.log(err.stack);
      });
  },

  updateData(id, status, numDaysPast, model, otherConnector) {
    connector.changeReadStatus(id, status, numDaysPast, otherConnector)
      .then(() => {
        this.fetchData(model, otherConnector);
      }).catch(err => {
        console.log(err.stack);
      });
  }
});

module.exports = {
  EventStore,
  EventActions,
  NotificationStore,
  NotificationActions,
  ProfileStore,
  ProfileActions,
  PictureStore,
  PictureActions,
  ScheduleStore,
  ScheduleActions,
  SetSISConnector
};
