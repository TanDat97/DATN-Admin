import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Table, Tag, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { newsActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class News extends Component {
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
            title: 'Tên bài báo',
            dataIndex: 'title',
            key: 'title',
            render: text => <a href="">{text}</a>,
            sorter: (a, b) => a.title > b.title,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Loại bài đăng',
            dataIndex: 'type',
            key: 'type',
            filters: [{
                text: 'Nội thất - Ngoại thất',
                value: 'Nội thất - Ngoại thất',
            }, {
                text: 'Phong thủy',
                value: 'Phong thủy',
            },{
                text: 'Xây dựng - Kiến trúc',
                value: 'Xây dựng - Kiến trúc',
            }],
            onFilter: (value, record) => record.type===value,
            render: content => {
                var color
                if(content === 'Nội thất - Ngoại thất') 
                    color = 'geekblue'
                else if(content === 'Phong thủy')
                    color = 'red'
                else if(content === 'Xây dựng - Kiến trúc')
                    color = 'green'
                return <Tag color={color} key={content}>{content}</Tag>
            }
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createTime',
            key: 'createTime',
            render: createTime => moment.unix(createTime).format('DD/MM/YYYY, h:mm a'),
            sorter: (a, b) => a.createTime - b.createTime,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Thời gian cập nhật',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: updateTime => moment.unix(updateTime).format('DD/MM/YYYY, h:mm a'),
            sorter: (a, b) => a.updateTime - b.updateTime,
            sortDirections: ['descend', 'ascend'],
        },
    ]
    var dataSource = [];
    var isLoading = true;
    const news = isEmpty(this.props.news) ? {} : this.props.news;
    dataSource = isEmpty(news.result) || this.props.news.type === "NEWS_GETONE_SUCCESS" ? [] : news.result.news;
    if(dataSource.length>0){
        isLoading = false;
    } else if(!isEmpty(news.type) && news.type === "NEWS_GETALL_FAILURE"){
        if(!isEmpty(news.error) && news.error.data.status===401){
            message.error("Phiên đã hết hạn, vui lòng đăng nhập lại", 3)
            this.props.history.push('/login')
        } else {
            message.error("Lỗi không xác định, vui lòng thử lại", 3)
            isLoading = false;
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
                                <li className="breadcrumb-item active">News</li>
                            </ol>
                        </div>
                    </div>                            
                
                    <div className="card mb-3">
                        <div className="card-header">
                            <i className="fas fa-table"></i>
                            Data Table News
                        </div>
                        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 30 }} rowKey="_id" loading={isLoading}
                            onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    this.props.history.push('/news/'+this.state.page+'/'+record._id)
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
    news: state.news,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getAll: (page) => dispatch(newsActions.getAll(page)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (News)
