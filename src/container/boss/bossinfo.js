import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import Avatar from '../../component/avatarselector/avaselector';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    //在redux文件中暴露出来的方法  一般是action 和其他的 请求数据的方法
    state=>state.user,
    {update}
)
class BossINFO extends React.Component{
    constructor(){
        super();
        this.state={
            title:"",
            desc:"",
            company:"",
            money:""
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const {location,redirTo}=this.props;
        console.log(this.props,"*******BOSSINFO");
        
        return(
            <div>
                {redirTo&&redirTo!=location.pathname?<Redirect to={redirTo}></Redirect>:null}
                <NavBar mode="dark">BOSS完善信息展示页</NavBar>
                <Avatar selectAvatar={(img)=>{this.setState({
                    avatar:img
                })}}></Avatar>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                 招聘职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company',v)}>
                 公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money',v)}>
                 职位薪资
                </InputItem>
                <TextareaItem onChange={(v)=>this.onChange('desc',v)}
                rows={3}
                autoHeight
                title="职位要求">
                 
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
export default BossINFO;