import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import {Grid, Row, Col, Image, Jumbotron, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FaBeer from 'react-icons/lib/fa/edit';
import Background from "../../images/png/books.png";
import CloseButton from "../../images/png/close2.png";
// Import Style
import styles from '../../main.css';

class CourseIcon extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  removeCourse(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {

        alert(this.props.name + " was removed!");

      }
    }.bind(this)

    req.open("DELETE", "api/course");
    req.setRequestHeader("Content-type", "application/json");
    var params = '{"title":"' + this.props.name + '"}';

    req.send(params);
  }


  render(){
    var backgroundStyle = {
      backgroundImage: "url(" + Background + ")"
    };
    return(
      <div>
      <div className={styles.courseIcon}>
          <button onClick={this.removeCourse.bind(this)} className={styles.removeCourse}>&#10006;</button>
          <Link to={'/course_overview_inst/?name=' + this.props.name}>
          <div className={styles.courseIconBackground}></div>
          <div className={styles.courseNameWrapper}><label className={styles.courseTitle}>{this.props.name}</label></div></Link>
      </div>
      </div>
    )
  }

}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export default CourseIcon;
