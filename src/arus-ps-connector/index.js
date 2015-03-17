
var Request = require('./lib/Request.js');
var Serialize = require('./lib/Serializer.js');
var parseString = require('xml2js').parseString;

var RemoteRequests = {

  /**
   * Retrieves Profile information.
   *
   * @method getProfile
   * @static
   * @params {Object} requestParams - an object containing the fields needed to
   * build your remote request
   * @example
   * {
   *   url: 'someUrl',
   *   auth: ['username', 'password'],
   *   acceptType: 'application/json',
   *   send: dataToSend,
   *   headers: objectContainingHeaders
   * }
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  'getProfile': function(requestParams) {

    return new Promise((resolve, reject) => {
      Request.get(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            jRes = parsedRes;
          });

          // Serialize the http response to a profile
          let profile = Serialize.profile(jRes);

          resolve(profile);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves a Profile Picture
   *
   * @method getPicture
   * @static
   * @params {Object} requestParams - an object containing the fields needed to
   * build the remote request
   * @example
   * {
   *   url: 'someUrl',
   *   auth: ['username', 'password'],
   *   acceptType: 'application/json',
   *   send: dataToSend,
   *   headers: objectContainingHeaders
   * }
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  'getPicture': function(requestParams) {

    return new Promise((resolve, reject) => {
      Request.get(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            jRes = parsedRes;
          });

          let picture = Serialize.picture(jRes);

          resolve(picture);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves Schedule info
   *
   * @method getSchedule
   * @static
   * @params {Object} requestParams - an object containing the fields needed to build the remote
   * request
   * @params {Num} payloadMode - specifies the format the payload will come back in; must be 1, 2,
   * or 3 and defaults to 1
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  'getSchedule': function(requestParams, payloadMode = 1) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            jRes = parsedRes;
          });

          let schedule = Serialize.schedule(jRes, payloadMode);

          resolve(schedule);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves Notification info
   *
   * @method getNotifications
   * @static
   * @params {Object} requestParams - an object containing the fields needed to build the remote
   * request
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  'getNotifications': function(requestParams) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            jRes = parsedRes;
          });

          let notifications = Serialize.notifications(jRes);

          resolve(notifications);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  /**
   * Retrieves Notification Event info
   *
   * @method getNotificationEvents
   * @static
   * @params {Object} requestData - an object containing the fields needed to create the remote
   * request
   * @return {Promise} - returns a Promise of the serialized remote request response
   */
  'getNotificationEvents': function(requestParams) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {
          let jRes;
          parseString(res.text, (err, parsedRes) => {
            jRes = parsedRes;
          });

          let events = Serialize.events(jRes);

          resolve(events);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Marks a notification as read
   *
   * @method markAsRead
   * @static
   * @params {Object} requestParams - an object containing the fields needed to create the remote
   * request
   */
  'markAsRead': function(requestParams) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = RemoteRequests;
