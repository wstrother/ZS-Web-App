import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';

import Home from 'containers/Home';
import Animator from 'containers/Animator';
import FrameSelector from 'containers/FrameSelector';
import NotFound from 'containers/NotFound';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/animator' component={Animator}/>
      <Route exact path='/frames' component={FrameSelector}/>

      <Route path='*' component={NotFound}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
