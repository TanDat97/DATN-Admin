
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {authenticationActions} from '../../_actions'

const imgLoading = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.logout();
    this.state = {
      email: '',
      password: '',
      submitted: false,
      isLogging: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changIsLoading = this.changIsLoading.bind(this);
  }
  
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ 
      submitted: true,
      isLogging: true,
    });
    const { email, password } = this.state;
    if (email && password) {
        this.props.login(email, password);
    }
  }

  changIsLoading(){
    this.setState({isLogging: false })
  }
  
  render() {
    var { authentication } = this.props;
    var { email, password, submitted, isLogging } = this.state;
    if(authentication.loggedIn === true){
      this.props.history.push('/');
    }
    else if(authentication.loggedIn === false && isLogging === true){
      alert("Email hoặc password không đúng, vui lòng thử lại");
      this.changIsLoading();
    }
    return (
      <div>
        <div className="login_backgr">
          <nav className="navbar navbar-expand-lg navbar-dark mtren">
            <div className="container">
              <a  className="navbar-brand logo" href="/login">Admin Login</a>
            </div> 
          </nav>
        <div className = "container">
              
          <div className="col-md-6 login_center">
            <h2>Login</h2>
              <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                    {submitted && !email &&
                        <div className="badge badge-danger">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                        <div className="badge badge-danger">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                    {authentication && submitted && isLogging &&
                        <img src={imgLoading} alt=""/>
                    }
                    <Link to="/forgotpassword" className="btn btn-link">Forgot password</Link>
                </div>
              </form> 
            </div>
          </div>
        </div>
        <br></br>
        <div className="text-center">
          <p><a href="/">Admin Page version 1.0</a></p>
          <p>Visit our website at <a href="/">wwww.realstate.com</a></p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    login: (email,password) => dispatch(authenticationActions.login(email, password)),
    logout: () => dispatch(authenticationActions.logout()),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login)
