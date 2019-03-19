import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './auth/SignIn';

import '../style/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <Route exact path='/' component={Dashboard} /> */}
          {/* <Route path='/dashboard' component={Dashboard}/> */}
          <Route path='/signin' component={SignIn} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
