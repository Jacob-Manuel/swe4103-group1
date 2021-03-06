import Course from '../models/course';
import User from '../models/user';
import SessionUtils from '../util/sessionUtils';

var async_f = require('asyncawait/async');
var await_f = require('asyncawait/await');

function  checkRequestSanity(req, res) {
  return new Promise (function (fulfill, reject){
    // make sure that the session is valid
    SessionUtils.isValidSession(req.cookies.sessionID).then((isValid) => {
      if (isValid !== true) {
          res.status(401).end();
          fulfill(false);
      } else {
        // make sure that this sessionID belongs to an Admin
        //TODO: we need to check that this admin is the owner of the course
        SessionUtils.isAdmin(req.cookies.sessionID).then((isAdmin) => {
          if (isAdmin !== true) {
              res.status(401).send("This API endpoint requires Admin capability").end();
              fulfill(false);
          } else {
            // make sure that the request contains a course title
            if(!req.params.courseTitle) {
              res.status(403).send("Invalid course title").end();
              fulfill(false);
            }
            // make sure the courseTitle is valid
            // TODO Important :: we need to make sure that the course title is alphanumeric and doesn't contain special characters

            // make sure that the request format is correct
            if(!req.body.students) {
              res.status(403).send("Invalid request").end();
              fulfill(false);
            }

            // make sure that the request size > 0
            if (!Array.isArray(req.body.students) || req.body.students.length <= 0) {
              res.status(403).send("Invalid request (Array of students is expected)").end();
              fulfill(false);
            }

            fulfill(true);
          }
        })
      }
    })
  })
}

/**
* This function add a list of students to a specific Course
* It requires admin access
* @author Gehad
* @param HTTP req
* @param HTTP res
* @returns void
*/
export function addStudents(req, res) {
  checkRequestSanity(req, res).then((accept) => {
    if (accept) {
      const numberOfStudents = req.body.students.length;
      var DBSuccesses = 0;
      var DBfails = 0;
      function checkAndSend () {
        if (DBSuccesses + DBfails === numberOfStudents) {
          res.status(200).send({
            Inserted: DBSuccesses,
            Failed: DBfails
          }).end();
        }
      }

      // add students to the database
      Course.
      findOne({ 'title': req.params.courseTitle}, 'title', (err, course) => {
        if (course === null) {
          res.status(403).send("Invalid request (Course not found)").end();
        } else {
          req.body.students.map((student)=>{
            return student.email
          }).filter((student_email) => {
            // TODO: We need to check if this user exists in the User collection before registering them to the course (Integrity)
            // TODO: We need to check if this user is added to this course before??
            // Will just return true for all now; need to be fixed
            return true;
          }).forEach(function(student_email) {
            if (typeof student_email == 'undefined') {
              DBfails = DBfails + 1;
              checkAndSend();
            } else {
              Course.updateOne(
              { _id: course._id },
              { $push: { usernames: student_email } },
              (err, raw) => {
                if (err !== null) {
                  console.log(err);
                  DBfails = DBfails + 1;
                } else {
                  DBSuccesses = DBSuccesses + 1;
                }
                checkAndSend();
              });
            }
          });
        }
      });
    }
  })
}

/**
* This function remove a list of students from a specific Course
* It requires admin access
* @author Gehad
* @param HTTP req
* @param HTTP res
* @returns void
*/
export function dropStudents(req, res) {
  checkRequestSanity(req, res).then((accept) => {
    if (accept) {
      const numberOfStudents = req.body.students.length;
      var DBSuccesses = 0;
      var DBfails = 0;
      function checkAndSend () {
        if (DBSuccesses + DBfails === numberOfStudents) {
          res.status(200).send({
            Deleted: DBSuccesses,
            Failed: DBfails
          }).end();
        }
      }

      // add students to the database
      Course.
      findOne({ 'title': req.params.courseTitle}, 'title', (err, course) => {
        if (course === null) {
          res.status(403).send("Invalid request (Course not found)").end();
        } else {
          req.body.students.map((student)=>{
            return student.email
          }).filter((student_email) => {
            // TODO: We need to check if these users exist before registering them to the course
            return true;
          }).forEach(function(student_email) {
            if (typeof student_email == 'undefined') {
              DBfails = DBfails + 1;
              checkAndSend();
            } else {
              Course.updateOne(
              { _id: course._id },
              // TODO: optimization :: we can remove a list in one query; we will need to filter the list beforehand
              { $pull: { usernames: { $in: [student_email] } } },
              (err, raw) => {
                if (err !== null || raw.nModified === 0) {
                  DBfails = DBfails + 1;
                } else {
                  DBSuccesses = DBSuccesses + 1;
                }
                checkAndSend();
              });
            }
          });
        }
      });
    }
  })
}


export function courseList(req,res) {
  var list = [];
  var results;

  Course.find(
    {},
    'title',
    async_f(function (err, course) { // async

      await_f( function(){ // await
        if (err){
          console.error(err);
          res.status(400).end();

        } else if (course) {
          course.forEach( function(c){
            if (c.title) {
              list.push(c.title);

            } else {
              res.status(400).end();
            }
          })

          res.status(200).send({
            courseList: list
          })

        } else {
          res.status(400).end();
        }
      }) // end await
    }) // end async
  )
}


/**
 *
 * @param req
 * @param res
 * @returns void
 */
export function createCourse(req, res) {
  var re = new RegExp('[^A-Za-z0-9-_.]');
  //regex pattern with match if the string contains characters other than ( A-Z, a-z, 0-9, -, _, .)

  if (!req.body.title || !req.body.professor || !req.body.institution) {
    //verify that title, professor, and institution were provided
    res.status(403).send("Title, professor, and institution are required");

  } else if (re.test(req.body.title)) {
    res.status(403).send("Course title can only contain: letters, numbers, '-', '_', and '.'");

  } else {
    var course_data = {
      'title': req.body.title,
      'professor': req.body.professor,
      'usernames': [], // make usernames array empty for now until users are added
      'institution': req.body.institution,
      'location': req.body.location
    };
    var course = new Course(course_data);
    course.save(
      function(err, data){
        if (err){
          console.error(err)
          res.status(403).send("Title already belongs to an existing course")
        } else {
          res.status(200).end()
        }
      }
    )
  }
}

/**
 *
 * @param req
 * @param res
 * @returns void
 */
export function removeCourse(req, res) {

  if (!req.body.title) {
    //verify that title was provided
    res.status(403).send("Title is required!");

  } else {
    Course.findOneAndRemove(
      { 'title': req.body.title },
      function(err, course) {
      if (err) {
        console.error(err)
        res.status(400).end();

      } else if (course) {
        res.status(200).end()

      } else {
        res.status(403).send("Course matching \"" + req.body.title + "\" not found.");
        // unsuccessful removal
      }
    });
  }
}
