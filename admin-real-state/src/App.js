import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './_components';
import Login from './layout/auth/Login';
import Dashboard from './layout/content/Dashboard';
import Account from './layout/content/Account';
import 'antd/dist/antd.css'
import './style/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path='/account' component={Account}/>
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
