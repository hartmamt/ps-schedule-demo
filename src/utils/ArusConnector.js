var { getItem, setItem } = require('../components/mixins/cache.js');

/* eslint-disable */
class ArusConnector {
/* eslint-enable */

  constructor(defaultConnector) {
    this.connector = defaultConnector;
  }

  /**
   * Retrieves profile data.
   *
   * @method getProfile
   * @param {boolean} useCached - specifies whether or not to use the cached response of a previous
   * call of this method if available. Defaults to `true`.
   * @param {function} model - a function that will handle the mapping of the response to an object.
   * The function must have a `create` function and a constructor defined. If not passed, the
   * default model will be used.
   * @param {object} connector - an object that will handle making the remote request. `getProfile`
   * must be defined in the connector. Defaults to `this.connector`.
   * @returns {Promise} returns a promise of the result of `connector.getProfile`.
   */
  getProfile(useCached = true, model, connector = this.connector) {

    var profileCached = getItem('profile');

    if (profileCached && useCached) {
      return new Promise((resolve) => {
        resolve(profileCached);
      });
    } else {
      let profileParams = {
        url: __PROFILE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        acceptType: 'application/xml'
      };

      return new Promise((resolve, reject) => {
        let params = [profileParams];
        if (model) {
          params.push(model);
        }

        connector.getProfile(...params)
          .then(res => {
            setItem('profile', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    }
  }

  /**
   * Retrieves picture data.
   *
   * @method getPicture
   * @param {boolean} useCached - specifies whether or not to use the cached response of a previous
   * call of this method if available. Defaults to `true`.
   * @param {function} model - a function that will handle the mapping of the response to an object.
   * The function must have a `create` function and a constructor defined. If not passed, the
   * default model will be used.
   * @param {object} connector - an object that will handle making the remote request. `getPicture`
   * must be defined in the connector. Defaults to `this.connector`.
   * @returns {Promise} returns a promise of the result of `connector.getPicture`.
   */
  getPicture(useCached = true, model, connector = this.connector) {

    var pictureCached = getItem('picture');

    if (pictureCached && useCached) {
      return new Promise((resolve) => {
        resolve(pictureCached);
      });

    } else {

      let pictureParams = {
        url: __PICTURE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        acceptType: 'application/xml'
      };

      return new Promise((resolve, reject) => {
        let params = [pictureParams];
        if (model) {
          params.push(model);
        }

        connector.getPicture(...params)
          .then(res => {
            setItem('picture', res);
            resolve(res);
          }).catch(err => {
            console.log(err);
            reject(err);
          });
      });

    }
  }

  /**
   * Retrieves schedule data.
   *
   * @method getSchedule
   * @param {int} mode - specifies what format the response comes back in. Can be 1, 2, or 3.
   * Defaults to 1.
   * @param {boolean} useCached - specifies whether or not to use the cached response of a previous
   * call of this method if available. Defaults to `true`.
   * @param {function} model - a function that will handle the mapping of the response to an object.
   * The function must have a `create` function and a constructor defined. If not passed, the
   * default model will be used.
   * @param {object} connector - an object that will handle making the remote request. `getSchedule`
   * must be defined in the connector. Defaults to `this.connector`.
   * @returns {Promise} returns a promise of the result of `connector.getSchedule`.
   */
  getSchedule(mode = 1, useCached = true, model, connector = this.connector) {

    let scheduleCached = getItem('schedule');

    if (scheduleCached && useCached) {
      return new Promise(resolve => {
        resolve(scheduleCached);
      });

    } else {
      return new Promise((resolve, reject) => {
        let scheduleParams = {
          url: __SCHEDULE_URL__,
          auth: [__USERNAME__, __PASSWORD__],
          send: `<SSR_GET_ENROLLMENT_REQ><SCC_ENTITY_INST_ID></SCC_ENTITY_INST_ID><EMPLID></EMPLID><ACAD_CAREER>UGRD</ACAD_CAREER><INSTITUTION>UCINN</INSTITUTION><STRM></STRM><SSR_ENRL_GET_MODE>${mode}</SSR_ENRL_GET_MODE></SSR_GET_ENROLLMENT_REQ>`,
          acceptType: 'application/xml'
        };

        let params = [scheduleParams, mode];
        if (model) {
          params.push(model);
        }

        connector.getSchedule(...params)
          .then(res => {
            setItem('schedule', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    }
  }

  /**
   * Retrieves notifications
   *
   * @method getNotifications
   * @param {function} model - a function that will handle the mapping of the response to an object.
   * The function must have a `create` function and a constructor defined. If not passed, the
   * default model will be used.
   * @param {object} connector - an object that will handle making the remote request.
   * `getNotifications` must be defined in the connector. Defaults to `this.connector`.
   * @returns {Promise} returns a promise of the result of `connector.getNotifications`.
   */
  getNotifications(model, connector = this.connector) {

    let notificationParams = {
      url: __NOTIFICATIONS_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      send: '<SCC_GET_NOTIF_REQ><EMPLID></EMPLID></SCC_GET_NOTIF_REQ>',
      acceptType: 'application/xml'
    };

    return new Promise((resolve, reject) => {
      let params = [notificationParams];
      if (model) {
        params.push(model);
      }

      connector.getNotifications(...params)
        .then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        });
    });
  }

  /**
   * Retrieves event notifications.
   *
   * @method getEvents
   * @param {int} numDaysPast - specifies how recent the events will be.
   * @param {function} model - a function that will handle the mapping of the response to an object.
   * The function must have a `create` function and a constructor defined. If not passed, the
   * default model will be used.
   * @param {object} connector - an object that will handle making the remote request.
   * `getNotificationEvents` must be defined in the connector. Defaults to `this.connector`.
   * @returns {Promise} returns a promise of the result of `connector.getNotifications`.
   */
  getEvents(numDaysPast = 10000, model, connector = this.connector) {
    let eventsParams = {
      url: __EVENTS_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      send: `<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>${numDaysPast}</NUM_PAST_DAYS><INCLUDE_EVENTS>Y</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>`,
      acceptType: 'application/xml'
    };

    return new Promise((resolve, reject) => {
      let params = [eventsParams];
      if (model) {
        params.push(model);
      }

      connector.getNotificationEvents(...params)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Changes the `status` of an event notification.
   *
   * @method changeReadStatus
   * @param {int} id - the id of the event. Required.
   * @param {string} status - the new status of the event. Defaults to `'R'`.
   * @param {int} numDaysPast - specifies how recent the events will be.
   * @param {object} connector - an object that will handle making the remote request.
   * `changeReadStatus` must be defined in the connector. Defaults to `this.connector`.
   * @returns {Promise} returns a promise of the result of `connector.changeReadStatus`.
   */
  changeReadStatus(id, status = 'R', numDaysPast = 7, connector = this.connector) {
    let markReadParams = {
      url: __MARK_AS_READ_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      send: `<SCC_NTF_UPDATE_EVENTS_REQ><NUM_PAST_DAYS>${numDaysPast}</NUM_PAST_DAYS><EVENTS><SCC_NTF_EVENT><SCC_NTFEVT_REQ_ID>${id}</SCC_NTFEVT_REQ_ID><SCC_NTFEVT_STATUS>${status}</SCC_NTFEVT_STATUS></SCC_NTF_EVENT></EVENTS></SCC_NTF_UPDATE_EVENTS_REQ>`,
      acceptType: 'application/xml'
    };

    return new Promise((resolve, reject) => {
      connector.changeReadStatus(markReadParams)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = ArusConnector;
