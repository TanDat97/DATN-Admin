import React, { Component } from 'react';
// import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import { projectService } from '../../../_services';
// import { projectActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class ProjectAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };  
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const now = moment().unix()
        const project = {
            name: this.getValueByID("name"),
            investor: this.getValueByID("investor"),
            price: this.getValueByID("price"),
            unit: this.getValueByID("unit"),
            area: this.getValueByID("area"),
            address: this.getValueByID("address"),
            type: this.getValueByID("type"),
            info: this.getValueByID("info"),
            lat: this.getValueByID("lat"),
            long: this.getValueByID("long"),
            ownerid: 'admin:'+this.props.authentication.user.id,
            statusProject: this.getValueByID("statusProject"),
            allowComment: true,
            createTime: now,
            updateTime: now,
        }
        message.loading('Add project in process', 1)
        .then(()=>{
            projectService.add(project)
            .then(res => {
                if(res.status === 201){
                    message.success('Add project Done')
                    this.props.history.push('/project/1')
                }
            })
            .catch(err => {
                message.error('Add Error, please try again')
            })
        })   
    }

    getValueByID (id) { 
        return document.getElementById(id).value
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
                                <li className="breadcrumb-item">
                                    <a href='/project/1'>Project</a>
                                </li>
                                <li className="breadcrumb-item active">AddProject</li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Project Add</i> 
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-xl-12 col-sm-12">
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-6 col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Tên dự án:</label>
                                                <input type="text" className="form-control" id="name" placeholder="Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="investor">Nhà đầu tư:</label>
                                                <input type="text" className="form-control" id="investor" placeholder="Investor"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="price">Giá:</label>
                                                <input type="number" className="form-control" id="price" placeholder="Price"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="unit">Đơn vị (VNĐ)  :</label>
                                                <input type="text" className="form-control" id="unit" placeholder="Unit"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="area">Diện tích (m2):</label>
                                                <input type="number" className="form-control" id="area" placeholder="Area"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="createTime">Thời gian đăng dự án:</label>
                                                <input type="text" className="form-control" id="createTime" readOnly placeholder="Create Time"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="lat">Lat:</label>
                                                <input type="text" className="form-control" id="lat" placeholder="Lat"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="long">Long:</label>
                                                <input type="text" className="form-control" id="long" placeholder="Long"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="type">Loại BĐS:</label>
                                                <select className="form-control" id="type">
                                                    <option value="Căn hộ">Căn hộ</option>
                                                    <option value="Nhà phố">Nhà phố</option>
                                                    <option value="Biệt thự">Biệt thự</option>
                                                    <option value="Đất nền">Đất nền</option>
                                                    <option value="Văn phòng">Văn phòng</option>
                                                    <option value="Nhà kho, nhà xưởng">Nhà kho, nhà xưởng</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="statusProject">Trạng thái:</label>
                                                <select className="form-control" id="statusProject">
                                                    <option value="sell">Đang rao bán</option>
                                                    <option value="sold">Đã bán</option>
                                                    <option value="rent">Đang rao thuê</option>
                                                    <option value="rented">Đã cho thuê</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="ownerid">ID người đăng:</label>
                                                <input type="text" className="form-control" id="ownerid" readOnly placeholder="OwnerID"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="updateTime">Thời gian cập nhật lần cuối:</label>
                                                <input type="text" className="form-control" id="updateTime" readOnly placeholder="Update Time"/>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="row">
                                        <div className="col-xl-12 col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="address">Địa chỉ:</label>
                                                <input type="text" className="form-control" id="address" placeholder="Address"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12 col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="info">Thông tin mô tả:</label>
                                                <textarea type="text" className="form-control" id="info" placeholder="Info"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-xl-6 col-sm-6">
                                            <button type="submit" className="btn btn-primary">Thêm dự án</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div> 
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
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {

 }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProjectAdd)