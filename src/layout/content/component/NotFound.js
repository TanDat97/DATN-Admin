import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };  
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
                                    <li className="breadcrumb-item active">NotFound</li>
                                </ol>
                            </div>
                        </div>                            
                    
                        <div className="card mb-3">
                            <div className="card-header">
                                <i className="fas fa-table"></i>
                                Not Found
                            </div>
                            <div id="notfound">
                                <div className="container-fluid mt-5 mb-5">
                                    <div className="text-center">
                                        <h1>Oop!</h1>
                                        <h2>404 - The Page can't be found</h2>
                                        <p>
                                            Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable
                                        </p>
                                        <button type="button" className="btn btn-danger" onClick={()=>this.props.history.push("/")}>
                                            Go to Homepage
                                        </button>
                                    </div>
                                </div>
                            </div>
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
    return {
        authentication: state.authentication,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NotFound)
