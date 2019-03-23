import React, { Component } from 'react';
// import {NavLink} from 'react-router-dom';
import { Table, Tag } from 'antd';
import { connect } from 'react-redux';

import { authenticationActions, accountActions } from '../../_actions';
import Header from '../navbar/Header';
import NavbarAccount from '../navbar/NavbarAccount';

const columns = [
    {
        title: 'Tài khoản',
        dataIndex: 'username',
        key: 'username',
        render: text => <a href="#">{text}</a>,
        sorter: (a, b) => a.username > b.username,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Họ tên',
        dataIndex: 'fullname',
        key: 'fullname',
        sorter: (a, b) => a.fullname > b.fullname,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Số tin',
        dataIndex: 'totalProject',
        key: 'totalProject',
        render: tag => <Tag color={'green'} key={tag}>{tag}</Tag>
    },
    {
        title: 'Loại tài khoản',
        dataIndex: 'statusAccount',
        key: 'statusAccount',
        render: statusAccount => {
            let  color = statusAccount === 1 ? 'red' : 'geekblue'
            return <Tag color={color} key={statusAccount}>{statusAccount === 1 ? 'Môi giới' : 'Bình thường'}</Tag>
        }
    },
]

class Account extends Component {
  constructor(props) {
    super(props);
    this.props.getAll();
    this.state = {
        
    };  
  }  

  render() {
    const {account} = this.props;
    var loading  = true;
    var dataSource = [];
    dataSource = account.result === undefined ? [] : account.result.accounts;
    if(dataSource.length>0){
        loading= false
    }
    
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
                                    <a href="/">Dashboard</a>
                                </li>
                                <li className="breadcrumb-item active">Account</li>
                            </ol>
                        </div>
                    </div>                            
                
                    <div className="card mb-3">
                        <div className="card-header">
                            <i className="fas fa-table"></i>
                            Data Table Account
                        </div>
                        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 30 }} rowKey="email" loading={loading}
                            onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    this.props.history.push('/accountdetail/'+record._id)
                                },
                            }}}      
                        />
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
