/**
 * Serves as the model for Picture data
 *
 * @class
 */
class Picture {

  /**
   * Picture constructor
   *
   * @param {Object} pictureData
   */
  constructor(pictureData) {
    let fields = {
      base64: this.base64
    } = pictureData;
  }
}

module.exports = Picture;
