import React from 'react';
import {connect} from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { Brief } from 'antd-mobile/lib/list/ListItem';
@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1];
    }
    render(){

        const {chat,chatuser}=this.props;
        console.log(this.props);
        
        const msgGroup={};
        chat.chatmsg.forEach((v)=>{
            msgGroup[v.chatid]=msgGroup[v.chatid]||[];
            msgGroup[v.chatid].push(v);
        })
        const chatList=Object.values(msgGroup).sort((a,b)=>{
            const alist=this.getLast(a).create_time;
            const blist=this.getLast(b).create_time;
            return blist-alist;
        });
        const Item=List.Item;
        console.log(this.props);
        const userid=this.props.user._id;

        return(
            <div>
                <List>

                    {chatList?chatList.map((v)=>{
                        const lastItem=this.getLast(v);
                        const targetId=v[0].from==userid?v[0].to:v[0].from;
                        const unreadNUm=v.filter(v=>!v.read&&v.to==userid).length;

                        const name=chat.users[targetId]?chat.users[targetId].name
                        :"";
                        console.log(chatuser.userlists,targetId);
                        
                        
                        return(
                            <Item key={Math.random()+lastItem._id}
                                extra={<Badge text={unreadNUm}></Badge>}
                                arrow="horizontal"
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                               最后一条聊天信息： {lastItem.content}
                               <Brief>
                                {name}
                                
                               </Brief>
                            </Item>
                        )

                    }):null}
                </List>
            </div>
        )
    }
}
export default Msg;
