import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

// Import Style
import styles from '../../main.css';

export function SeatingPlan(props) {
  return (
    <div>
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              UNB Attendance Service
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="/instructor_home">Instructor Home</NavItem>
            <NavItem href="/instructor_home">Other thing</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem href="/">Log out</NavItem>
          </Nav>
        </Navbar>
      </div>
      <div className={styles.sidenav}>
        <Link to={'/instructor_courses'}>Courses</Link>
        <a href="#">Nothing</a>
        <a href="#">Nothing</a>
        <a href="#">Nothing</a>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
//HomePage.need = [params => {
  //return fetchPost(params.cuid);
//}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    //post: getPost(state, props.params.cuid),
  };
}

SeatingPlan.propTypes = {
//  post: PropTypes.shape({
//    name: PropTypes.string.isRequired,
//    title: PropTypes.string.isRequired,
//    content: PropTypes.string.isRequired,
//    slug: PropTypes.string.isRequired,
//    cuid: PropTypes.string.isRequired,
//  }).isRequired,
};

export default connect(mapStateToProps)(SeatingPlan);
