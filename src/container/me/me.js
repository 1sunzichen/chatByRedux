import React from 'react';
import {connect} from 'react-redux';
import {Result,List, WhiteSpace,Modal} from 'antd-mobile';
import bcookies from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {logoutSubmit}
)
class Me extends React.Component{
    constructor(){
        super();
        this.logout=this.logout.bind(this)
    }
    logout(){
        console.log("this");
        const alert=Modal.alert;
        alert('注销', '确认退出登录吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                bcookies.erase('userid')
               this.props.logoutSubmit()
            }}
          ])
    }
    render(){
        console.log(this.props);
        
        const {user,avatar,type,company,title,desc,money,redirTo}=this.props;
        return user?(

            <div>
               
                <Result
                    img={<img src={require(`../../component/image/${avatar}.jpg`)} alt=""
                    width="50"/>} 
                    title={user}
                    message={type==="boss"?company:null}
                />
                <List
                renderHeader={()=>"简介"}
                >
                    <List.Item
                        multipleLine
                    >{title}
                        {desc.split('\n').map(d=>
                        <List.Item.Brief key={d}>{d}</List.Item.Brief>
                    
                            )}
                        {money? <List.Item.Brief key={money}>薪资:{money}</List.Item.Brief>:null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item
                    onClick={this.logout}>退出登录</List.Item>
                </List>
            </div>
        ) :<Redirect to={redirTo}></Redirect>
    }
}
export default Me