import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loaddata} from '../../redux/user.redux';
@withRouter
@connect(
    null,
    {loaddata}
)
class AuthRoute extends React.Component{
        componentDidMount() {
            const publicList=["/login","/register"];
            const pathName=this.props.location.pathname;
            console.log(publicList.indexOf(pathName)>-1);
            //如果是登陆和注册返回 空
            if(publicList.indexOf(pathName)>-1){
                return null
            }
            //用户的url login 是不需要跳转的
            //用户的type 身份是boss 还是牛人
            //用户是否完善信息
        Axios.get('/user/info')
        .then(res=>{
            if(res.status==200){
                if(res.data.code===0){
                    this.props.loaddata(res.data.data)
                }else{
                    this.props.history.push('/login')
                }
                console.log(this.props.history);

            }
        })
    }
    render(){
        console.log(this.props);
        
        return null
    }
}
export default AuthRoute;