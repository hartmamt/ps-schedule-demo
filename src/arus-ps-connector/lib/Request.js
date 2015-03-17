var superagent = require('superagent');

/**
 * Provides methods to make REST calls. It currently uses the the superagent
 * request library but can be configured to use other libraries.
 *
 * @class
 */
class Request {

  /**
   * Creates an http `GET` request.
   *
   * @method get
   * @static
   * @params {Object} params - the parameters that are used to construct the remote request
   * @throws Throws an error if the endpoint url isn't passed in
   * @return {Promise} - returns a Promise of a remote request response
   */
  static get(params) {
    return new Promise((resolve, reject) => {
      if (!params.url) {
        throw 'Error: Endpoint Url not available';
      }

      let request = superagent.get(params.url);
      if (params.auth) {
        request.auth(...params.auth);
      }
      if (params.acceptType) {
        request.accept(params.acceptType);
      }
      if (params.headers) {
        for (header in params.headers) {
          request.set(header, params.headers[header]);
        }
      }
      request.end((err, res) => {
        if(res.ok) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * Creates an http `POST` request.
   *
   * @method post
   * @static
   * @params {Object} params - the parameters that are used to construct the remote request
   * @throws Throws an error if the endpoint url isn't passed in
   * @return {Promise} - returns a Promise of a remote request response
   */
  static post(params) {
    return new Promise((resolve, reject) => {
      if (!params.url) {
        throw 'Error: Endpoint Url not available';
      }

      let request = superagent.post(params.url);
      if (params.auth) {
        request.auth(...params.auth);
      }
      if (params.acceptType) {
        request.accept(params.acceptType);
      }
      if (params.headers) {
        for (let header in params.headers) {
          request.set(header, params.headers[header]);
        }
      }
      if (params.send) {
        request.send(params.send);
      }
      request.end((err, res) => {
        if(res.ok) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   *
   * Creates an http `UPDATE` request. **Note:** Not implemented yet.
   *
   * @method update
   * @static
   * @params {Object} params - the parameters that are used to construct the remote request
   * @return {Promise} - returns a Promise of a remote request response
   */
  static update(params) {
    return new Promise((resolve, reject) => {
      reject('method `update` not defined yet');
    });
  }

  /**
   * Creates an http `DELETE` request. **Note:** Not implemented yet.
   *
   * @method delete
   * @static
   * @params {Object} params - the parameters that are used to construct the remote request
   * @return {Promise} - returns a Promise of a remote request response
   */
  static delete(params) {
    return new Promise((resolve, reject) => {
      reject('method `delete` not defined yet');
    });
  }
}

module.exports = Request;
