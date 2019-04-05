import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message } from 'antd';

import { adminService } from '../../_services';
import { adminActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class SettingAdmin extends Component {
    constructor(props) {
        super(props);        
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            page: this.props.match.params.page,
            isEdit: false, 
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            submitted: false,
        };  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmitChangePassword = this.handleSubmitChangePassword.bind(this);
    }  

    handleChange(e) {
        this.setState({isEdit: true})
    }

    handleChangePassword(e) {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.isEdit) {
            const admin = {
                username: this.getValueByID("createBy"),
                fullname: this.getValueByID("fullname"),
                address: this.getValueByID("address"),
                email: this.getValueByID("email"),
                phone: this.getValueByID("phone"),
            }
            message.loading('Update admin in process', 1)
            .then(()=>{
                adminService.update(this.state.id, admin)
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
                    this.props.getOne(this.props.match.params.id);
                })
            })   
        }    
    }

    handleSubmitChangePassword(e) {
        e.preventDefault();
        this.setState({ 
          submitted: true,
        });
        const { currentPassword, newPassword, confirmPassword } = this.state;
       
        if((newPassword !== confirmPassword)&&currentPassword && newPassword && confirmPassword) {
            message.loading('Change password in process', 1)
            message.error('Confirm passwor error, please try again')
            this.setState({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                submitted: false,
            })
        } else if ((newPassword === confirmPassword) && currentPassword && newPassword && confirmPassword) {
            message.loading('Change password in process', 1)
            const postParam = {
                currentPassword,
                newPassword,
            }
            adminService.changePassword(postParam)
            .then(res => {
                if(res.status === 200) {
                    message.success(res.message)
                }
                this.setState({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    submitted: false,
                })
            })
            .catch(err=> {
                this.setState({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    submitted: false,
                })
                console.log(err)
                message.error('Change password failed')
            })
        }
    }

    getValueByID (id) { 
        return document.getElementById(id).value
    }

    render() {
    var { currentPassword, newPassword, confirmPassword, submitted } = this.state;
    var adminProps = isEmpty(this.props.admin) || this.props.admin.type === "ADMIN_GETALL_SUCCESS" ? {type: "ADMIN"} : this.props.admin
    var admin = isEmpty(adminProps.result) ? {} : adminProps.result.admin
    if(!isEmpty(adminProps.type) && adminProps.type === "ADMIN_GETONE_FAILURE"){
        if(!isEmpty(adminProps.error) && adminProps.error.data.status===401){
            message.error("Phiên đã hết hạn, vui lòng đăng nhập lại", 3)
            this.props.history.push('/login')
        } else {
            message.error("Lỗi không xác định, vui lòng thử lại", 3)
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
                                <li className="breadcrumb-item active">
                                    {isEmpty(admin)?'':admin._id}
                                </li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card mb-3">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Admin Detail</i> 
                        </div>
                        {!isEmpty(admin)?
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-4 col-sm-4">
                                    <div className="card">
                                        <img className="circular_square" src="http://vnhow.vn/img/uploads/contents/desc/2013/04/cach-chon-va-nuoi-meo.jpg" alt="Cardimagecap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{admin.fullname}</h5>
                                        </div>
                                    </div>
                            
                                </div>
                                <div className="col-xl-8 col-sm-8">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="fullname">Họ tên:</label>
                                                    <input type="text" className="form-control" id="fullname" defaultValue={admin.fullname} onChange={this.handleChange} placeholder="Fullname"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="createBy">Được tạo bởi id:</label>
                                                    <input type="text" className="form-control" id="createBy" defaultValue={admin.createBy} readOnly placeholder="Project"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Điện thoại:</label>
                                                    <input type="text" className="form-control" id="phone" defaultValue={admin.phone} onChange={this.handleChange} placeholder="Phone"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" defaultValue={admin.email} readOnly placeholder="Email"/>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" defaultValue={admin.address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> : 
                            <Skeleton loading={true} avatar active></Skeleton>
                        }
                    </div> {/* card mb-3 */} 
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Change Password</i> 
                        </div>
                        <div className="col-xl-12 col-sm-12">
                            <form name="form2" onSubmit={this.handleSubmitChangePassword}>
                                <div className="row mt-3">
                                    <div className="col-xl-3 col-sm-3">
                                        <div className={'form-group' + (submitted && !currentPassword ? ' has-error' : '')}>
                                            <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                                            <input type="password" className="form-control" name="currentPassword" value={currentPassword} onChange={this.handleChangePassword} placeholder="Current Password"/>
                                            {submitted && !currentPassword &&
                                                <div className="badge badge-danger">Current Password is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-3">
                                        <div className={'form-group' + (submitted && !newPassword ? ' has-error' : '')}>
                                            <label htmlFor="newPassword">Mật khẩu mới:</label>
                                            <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.handleChangePassword} placeholder="New Password"/>
                                            {submitted && !newPassword &&
                                                <div className="badge badge-danger">New Password is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-3">
                                        <div className={'form-group' + (submitted && !confirmPassword ? ' has-error' : '')}>
                                            <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                                            <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChangePassword} placeholder="Confirm Password"/>
                                            {submitted && !confirmPassword &&
                                                <div className="badge badge-danger">Confirm Password is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">.</label>
                                            <button type="submit" className="btn btn-success form-control">Đổi mật khẩu</button>
                                        </div>
                                    </div>
                                </div>      
                            </form>
                        </div>
                    </div>
                </div>        
            </div> 
        </div> {/* <!-- /#wrapper --> */} 
    </div>
    )}
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    admin: state.admin,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getOne: (id) => dispatch(adminActions.getOne(id)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (SettingAdmin)