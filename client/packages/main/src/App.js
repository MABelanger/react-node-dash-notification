import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import InputsOutputsTx from './lib/InputsOutputsTx';

//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={InputsOutputsTx} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
