
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };


  }
  
  
  render() {
    return (
      <div>
        <div className="login_backgr">
          <nav className="navbar navbar-expand-lg navbar-dark mtren">
            <div className="container">
              <a  className="navbar-brand logo" href="/login">Admin Home page</a>
            </div> 
          </nav>
          <a href='/login' className="btn btn-danger">Logout</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    user: state.user,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    logout: () => dispatch(userActions.logout()),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login)
