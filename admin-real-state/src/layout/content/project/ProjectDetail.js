import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal } from 'antd';
import moment from 'moment';

import { projectService } from '../../../_services';
import { projectActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class ProjectDetail extends Component {
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
        this.deleteProject = this.deleteProject.bind(this);
    }  

    handleChange(e) {
        this.setState({isEdit: true})
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.isEdit) {
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
                ownerid: this.getValueByID("ownerid"),
                statusProject: this.getValueByID("statusProject"),
                createTime: moment(this.getValueByID("createTime")).unix(),
                updateTime: now,
            }
            message.loading('Update project in process', 1)
            .then(()=>{
                projectService.update(this.state.id, project)
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

    deleteProject(){
        message.loading('Delete account in process', 1)
            .then(()=>{
                projectService.delete(this.state.id)
                .then(res => {
                    if(res.status === 200){
                        message.success('Delete Done')
                        this.props.history.push('/project/' + this.state.page)
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
        this.deleteProject()
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
    var projectProps = isEmpty(this.props.project) || this.props.project.type === "PROJECT_GETALL_SUCCESS" ? {type: "PROJECT"} : this.props.project
    var project = isEmpty(projectProps.result) ? {} : projectProps.result.project
    if(!isEmpty(projectProps.type) && projectProps.type === "PROJECT_GETONE_FAILURE"){
        if(!isEmpty(projectProps.error) && projectProps.error.data.status===401){
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
                                <li className="breadcrumb-item">
                                    <a href={`/project/${this.state.page}`}>Project</a>
                                </li>
                                <li className="breadcrumb-item active">{isEmpty(project)?'':project._id}</li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Project Detail</i> 
                        </div>
                        {!isEmpty(project)?
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-12 col-sm-12">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Tên dự án:</label>
                                                    <input type="text" className="form-control" id="name" defaultValue={project.name} onChange={this.handleChange} placeholder="Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="investor">Nhà đầu tư:</label>
                                                    <input type="text" className="form-control" id="investor" defaultValue={project.investor} onChange={this.handleChange} placeholder="Investor"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Giá:</label>
                                                    <input type="number" className="form-control" id="price" defaultValue={project.price} onChange={this.handleChange} placeholder="Price"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="unit">Đơn vị (VNĐ)  :</label>
                                                    <input type="text" className="form-control" id="unit" defaultValue={project.unit} readOnly placeholder="Unit"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="area">Diện tích (m2):</label>
                                                    <input type="number" className="form-control" id="area" defaultValue={project.area} onChange={this.handleChange} placeholder="Area"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="createTime">Thời gian đăng dự án:</label>
                                                    <input type="text" className="form-control" id="createTime" defaultValue={moment.unix(project.createTime).format('DD/MM/YYYY, h:mm a')} readOnly placeholder="Create Time"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="lat">Lat:</label>
                                                    <input type="text" className="form-control" id="lat" defaultValue={project.lat} onChange={this.handleChange} placeholder="Lat"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="long">Long:</label>
                                                    <input type="text" className="form-control" id="long" defaultValue={project.long} onChange={this.handleChange} placeholder="Long"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="type">Loại BĐS:</label>
                                                    <input type="text" className="form-control" id="type" defaultValue={project.type} onChange={this.handleChange} placeholder="Type"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="statusProject">Trạng thái:</label>
                                                    <select className="form-control" id="statusProject" defaultValue={project.statusProject} onChange={this.handleChange}>
                                                        <option value="sell">Đang rao bán</option>
                                                        <option value="sold">Đã bán</option>
                                                        <option value="rent">Đang rao thuê</option>
                                                        <option value="rented">Đã cho thuê</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ownerid">ID người đăng:</label>
                                                    <input type="text" className="form-control" id="ownerid" defaultValue={project.ownerid} readOnly placeholder="OwnerID"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="updateTime">Thời gian cập nhật lần cuối:</label>
                                                    <input type="text" className="form-control" id="updateTime" defaultValue={moment.unix(project.updateTime).format('DD/MM/YYYY, h:mm a')} readOnly placeholder="Update Time"/>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" defaultValue={project.address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="info">Thông tin mô tả:</label>
                                                    <textarea type="text" className="form-control" id="info" defaultValue={project.info} onChange={this.handleChange} placeholder="Info"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="button" className="btn btn-danger" onClick={this.showModal}>Xóa dự án</button>
                                            </div>
                                            <Modal
                                                title="Xác nhận xóa dự án"
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}
                                            ><p>Bạn chắc chắn muốn xóa dự án này</p></Modal>
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
    project: state.project,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getOne: (id) => dispatch(projectActions.getOne(id)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProjectDetail)