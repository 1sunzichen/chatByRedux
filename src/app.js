import React from 'react';
import Login from './container/login/login.js';
import Reg from './container/register/register.js';
import BOSSINFO from './container/boss/bossinfo.js';
import GENINFO from './container/gen/GENINFO.js';
import AuthRouter from './component/authRoute/authRoute';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';
import {Switch,Route} from 'react-router-dom';
class App extends React.PureComponent{
    constructor(){
        super();
        this.state={
            hasError:false
        }
    }
    componentDidCatch(err,info){
        this.setState({
            hasError:true
        })
    }
    render(){
        
        return this.state.hasError?
        <h2> 页面出错了</h2>
        :(
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
        )
    }
}
export default App;
