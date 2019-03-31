import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal } from 'antd';

import { userService } from '../../_services';
import { accountActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class AccountDetail extends Component {
    constructor(props) {
        super(props);        
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            page: this.props.match.params.page,
            isEdit: false, 
            visible: false,
        };  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }  

    handleChange(e) {
        this.setState({isEdit: true})
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.isEdit) {
            const account = {
                username: this.getValueByID("username"),
                fullname: this.getValueByID("fullname"),
                address: this.getValueByID("address"),
                email: this.getValueByID("email"),
                phone: this.getValueByID("phone"),
                totalProject: this.getValueByID("totalProject"),
                statusAccount: this.getValueByID("statusAccount"),
                description: this.getValueByID("description"),
            }
            message.loading('Update account in process', 1)
            .then(()=>{
                userService.update(this.state.id, account)
                .then(res => {
                    if(res.status === 200){
                        this.setState({isEdit: false})
                        message.success('Update Done')
                        this.props.getOne(this.props.match.params.id);
                    }
                })
                .catch(err => {
                    this.setState({isEdit: false})
                    message.error('Update Error, please try again')
                })
            })   
        }    
    }

    deleteAccount(){
        message.loading('Delete account in process', 1)
            .then(()=>{
                userService.delete(this.state.id)
                .then(res => {
                    if(res.status === 200){
                        message.success('Delete Done')
                        this.props.history.push('/account')
                    }
                })
                .catch(err => {
                    message.error('Delete Error, please try again')
                })
            })   
    }
    
    showModal = () => {
        this.setState({
          visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
          visible: false,
        });
        this.deleteAccount()
      }
    
    handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }

    getValueByID (id) { 
        return document.getElementById(id).value
    }

    render() {
    var accountProps = isEmpty(this.props.account) || this.props.account.type === "ACCOUNT_GETALL_SUCCESS" ? {type: "ACCOUNT"} : this.props.account
    var account = isEmpty(accountProps.result) ? {} : accountProps.result.account
    if(!isEmpty(accountProps.type) && accountProps.type === "ACCOUNT_GETONE_FAILURE"){
        if(isEmpty(account.error)){
            message.error("Lỗi không xác định, vui lòng thử lại", 3)
        } else if(!isEmpty(account.error) && account.error.data.status===401){
            message.error("Phiên đã hết hạn, vui lòng đăng nhập lại", 3)
            this.props.history.push('/login')
        }
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
                                <li className="breadcrumb-item">
                                    <a href={`/account/${this.state.page}`}>Account</a>
                                </li>
                                <li className="breadcrumb-item active">{isEmpty(account)?'':account._id}</li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Account Detail</i> 
                        </div>
                        {!isEmpty(account)?
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-4 col-sm-4">
                                    <div className="card">
                                        <img className="circular_square" src="http://vnhow.vn/img/uploads/contents/desc/2013/04/cach-chon-va-nuoi-meo.jpg" alt="Cardimagecap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{account.fullname}</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                            
                                </div>
                                <div className="col-xl-8 col-sm-8">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="username">Tài khoản</label>
                                                    <input type="text" className="form-control" id="username" defaultValue={account.username} onChange={this.handleChange} placeholder="Username"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fullname">Họ tên</label>
                                                    <input type="text" className="form-control" id="fullname" defaultValue={account.fullname} onChange={this.handleChange} placeholder="Fullname"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="totalProject">Số dự án</label>
                                                    <input type="number" className="form-control" id="totalProject" defaultValue={account.totalProject} onChange={this.handleChange} readOnly placeholder="Project"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control" id="email" defaultValue={account.email} onChange={this.handleChange} placeholder="Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Điện thoại</label>
                                                    <input type="text" className="form-control" id="phone" defaultValue={account.phone} onChange={this.handleChange} placeholder="Phone"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="statusAccount">Trạng thái tài khoản</label>
                                                    <input type="number" className="form-control" id="statusAccount" defaultValue={account.statusAccount} onChange={this.handleChange} min={0} max={1} placeholder="Status Accout"/>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ</label>
                                                    <input type="text" className="form-control" id="address" defaultValue={account.address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="description">Thông tin mô tả</label>
                                                    <textarea type="text" className="form-control" id="description" defaultValue={account.description} onChange={this.handleChange} placeholder="Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="button" className="btn btn-danger" onClick={this.showModal}>Xóa tài khoản</button>
                                            </div>
                                            <Modal
                                                title="Xác nhận xóa tài khoản"
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}
                                            ><p>Bạn chắc chắn muốn xóa tài khoản này</p></Modal>
                                        </div>
                                    </form>
                                </div>
                            </div> : 
                            <Skeleton loading={true} avatar active></Skeleton>
                        }
                    </div> {/* card mb-3 */} 
                </div>        
            </div> 
        </div> {/* <!-- /#wrapper --> */} 
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
    getOne: (id) => dispatch(accountActions.getOne(id)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (AccountDetail)