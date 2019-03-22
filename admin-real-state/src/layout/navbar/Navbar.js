import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
        <a className="navbar-brand mr-1" href="index.html">Admin RealState</a>
        <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
            <i className="fas fa-bars"></i>
        </button>

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
                <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span>Trần Tấn Đạt</span><i className="fas fa-user-circle fa-fw"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="/">Settings</a>
                    <a className="dropdown-item" href="/">Create Account</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/login" data-toggle="modal" data-target="#logoutModal">Logout</a>
                </div>
            </li>
        </ul>
    </nav>

    <div id="wrapper">

        <ul className="sidebar navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Trang chủ</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-users"></i>
                    <span>Tài khoản</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-hotel"></i>
                    <span>Dự án</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">
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
                    <a className="dropdown-item" href="login.html">Login</a>
                    <a className="dropdown-item" href="register.html">Register</a>
                    <a className="dropdown-item" href="forgot-password.html">Forgot Password</a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header">Other Pages:</h6>
                    <a className="dropdown-item" href="404.html">404 Page</a>
                    <a className="dropdown-item" href="blank.html">Blank Page</a>
                </div>
            </li>

        </ul>

        <div id="content-wrapper">

            <div className="container-fluid">
                {/* <!-- Breadcrumbs--> */}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Overview</li>
                </ol>

                {/* <!-- Icon Cards--> */}
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-primary o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <i className="fas fa-fw fa-comments"></i>
                                </div>
                                <div className="mr-5">26 New Messages!</div>
                            </div>
                            <a className="card-footer text-white clearfix small z-1" href="/">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fas fa-angle-right"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-warning o-hidden h-100">
                            <div className="card-body">
                                <div className="card-body-icon">
                                    <i className="fas fa-fw fa-list"></i>
                                </div>
                                <div className="mr-5">11 New Tasks!</div>
                            </div>
                            <a className="card-footer text-white clearfix small z-1" href="/">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                <i className="fas fa-angle-right"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                            <i className="fas fa-fw fa-shopping-cart"></i>
                            </div>
                            <div className="mr-5">123 New Orders!</div>
                        </div>
                        <a className="card-footer text-white clearfix small z-1" href="/">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                            <i className="fas fa-angle-right"></i>
                            </span>
                        </a>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-danger o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                            <i className="fas fa-fw fa-life-ring"></i>
                            </div>
                            <div className="mr-5">13 New Tickets!</div>
                        </div>
                        <a className="card-footer text-white clearfix small z-1" href="/">
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                            <i className="fas fa-angle-right"></i>
                            </span>
                        </a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        {/* <!-- /.content-wrapper --> */}
    </div>
        {/* <!-- /#wrapper --> */}

    </div>
            
  )
} 

const mapStateToProps = (state) => {
    return {

    }
  }
  
  export default connect(mapStateToProps,null) (Navbar)