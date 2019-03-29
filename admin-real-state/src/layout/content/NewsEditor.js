import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal } from 'antd';
import { newsService } from '../../_services';

import { newsActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class NewsEditor extends Component {
    constructor(props) {
        super(props);
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            isEdit: false, 
            visible: false,
        };  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteNews = this.deleteNews.bind(this);
    }  

    handleChange(e) {
        this.setState({isEdit: true})
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.isEdit) {
            const news = {
                title: "title news",
                content: "content news",
                address: "Phong thủy",
            }
            message.loading('Update news in process', 1)
            .then(()=>{
                newsService.update(this.state.id, news)
                .then(res => {
                    if(res.status === 200){
                        this.setState({isEdit: false})
                        message.success('Update Done')
                    }
                })
                .catch(err => {
                    this.setState({isEdit: false})
                    message.error('Update Error, please try again')
                })
            })   
        }    
    }

    deleteNews(){
        message.loading('Delete news in process', 1)
            .then(()=>{
                newsService.delete(this.state.id)
                .then(res => {
                    if(res.status === 200){
                        message.success('Delete Done')
                        this.props.history.push('/news')
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
        this.deleteNews()
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
    var news = this.props.news.result === undefined || this.props.news.type === "NEWS_GETALL_SUCCESS" ? null : this.props.news
    var newsResult = isEmpty(news) ? null : news.result.newsResult
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
                                    <a href="/news">News</a>
                                </li>
                                <li className="breadcrumb-item active">{isEmpty(newsResult)?'':newsResult._id}</li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> News Editor</i> 
                        </div>
                        {!isEmpty(newsResult)?
                            <div className="row mt-3 mb-3">
                                
                                <div className="col-xl-12 col-sm-12">
                                    <form name="form" onSubmit={this.handleSubmit}>

                                        <div className="mt-3">
                                            {newsResult.content}    
                                        </div> 
                                           
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="button" className="btn btn-danger" onClick={this.showModal}>Xóa bài viết</button>
                                            </div>
                                            <Modal
                                                title="Xác nhận xóa tài khoản"
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}
                                            ><p>Bạn chắc chắn muốn xóa bài viết này</p></Modal>
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
    news: state.news,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getOne: (id) => dispatch(newsActions.getOne(id)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (NewsEditor)