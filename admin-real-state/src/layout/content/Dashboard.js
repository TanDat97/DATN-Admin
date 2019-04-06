import React, { Component } from 'react';
// import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import { authenticationActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };

  }  
  render() {
    return (
    <div>
        <Header user={this.props.authentication.user}/>
        <div id="wrapper">
            <Navbar/>  
            <div id="content-wrapper">   
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1">
                            <button className="btn btn-link btn-sm order-1 order-sm-0" id="sidebarToggle" href="#">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>   
                        <div className="col-9">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="/">Dashboard</a>
                                </li>
                                <li className="breadcrumb-item active">Overview</li>
                            </ol>
                        </div>
                    </div>            
                
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                    <div className="card-body-icon">
                                        <i className="fas fa-fw fa-comments"></i>
                                    </div>
                                    <div className="mr-5">26 Account active!</div>
                                </div>
                                <a className="card-footer text-white clearfix small z-1" href="/">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-warning o-hidden h-100">
                                <div className="card-body">
                                    <div className="card-body-icon">
                                        <i className="fas fa-fw fa-list"></i>
                                    </div>
                                    <div className="mr-5">11 Project!</div>
                                </div>
                                <a className="card-footer text-white clearfix small z-1" href="/">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                    <i className="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                <i className="fas fa-fw fa-shopping-cart"></i>
                                </div>
                                <div className="mr-5">123 News Online!</div>
                            </div>
                            <a className="card-footer text-white clearfix small z-1" href="/">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                <i className="fas fa-angle-right"></i>
                                </span>
                            </a>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-danger o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                <i className="fas fa-fw fa-life-ring"></i>
                                </div>
                                <div className="mr-5">13 New Tickets!</div>
                            </div>
                            <a className="card-footer text-white clearfix small z-1" href="/">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                <i className="fas fa-angle-right"></i>
                                </span>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- /.content-wrapper --> */}
        </div>
        {/* <!-- /#wrapper --> */}
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    logout: () => dispatch(authenticationActions.logout()),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)
