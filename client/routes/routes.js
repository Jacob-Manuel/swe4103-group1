/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, Router } from 'react-router';
import App from '../App/App';
import CreateCourse from './InstructorView/CreateCourse';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import InstructorHome from './InstructorView/InstructorHome';
import StudentHome from './StudentView/StudentHome';
import CourseGrid from './CourseGrid/CourseGrid';
import InstructorCourseList from './InstructorView/InstructorCourseList';
import InstructorCourseOverview from './InstructorView/InstructorCourseOverview';
import StudentCourseOverview from './StudentView/StudentCourseOverview';
import RegisterCourse from './StudentView/RegisterCourse';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  //require('./modules/Post/pages/PostListPage/PostListPage');
  //require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./InstructorView/InstructorHome');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute component = {Login} />
    <Route path="/create_course" component = {CreateCourse} />
    <Route path="/signup" component = {Signup} />
    <Route path="/instructor_home" component={InstructorHome} />
    <Route path="/student_home" component={StudentHome} />
    <Route path="/course_grid" component={CourseGrid} />
    <Route path="/instructor_courses" component={InstructorCourseList} />
    <Route path="/course_overview_inst" component={InstructorCourseOverview} />
    <Route path="/course_overview_stu" component={StudentCourseOverview} />
    <Route path="/register_course" component={RegisterCourse} />
  </Route>
);
