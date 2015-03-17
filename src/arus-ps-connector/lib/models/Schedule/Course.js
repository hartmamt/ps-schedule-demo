/**
 * Serves as a model for Course data
 *
 * @class
 */
class Course {

  constructor(courseData) {
    let fields = {
      desc: this.desc,
      status: this.status,
      units: this.units,
      gradeDesc: this.gradeDesc,
      grade: this.grade,
      course: this.course,
      sessions: this.sessions
    } = courseData;
  }
}

module.exports = Course;
