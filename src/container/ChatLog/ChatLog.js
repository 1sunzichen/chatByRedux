import React from 'react';
import {connect} from 'react-redux';
@connect(
    state=>state
)
class ChatLog extends React.Component{
   
    render(){
       console.log(this.props);
       

        return(
            <div>
               聊天记录
            </div>
        )
    }
}
export default ChatLog;
