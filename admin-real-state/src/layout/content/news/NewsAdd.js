import React, { Component } from 'react';
// import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { message, Modal } from 'antd';
import moment from 'moment';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { newsService } from '../../../_services';
// import { newsActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class NewsEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblePreview: false,
            content: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }  

    handleSubmit(e) {
        e.preventDefault();
        const now = moment().unix()
        const news = {
            title: this.getValueByID("title"),
            content: this.state.content,
            type: this.getValueByID("type"),
            createTime: now,
            updateTime: now,
        }
        message.loading('Add news in process', 1)
        .then(()=>{
            newsService.add(news)
            .then(res => {
                if(res.status === 201){
                    message.success('Add Done')
                    this.props.history.push('/news/1')
                }
            })
            .catch(err => {
                message.error('Add Error, please try again')
            })
        })   
    }

    showModalPreview = () => {
        this.setState({
            visiblePreview: true,
        });
    }
    
    handleCancel = (e) => {
        this.setState({
            visiblePreview: false,
        });
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
                                    <a href='/news/1'>News</a>
                                </li>
                                <li className="breadcrumb-item active">Add News</li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> News Editor</i> 
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-xl-12 col-sm-12">
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-6 col-sm-6"> 
                                            <div className="form-group">
                                                <label htmlFor="title">Tên bài viết:</label>
                                                <input type="text" className="form-control" id="title" placeholder="Tilte"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="type">Loại:</label>
                                                <select className="form-control" id="type">
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
                                        data={''}
                                        onInit={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log( 'Editor is ready to use!' );
                                            // Insert the toolbar before the editable area.
                                                editor.ui.getEditableElement().parentElement.insertBefore(
                                                editor.ui.view.toolbar.element,
                                                editor.ui.getEditableElement()
                                            );
                                        }}
                                        // onChange={ ( event, editor ) => this.handleChange(event, editor)}
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
                                            <button type="submit" className="btn btn-primary">Thêm bài  viết</button>
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (NewsEditor)