import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import {NavLink} from 'react-router-dom';
// import { connect } from 'react-redux';


class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        page: 0,
      };  
    }  

    componentDidMount(){
        this.setState({page: this.props.location.pathname.split("/")[1]})
    }

    componentDidUpdate(prevProps){
        const currentPage = this.props.location.pathname.split("/")[1]
        if(prevProps.location.pathname.split("/")[1] !== currentPage)
            this.setState({page: currentPage})
    }
  
    render() {
    return (
        <div>
            <ul className="sidebar navbar-nav">
                <li className={this.state.page===''?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Trang chủ</span>
                    </a>
                </li>
                <li className={this.state.page==='account'?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/account">
                        <i className="fas fa-fw fa-users"></i>
                        <span>Tài khoản</span>
                    </a>
                </li>
                <li className={this.state.page==='project'?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/project">
                        <i className="fas fa-fw fa-hotel"></i>
                        <span>Dự án</span>
                    </a>
                </li>
                <li className={this.state.page==='news'?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/news">
                        <i className="fas fa-fw fa-newspaper"></i>
                        <span>Bài viết</span>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Thông tin</span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                        <h6 className="dropdown-header">Login Screens:</h6>
                        <a className="dropdown-item" href="/">Login</a>
                        <a className="dropdown-item" href="/">Register</a>
                        <a className="dropdown-item" href="/">Forgot Password</a>
                        <div className="dropdown-divider"></div>
                        <h6 className="dropdown-header">Other Pages:</h6>
                        <a className="dropdown-item" href="/">404 Page</a>
                        <a className="dropdown-item" href="/">Blank Page</a>
                    </div>
                </li>
            </ul>
        </div>           
        )
    }
} 

  
export default withRouter(Navbar)