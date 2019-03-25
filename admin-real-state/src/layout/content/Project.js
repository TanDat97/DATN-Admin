import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Table, Tag, message } from 'antd';
import { connect } from 'react-redux';

import { projectActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class Project extends Component {
  constructor(props) {
    super(props);
    this.props.getAll();
    this.state = {
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
            title: 'Tên dự án',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="/">{text}</a>,
            sorter: (a, b) => a.name > b.name,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nhà đầu tư',
            dataIndex: 'investor',
            key: 'investor',
            sorter: (a, b) => a.investor > b.investor,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Loại BĐS',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Diện tích',
            dataIndex: 'area',
            key: 'area',
            sorter: (a, b) => a.area - b.area,
            sortDirections: ['descend', 'ascend'],
            render: area => <Tag color={'black'} key={area}>{area}</Tag>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusProject',
            key: 'statusProject',
            filters: [{
                text: 'sell',
                value: 'sell',
            }, {
                text: 'sold',
                value: 'sold',
            },{
                text: 'rent',
                value: 'rent',
            },{
                text: 'rented',
                value: 'rented',
            }],
            onFilter: (value, record) => record.statusProject===value,
            render: statusProject => {
                var color
                if(statusProject === 'sell') 
                    color = 'geekblue'
                else if(statusProject === 'sold')
                    color = 'red'
                else if(statusProject === 'rent')
                    color = 'green'
                else if(statusProject === 'rented')
                    color = 'orange'
                return <Tag color={color} key={statusProject}>{statusProject}</Tag>
            }
        },
    ]
    var dataSource = [];
    var isLoading = true;
    const project = isEmpty(this.props.project) ? {} : this.props.project;
    dataSource = isEmpty(project.result) || this.props.project.type === "ACCOUNT_GETONE_SUCCESS" ? [] : project.result.projects;
    if(dataSource.length>0){
        isLoading = false;
    } else if(!isEmpty(project.type) && project.type === "ACCOUNT_GETALL_FAILURE" && project.error.data.status===401){
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
                                <li className="breadcrumb-item active">Project</li>
                            </ol>
                        </div>
                    </div>                            
                
                    <div className="card mb-3">
                        <div className="card-header">
                            <i className="fas fa-table"></i>
                            Data Table Project
                        </div>
                        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 30 }} rowKey="_id" loading={isLoading}
                            onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    this.props.history.push('/project/'+record._id)
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
    project: state.project,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getAll: () => dispatch(projectActions.getAll()),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Project)
