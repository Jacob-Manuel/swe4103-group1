import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as utils from '../Utils/utils.js';

// Import Style
import styles from '../../main.css';

class InstructorDataCell extends Component{

  constructor(props){
    super(props);

    this.state = {name: props.name};
  }

  componentDidMount(){

  }

  clicked(){
    debugger;
    var y = document.getElementsByClassName(styles.courseGridCellClicked);
    if(typeof document.getElementsByClassName(styles.courseGridCellClicked) != "undefined"){
      //for(var i = 0; i < y.length; i++){
        //y[i].classList.remove(styles.courseGridCellClicked);
      //}
    }

  	if(!document.getElementById(this.props.id).className.includes(styles.courseGridCellClicked)){
      if(this.props.name != ""){
  		    document.getElementById(this.props.id).classList.add(styles.courseGridCellClicked);
      }
  	}
  }

  render(){
    return(
      <td className={styles.courseGridCell} id={this.props.id} onClick = {this.clicked.bind(this)}> {this.state.name} </td>
    )
  }

}

export default InstructorDataCell;
