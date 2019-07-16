import React from 'react';
import io from 'socket.io-client';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, recvMsg ,sendMsg,readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../util';
import Queue from 'rc-queue-anim';
const socket = io('ws://192.168.1.5:9093')
@connect(
    state => state,
    {
        getMsgList,
        sendMsg,
        recvMsg,
        readMsg
    }
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props);

        this.state = {
            text: "",
            msg: [],
            showEmoji:false
        }
    }

    componentWillMount() {
        console.log(this.props);
    }
    handleSubmit() {
        // console.log(this.state.text,66);
        // socket.emit('sendmsg',{text:this.state.text})
        const from = this.props.user._id;
        const to = this.props.match.params.index;
        const message = this.state.text;
        console.log(message);
        this.props.sendMsg({ from, to, message })
        this.setState({
            text: "",
            showEmoji:false
        })

    }
    componentDidMount() {
        console.log(this.props.chat.chatmsg);
        
        if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()	
        }
        // const to=this.props.match.params.index;
        // console.log(to,"to~chat");
        
        // this.props.readMsg(to);
        // socket.on('recvmsg',(data)=>{
        //     console.log(data);
        //    this.setState({
        //        msg:[...this.state.msg,data.text]
        //    })  
        // })
    }
    componentWillUnmount(){
        const to=this.props.match.params.index;
        console.log(to,"to~chat");
        
        this.props.readMsg(to);
    }
    fixCarousel(){
        setTimeout(()=>{
            window.dispatchEvent(new Event("resize"))
        },0)
    }
    render() {
        console.log(this.state);
        console.log(this.props,"chat*******");
        const Item=List.Item;
        const index=this.props.match.params.index;
        console.log(index);
        const users=this.props.chat.users;
        console.log(users,"users");
        const chatid=getChatId(index,this.props.user._id);
        const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        // if(!users[index]){
        //     return null
        // }
        const emoji='😁 😆 😊 😂 😈 😱'.split(" ")
                    .filter(v=>v)
                    .map(v=>({text:v}));
        const {showEmoji,text}=this.state;
        return (
            <div id="chat-page">

            <NavBar mode="dark"
                icon={<Icon type="left"></Icon>}
                    onLeftClick={
                        ()=>{
                            this.props.history.goBack()
                        }
                    }
                >
                    {index}
                </NavBar>
                <Queue delay={100}>

                {chatmsgs.map(v=>{
                    //const avatar=require(`../image/${users[v.from].avatar}.png`);
                    return v.from==index? 
                    (
                        <List key={v._id+Math.random()}>
                            <Item
                               // thumb={avatar}
                               >对方发来的：{v.content}</Item>
                        </List>)
                    :(
                        <List key={v._id+Math.random()}>
                            <Item
                            //extra={<img src={avatar}/>}
                            className="chat-me">我发的：{v.content}</Item>
                        </List>
                    )
                })}
                </Queue>
                {/* {this.state.msg.map((v) => {
                    let tempdata = v + Math.random() * 10
                    return <p key={tempdata}>{v}</p>
                })} */}
                <div className="stick-footer"> 
                <List>
                    <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v => {
                            this.setState({
                                text: v
                            })
                        }}
                        extra={
                            <div>
                                <span
                                 style={{marginRight:15}}
                                 onClick={()=>{
                                     this.setState({
                                         showEmoji:!(this.state.showEmoji)
                                     })
                                 }}
                                 >😂</span>
                            <span onClick={()=>this.handleSubmit()}>发送</span>
                            </div>
                        }
                        >信息
                    </InputItem>
                </List>
                {showEmoji?   
                <Grid
                data={emoji}
                columnNum={6}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={el=>{
                    console.log(el);
                    this.setState({
                        text:text+el.text
                    })
                    
                }}
                />
                :null}
            </div>
                        </div>
        )
    }
}
export default Chat;