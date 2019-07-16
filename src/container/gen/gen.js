import React from  'react';
import '../boss/boss.css';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../../component/usercard/usercard';
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Gen extends React.Component{
   
    componentDidMount() {
        this.props.getUserList("boss")
    }
    
    render(){
        console.log(this.props,"genius");
        
       
        
        return(
           <UserCard  {...this.props}></UserCard>
        )
    }
}
export default Gen;