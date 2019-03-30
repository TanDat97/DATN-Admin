import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Table, Tag, message } from 'antd';
import { connect } from 'react-redux';

import { accountActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class Account extends Component {
  constructor(props) {
    super(props);
    this.props.getAll(this.props.match.params.page);
    this.state = {
        page: this.props.match.params.page,
        isLoading: true,
    };  
    this.changeIsLoading = this.changeIsLoading.bind(this);
  }  
  
  changeIsLoading(temp)  {
    this.setState({isLoading: temp})
  }

  render() {
    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            key: 'username',
            render: text => <a href="">{text}</a>,
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
    var dataSource = [];
    var isLoading = true;
    const account = isEmpty(this.props.account) ? {} : this.props.account;
    dataSource = isEmpty(account.result) || this.props.account.type === "ACCOUNT_GETONE_SUCCESS" ? [] : account.result.accounts;
    if(dataSource.length>0){
        isLoading = false;
    } else if(!isEmpty(account.type) && account.type === "ACCOUNT_GETALL_FAILURE" && account.error.data.status===401){
        message.error("Phiên đã hết hạn, vui lòng đăng nhập lại",3)
        this.props.history.push('/login')
    }
    
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
                        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 30 }} rowKey="email" loading={isLoading}
                            onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    this.props.history.push('/account/'+this.state.page+'/'+record._id)
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
    getAll: (page) => dispatch(accountActions.getAll(page)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Account)
