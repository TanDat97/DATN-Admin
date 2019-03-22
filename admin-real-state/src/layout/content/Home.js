import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import Navbar from '../navbar/Navbar';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };

  }
  
  render() {
    return (
      <div>
        <Navbar/>
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
