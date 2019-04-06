import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal } from 'antd';
import moment from 'moment';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { newsService } from '../../../_services';
import { newsActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class NewsEditor extends Component {
    constructor(props) {
        super(props);
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            page: this.props.match.params.page,
            isEdit: false, 
            visibleDelete: false,
            visiblePreview: false,
            content: '',
        };  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteNews = this.deleteNews.bind(this);
    }  

    handleChange(event, editor) {
        if (this.state.isEdit === false)
            this.setState({isEdit: true})
    }

    handleSubmit(e) {
        e.preventDefault();
        const now = moment().unix()
        if(this.state.isEdit) {
            const news = {
                title: this.getValueByID("title"),
                content: this.state.content,
                type: this.getValueByID("type"),
                createTime: this.getValueByID("createTime"),
                updateTime: now,
            }
            message.loading('Update news in process', 1)
            .then(()=>{
                newsService.update(this.state.id, news)
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

    deleteNews(){
        message.loading('Delete news in process', 1)
            .then(()=>{
                newsService.delete(this.state.id)
                .then(res => {
                    if(res.status === 200){
                        message.success('Delete Done')
                        this.props.history.push('/news/' + this.state.page)
                    }
                })
                .catch(err => {
                    message.error('Delete Error, please try again')
                })
            })   
    }
    
    showModalDelete = () => {
        this.setState({
            visibleDelete: true,
        });
    }

    showModalPreview = () => {
        this.setState({
            visiblePreview: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visibleDelete: false,
        });
        this.deleteNews()
    }
    
    handleCancel = (e) => {
        this.setState({
            visibleDelete: false,
            visiblePreview: false,
        });
    }

    getValueByID (id) { 
        return document.getElementById(id).value
    }

    render() {
    var news = isEmpty(this.props.news) || this.props.news.type === "NEWS_GETALL_SUCCESS" ? {type: "NEWS"} : this.props.news
    var newsResult = isEmpty(news.result) ? {} : news.result.newsResult
    
    if(!isEmpty(news.type) && news.type === "NEWS_GETONE_FAILURE"){
        if(!isEmpty(news.error) && news.error.data.status===401){
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
                        <div className="col-9">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="/">Dashboard</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href={`/news/${this.state.page}`}>News</a>
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
                                        <input type="text" className="form-control" id="createTime" defaultValue={newsResult.createTime} hidden/>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6"> 
                                                <div className="form-group">
                                                    <label htmlFor="title">Tên bài viết:</label>
                                                    <input type="text" className="form-control" id="title" defaultValue={newsResult.title} onChange={this.handleChange} placeholder="Tilte"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="type">Loại:</label>
                                                    <select className="form-control" id="type" defaultValue={newsResult.type} onChange={this.handleChange}>
                                                        <option value="Phong thủy">Phong thủy</option>
                                                        <option value="Nội thất - Ngoại thất">Nội thất - Ngoại thất</option>
                                                        <option value="Xây dựng - Kiến trúc">Xây dựng - Kiến trúc</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <label htmlFor="type">Nội dung:</label>
                                        <CKEditor
                                            editor={ DecoupledEditor }
                                            data={newsResult.content}
                                            onInit={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log( 'Editor is ready to use!' );
                                                // Insert the toolbar before the editable area.
                                                    editor.ui.getEditableElement().parentElement.insertBefore(
                                                    editor.ui.view.toolbar.element,
                                                    editor.ui.getEditableElement()
                                                );
                                                this.setState({content: newsResult.content})
                                            }}
                                            onChange={ ( event, editor ) => this.handleChange(event, editor)}
                                            onBlur={ ( event, editor ) => {
                                                const data = editor.getData()
                                                let content = Object.assign({}, this.state.content)
                                                content = data
                                                this.setState({content})
                                            }}
                                            onFocus={ editor => {
                                                console.log( 'Focus.', editor );
                                            }}
                                            onOk={(event, editor) => {
                                                const data = editor.getData()
                                                console.log(data);
                                            }}
                                        />
                                           
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="button" className="btn btn-danger" onClick={this.showModalDelete}>Xóa bài viết</button>
                                            </div>
                                            <Modal
                                                title="Xác nhận xóa bài viết"
                                                visible={this.state.visibleDelete}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}
                                            ><p>Bạn chắc chắn muốn xóa bài viết này</p></Modal>
                                        </div>
                                    </form> 
                                    <div className="row mt-3">
                                        <div className="col-xl-6 col-sm-6">
                                            <button type="button" className="btn btn-success" onClick={this.showModalPreview}>Xem bài viết</button>
                                        </div>
                                        <Modal
                                            title="Xem bài viết"
                                            visible={this.state.visiblePreview}
                                            onCancel={this.handleCancel}
                                            onOK={this.handleCancel}
                                        ><div dangerouslySetInnerHTML={{__html: this.state.content}} ></div></Modal>
                                    </div>
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