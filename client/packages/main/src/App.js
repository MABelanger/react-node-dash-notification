import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LiveTx } from './lib/LiveTx';

//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LiveTx} />
          <Route path="testnet/livetx" component={LiveTx} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
