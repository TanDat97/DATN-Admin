import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './_components';
import Login from './layout/auth/Login';
import Home from './layout/home/Home';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          {/* <Route path='/dashboard' component={Dashboard}/> */}
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
