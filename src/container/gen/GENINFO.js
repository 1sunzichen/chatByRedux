import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import Avatar from '../../component/avatarselector/avaselector';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {update}
)
class GenInfo extends React.Component{
    constructor(){
        super();
        this.state={
            title:"",
            desc:""
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const {location,redirTo}=this.props;
        return(
            <div>
                {redirTo&&redirTo!=location.pathname?<Redirect to={redirTo}></Redirect>:null}
                <NavBar mode="dark">🐂人完善信息展示页</NavBar>
                <Avatar selectAvatar={(img)=>{this.setState({
                    avatar:img
                })}}></Avatar>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                 求职职位
                </InputItem>
                
                <TextareaItem onChange={(v)=>this.onChange('desc',v)}
                rows={3}
                autoHeight
                title="个人简介">
                </TextareaItem>
                <Button
                onClick={()=>{
                    this.props.update(this.state)
                }}
                type="primary"
                >
                    
                    保存</Button>
            </div>
        )
    }
}
export default GenInfo;