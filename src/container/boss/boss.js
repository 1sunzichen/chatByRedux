import React from  'react';
import './boss.css';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../../component/usercard/usercard';
@connect(
    state=>state.chatuser,
    {getUserList}
)
class BOSS extends React.Component{
   
    componentDidMount() {
        this.props.getUserList("genius")
    }
    
    render(){
        

        console.log(this.props,"boss");
        
        return(
            <UserCard  {...this.props}></UserCard>
        )
    }
}
export default BOSS;