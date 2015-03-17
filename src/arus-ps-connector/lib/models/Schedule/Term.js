/**
 * Serves as model for Term data
 *
 * @class
 */
class Term {

  constructor(termData) {
    let fields = {
      acadCareerDesc: this.acadCareerDesc,
      curGpa: this.curGpa,
      cumGpa: this.cumGpa,
      termName: this.termName,
      institution: this.institution,
      termBeginDate: this.termBeginDate,
      termEndDate: this.termEndDate,
      courses: this.courses
    } = termData;
  }
}

module.exports = Term;
