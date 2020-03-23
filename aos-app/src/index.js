import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Success from './Success.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Register from './Register'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/Success' component={Success}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
