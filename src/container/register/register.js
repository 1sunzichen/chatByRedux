import React from 'react';
import Logo from '../../component/logo/logo';
import {Radio,Button,WingBlank,InputItem,List,WhiteSpace} from 'antd-mobile';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import hocForm from '../../component/form/formHoc';
@connect(
    state=>state.user,
    {register}
)
@hocForm
class Register extends React.Component{
    constructor(){
        super();
        // this.state={
        //     user:"",
        //     pwd:"",
            
        //     type:"genius",
        //     repwd:"",
        // } 
        this.handleReg=this.handleReg.bind(this);
    }
    componentDidMount(){
        this.props.handleChange("type","genius")
    }
    // handleChange(key,v){
    //     this.setState({
    //         [key]:v
    //     })
    // }
    handleReg(){
        //console.log(this.state);
        this.props.register(this.props.state)
    }
    render(){
         const RadioItem=Radio.RadioItem;
         console.log(this.props,this.props.state);
         const {msg,redirTo}=this.props;
        return(
            <div>
                <Logo></Logo>
                <div>
                    {redirTo?<Redirect to={redirTo} />:null}
                    <WingBlank>
                    <List>
                           {msg?<p className="error-msg">{msg}</p>:null}
                            <InputItem 
                            onChange={v=>this.props.handleChange("user",v)}
                            >用户</InputItem>
                            <WhiteSpace/>
                            <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange("pwd",v)}
                            >密码</InputItem>
                            <WhiteSpace/>
                            <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange("repwd",v)}
                            >确认密码</InputItem>
                            <RadioItem checked={this.props.state.type==="genius"}
                            onChange={v=>this.props.handleChange("type","genius")}
                            >牛人</RadioItem>
                            <RadioItem checked={this.props.state.type==="boss"}
                            onChange={v=>this.props.handleChange("type","boss")}
                            >BOSS</RadioItem>

                        </List>
                         <WhiteSpace/>
                         <Button  type="primary" onClick={this.handleReg}>注册</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default  Register;