import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import BOSSINFO from './container/boss/bossinfo.js';
import GENINFO from './container/gen/GENINFO.js';
import AuthRouter from './component/authRoute/authRoute';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';
import Login from './container/login/login.js';
import Reg from './container/register/register.js';
import './config';
  const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
  ))
    ReactDOM.render(
      (<Provider store={store}>
      <BrowserRouter>
      <div>

          <AuthRouter></AuthRouter>
          <Switch>

            <Route path="/bossinfo"  component={BOSSINFO}></Route>
            <Route path="/geniusinfo"  component={GENINFO}></Route>
            <Route path="/login"  component={Login}></Route>
            <Route path="/register" component={Reg}></Route>
            <Route path="/chat/:index" component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
      </div>
      </BrowserRouter>
      </Provider>), 
      document.getElementById('root'));
    
    
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

