import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import { MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

export default class HeaderLinks extends Component {

  handlesignOut = () => {
    Auth.signOut().then(d => {
      window.location.reload()
      //this.props.childProps.onUserLogOut();
    });
  }

  componentDidMount(){
    console.log(this.props.childProps)
  }

  redirectSignIn = () => {
    window.location.href = "/signin";
  }

  redirectModules = () => {
    window.location.href = "/events"
  }

  redirectHome = () => {
    window.location.href = "/"
  }

  render() {
    const username = this.props.childProps.state.username != "" ? (this.props.childProps.state.username) : ("Ingresar");

    return (
      <MDBContainer>
        <MDBNav tabs>
          <MDBNavItem>
            <MDBNavLink to="/">Inicio</MDBNavLink>
          </MDBNavItem>
            {this.props.childProps.state.user_roll === 'priest' && <MDBNavItem><MDBNavLink to="/events">Eventos</MDBNavLink></MDBNavItem>}
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret color="default">{username}</MDBDropdownToggle>
              <MDBDropdownMenu color="default">
                {!this.props.childProps.isLoggedIn && <MDBDropdownItem onClick={this.redirectSignIn}>Login</MDBDropdownItem>}
                {this.props.childProps.isLoggedIn && <MDBDropdownItem onClick={this.handlesignOut}>Logout</MDBDropdownItem>}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNav>
      </MDBContainer>
    );
  }
}