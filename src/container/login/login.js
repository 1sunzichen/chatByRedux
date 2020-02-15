import React from 'react';
import Logo from '../../component/logo/logo';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';
import {Button,WingBlank,InputItem,List,WhiteSpace} from 'antd-mobile';
import hocForm from '../../component/form/formHoc';
@connect(
    state=>state.user,
    {login}
)
// class Hello extends React.Component{
//     render(){
//         return(
//             <div>hello </div>
//         )
//     }
// }
// function proxyFn(Comp){
//     class FnComp extends Comp{
//         componentDidMount(){
//             console.log(" 新增周期");
            
//         }
//         render(){
//             return(
//                 <FnComp></FnComp>
//             )
//         }
//     }
//     return FnComp
// }
// //属性代理
// function Warper(Comp){
//     class WarperComp extends React.Component{
//         render(){
//             return(
//                 <div>

//                     <div>HOC高阶组件</div>
//                    <Comp {...this.props}></Comp>
//                 </div>
//             )
//         }
//     }
//     return WarperComp;
// }
// Hello=proxyFn(Hello);
@hocForm
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:"",
            pwd:""
        }
        this.Register=this.Register.bind(this);
    }
    Register(){
        this.props.history.push('/register')
    }
    // handleChange(key,v){
    //     this.setState({
    //         [key]:v
    //     })
    // }
    Loginin(){
        console.log(this.props.state.user);
        
        this.props.login(this.props.state.user?{user:this.props.state.user,pwd:"1"}:{user:"qq",pwd:"1"})
    }
    render(){
        const {msg,redirTo,handleChange}=this.props;
        return(
            <div>
                {redirTo?<Redirect to={redirTo}></Redirect>:null}
                <Logo></Logo>
                <div>
                    <WingBlank>
                        {msg?<p>{msg}</p>:null}
                        <List>
                            <InputItem 
                            defaultValue="qq"
                             
                             onChange={v=>this.props.handleChange("user",v)}
                             >用户爸爸</InputItem>
                            <WhiteSpace/>
                            <InputItem
                             defaultValue="1"
                             onChange={v=>this.props.handleChange("pwd",v)}
                            >密码弟弟</InputItem>
                        </List>
                        <Button type="primary"onClick={this.Loginin.bind(this)}>登录</Button>
                         <WhiteSpace/>
                         <Button  type="primary" onClick={this.Register}>注册</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default  Login;