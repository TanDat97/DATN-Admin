import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { PrivateRoute } from './_components';
import Login from './layout/auth/Login';
import Dashboard from './layout/content/Dashboard';
import Account from './layout/content/Account';
import AccountDetail from './layout/content/AccountDetail';
import Project from './layout/content/Project';
import News from './layout/content/News';
import NewsEditor from './layout/content/NewsEditor';
import 'antd/dist/antd.css';
import './style/App.css';
import './style/sb-admin.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path='/account' component={Account}/>
          <PrivateRoute exact path='/account/:id' component={AccountDetail}/>
          <PrivateRoute exact path='/project' component={Project}/>
          <PrivateRoute exact path='/news' component={News}/>
          <PrivateRoute exact path='/news/:id' component={NewsEditor}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
