import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
// import { Table, Tag } from 'antd';
import { connect } from 'react-redux';

import { authenticationActions, accountActions } from '../../_actions';
import Header from '../navbar/Header';
import NavbarAccount from '../navbar/NavbarAccount';

class Account extends Component {
  constructor(props) {
    super(props);
    this.props.getAll();
    this.state = {

    };  
  }  

  render() {
    // const {account} = this.props;

    return (
    <div>
        <Header user={this.props.authentication.user}/>
        <div id="wrapper">
            <NavbarAccount/>  
            <div id="content-wrapper">   
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1">
                            <button className="btn btn-link btn-sm order-1 order-sm-0" id="sidebarToggle" href="#">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>   
                        <div className="col-11">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <NavLink to="/">Dashboard</NavLink>
                                </li>
                                <li className="breadcrumb-item">
                                    <NavLink to="/account">Account</NavLink>
                                </li>
                                <li className="breadcrumb-item active">Account</li>
                            </ol>
                        </div>
                    </div>                            
                
                    <div className="card mb-3">
                        <div className="card-header">
                            <i className="fas fa-table"></i>
                            Data Account 
                        </div>
                
                    </div>
                    {/* card mb-3 */}
                </div>             
            </div>
            {/* <!-- /.content-wrapper --> */}
        </div>
        {/* <!-- /#wrapper --> */}
    </div>
    )}
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    account: state.account,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    logout: () => dispatch(authenticationActions.logout()),
    getAll: () => dispatch(accountActions.getAll()),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Account)