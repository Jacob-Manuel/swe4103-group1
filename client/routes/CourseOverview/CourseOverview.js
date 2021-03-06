import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import CourseGrid from './CourseGrid';
// Import Style
import styles from '../../main.css';


export function CourseOverview(props) {

  return (
<div>

    <div className={styles.welcomeContainer}>
      <h2 className={styles.instructorName}>Welcome, {username}</h2>
      <Link to={"/instructor_home"}><h4>Home</h4></Link>
    </div>

    <div className={styles.courseGrid}>

      <CourseGrid/>

      <table id="students" align="right">
        <tr><td>Students</td></tr>
        <tr><td>Tony</td></tr>
        <tr><td>Shiv</td></tr>
        <tr><td>Tristen</td></tr>
        <tr><td>Jean-Marc</td></tr>
        <tr><td>Justin</td></tr>
        <tr><td>Jacob</td></tr>
      </table>
    </div>
  </div>
  );
}

// Retrieve data from store as props
function mapStateToProps(state, props) {

}

CourseOverview.propTypes = {
//  post: PropTypes.shape({
//    name: PropTypes.string.isRequired,
//    title: PropTypes.string.isRequired,
//    content: PropTypes.string.isRequired,
//    slug: PropTypes.string.isRequired,
//    cuid: PropTypes.string.isRequired,
//  }).isRequired,
};

export default connect(mapStateToProps)(CourseOverview);
