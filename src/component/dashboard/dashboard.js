import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navLink/navLink';
import {Switch,Route,Redirect} from 'react-router-dom';
import Boss from '../../container/boss/boss';
import Genius from '../../container/gen/gen';
import User from '../../container/me/me';
import { getMsgList, recvMsg } from '../../redux/chat.redux';
import Msg from '../../container/msg/msg';
import ChatLog from '../../container/ChatLog/ChatLog';
@connect(
    state => state,
    {getMsgList,recvMsg}
)
class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            
			this.props.getMsgList()
			this.props.recvMsg()	
		}
    }
    
    render() {
        
        
        const  user  = this.props.user;
        const pathName=this.props.location.pathname
        
        const navList= [
            {
                path: '/boss',
                text: '牛人',
                icon: "boss",
                title: "牛人列表",
                component: Boss,
                hide:user.type == 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: "genius",
                title: "boss列表",
                component: Genius,
                hide:user.type == 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: "msg",
                title: "message列表",
                component: Msg,
            },
            {
                path: '/self',
                text: '我',
                icon: "user",
                title: "个人中心",
                component: User,
            },
            {
                path: '/Log',
                text: '聊天记录',
                icon: "msg",
                title: "聊天记录",
                component: ChatLog,
            }

        ]
        const t=navList.find(v => (v.path == pathName));
        console.log(t);
        
        return t?(
            <div>
                <NavBar mode="dark" className="fixed-header">
                    {t.title}
                </NavBar>
                <div style={{marginTop:0}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>
                <NavLinkBar data={navList} ></NavLinkBar>
            </div>
        ):
        (<Redirect to="/msg"></Redirect>)
    }
}
export default Dashboard;