import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import { PrivateRoute } from './_components';
import Dashboard from './layout/content/Dashboard';
import Login from './layout/account/Login';
import SettingAccount from './layout/account/SettingAcount';
import Account from './layout/content/account/Account';
import AccountDetail from './layout/content/account/AccountDetail';
import Project from './layout/content/project/Project';
import ProjectDetail from './layout/content/project/ProjectDetail';
import ProjectAdd from './layout/content/project/ProjectAdd';
import News from './layout/content/news/News';
import NewsEditor from './layout/content/news/NewsEditor';
import NewsAdd from './layout/content/news/NewsAdd';
import Notfound from './layout/content/component/NotFound';
import './style/App.css';
import './style/sb-admin.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute exact path="/setting/:id" component={SettingAccount}/>
          <PrivateRoute exact path='/account/:page' component={Account}/>
          <PrivateRoute exact path='/account/:page/:id' component={AccountDetail}/>
          <PrivateRoute exact path='/project/:page' component={Project}/>
          <PrivateRoute exact path='/project/:page/:id' component={ProjectDetail}/>
          <PrivateRoute exact path='/projectadd' component={ProjectAdd}/>
          <PrivateRoute exact path='/news/:page' component={News}/>
          <PrivateRoute exact path='/news/:page/:id' component={NewsEditor}/>
          <PrivateRoute exact path='/newsadd' component={NewsAdd}/>
          <Route exact path='/login' component={Login}/>
          <Route component={Notfound}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)