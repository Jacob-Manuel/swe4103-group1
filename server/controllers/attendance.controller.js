import Course from '../models/course';
import User from '../models/user';
import SessionUtils from '../util/sessionUtils';

//This function should save the students to the database!!
//We don't know how we would like to save them
//function saveStudents(submissionTime, req.body.absentstudents, callback) {
//  callback(false);
//}

/**
 * @param {XMLHTTPRequest} req A request containing the username of a student.
 * @param {XMLHTTPRequest} res Server reponse. If succesful, returns array of courses.
 * @returns null
 */
export function submitAttendance(req, res) {
  // make sure that the request contains a course title
  if (!req.params.courseTitle) {
    res.status(403).send("Invalid course title").end();
  } else {
    SessionUtils.isValidSession(req.cookies.sessionID).then((isValid) => {
      if (isValid !== true) {
        res.status(401).end();
      } else {
        // make sure that this sessionID belongs to an Admin
        //TODO: we need to check that this admin is the owner of the course
        SessionUtils.isAdmin(req.cookies.sessionID).then((isAdmin) => {
          if (isAdmin !== true) {
            res.status(403).end();
          } else {
            if (!req.body.submissionTime || !req.body.absentstudents) {
              res.status(403).send("Invalid request").end();
            } else {
              if (!Array.isArray(req.body.absentstudents) || req.body.absentstudents.length <= 0) {
                res.status(403).send("Invalid request (Array of students is expected)").end();
              } else if (typeof req.body.submissionTime !== 'number') {
                res.status(403).send("Invalid request (expecting submissionTime of type number (Unix timestamp))").end();
              } else {
                //ACTUAL CODE EXISTS HERE
                let absentstudents = req.body.absentstudents
                saveStudents(req.body.submissionTime, absentstudents, (err)=>{
                  if (err) {
                    res.status(500).end();
                  } else {
                    res.status(200).end();
                  }
                })
              }
            }
          }
        })
      }
    })
  }
}

/**
 * @param {XMLHTTPRequest} req A request containing the username of a student.
 * @param {XMLHTTPRequest} res Server reponse. If succesful, returns array of courses.
 * @returns null
 */
export function getAttendance (req, res){
    SessionUtils.isValidSession(req.cookies.sessionID).then((isValid) => {
        if (isValid !== true) {
            res.status(401).end();
           fulfill(false);
        } else {
        SessionUtils.isAdmin(req.cookies.sessionID).then((isAdmin) => {
        if (isAdmin !== true) {
            res.status(403).send("This API endpoint requires Admin capability").end();
            fulfill(false);
        } else {
            Course.findOne({ 'title' : req.params.courseTitle }, 'usernames', function(err, course){ 
                console.log('flag1');
                if(err){
                    console.log('flag2');
                    console.error(err)
                    res.status(400).end();
                } else if (course) {
                    var attendance = course.usernames
                    for (var i = 0, len = course.usernames.length; i < len; i++){
                        if(course.usernames[i].length = 2){
                            course.usernames[i][1] = course.usernames[i][1].length
                        }
                    }
                    
                    res.status(200).send(
                        getAttendance: attendance
                    )
                } else {
                    res.status(400).send("Course matching \"" + req.params.courseTitle + "\" not found.");
                }
            });
        }
        });
        }
    });
}
/**
 * @param {XMLHTTPRequest} req A request containing the username of a student.
 * @param {XMLHTTPRequest} res Server reponse. If succesful, returns array of courses.
 * @returns null
 */
export function reserveSeat(req, res) {

}
