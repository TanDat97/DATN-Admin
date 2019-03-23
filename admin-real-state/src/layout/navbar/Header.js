import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <a className="navbar-brand mr-1" href="index.html">Admin RealState</a>
       
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </form>

        <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow">
                <NavLink className="nav-link dropdown-toggle" to="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span>{props.user.fullname}</span><i className="fas fa-user-circle fa-fw"></i>
                </NavLink>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="/">Cài đặt</a>
                    <a className="dropdown-item" href="/">Tạo tài khoản mới</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/login">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Đăng xuất</span>
                    </a>
                </div>
            </li>
        </ul>
    </nav>
    </div>
)}

const mapStateToProps = (state) => {
    return {

    }
  }
  
  export default connect(mapStateToProps,null) (Header)