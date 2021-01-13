import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgListById, recvMsg, sendMsg, readMsg } from '../../redux/chat.redux'
import { getChatId, filterArr } from '../../util'
import _ from 'lodash'
// import Queue from 'rc-queue-anim';
const socket = io('ws://localhost:9093')
@connect((state) => state, {
  getMsgListById,
  sendMsg,
  recvMsg,
  readMsg,
})
class Chat extends React.Component {
  constructor(props) {
    super(props)
    const index = this.props.match.params.index
    this.props.getMsgListById(index)
    console.log(this.props, 'this.props')
    const toUser = this.props.chatuser.userlists.filter((v) => String(v._id) === index)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false,
      index: index,
      toUser: toUser,
    }
  }

  componentWillMount() {
    console.log(this.props)
  }
  handleSubmit() {
    // console.log(this.state.text,66);
    // socket.emit('sendmsg',{text:this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.index
    const message = this.state.text
    console.log(message)
    this.props.sendMsg({ from, to, message })
    this.setState({
      text: '',
      showEmoji: false,
    })
  }
  componentDidMount() {
    console.log(this.props.chat.chatmsg)

    if (!this.props.chat.chatmsg.length) {
      //   this.props.getMsgListById()
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
  componentWillUnmount() {
    const to = this.props.match.params.index
    console.log(to, 'to~chat')

    this.props.readMsg(to)
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render() {
    console.log(this.state)
    console.log(this.props, 'chat*******')
    const Item = List.Item
    const { index, toUser } = this.state
    const users = this.props.chat.users
    // const toUser = this.props.chatuser.userlists.filter((v) => String(v._id) === thisindex)
    console.log(users, 'users', toUser)
    const chatid = getChatId(this.state.index, this.props.user._id)
    const chatmsgsTemp = this.props.chat.chatmsg.filter((v) => v.chatid == chatid)
    const chatmsgs = filterArr(chatmsgsTemp, '_id')
    // if(!users[index]){
    //     return null
    // }
    const emoji = '😁 😆 😊 😂 😈 😱'
      .split(' ')
      .filter((v) => v)
      .map((v) => ({ text: v }))
    const { showEmoji, text } = this.state
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left"></Icon>}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {_.get(toUser, '[0]user', index)}
        </NavBar>
        <div>
          {chatmsgs.map((v) => {
            //const avatar=require(`../image/${users[v.from].avatar}.png`);
            return (
              <List key={v._id + Math.random()}>
                <Item
                  className={v.from != index && 'chat-me'}
                  // thumb={avatar}
                >
                  <p style={{ color: v.history ? 'black' : 'red', margin: 0 }}>
                    {v.from == index ? '对方发来的' : '我发的'}：{v.content}
                  </p>
                </Item>
              </List>
            )
          })}
        </div>
        {/* {this.state.msg.map((v) => {
                    let tempdata = v + Math.random() * 10
                    return <p key={tempdata}>{v}</p>
                })} */}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={(v) => {
                this.setState({
                  text: v,
                })
              }}
              extra={
                <div>
                  <span
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji,
                      })
                    }}
                  >
                    😂
                  </span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            >
              信息
            </InputItem>
          </List>
          {showEmoji ? (
            <Grid
              data={emoji}
              columnNum={6}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(el) => {
                console.log(el)
                this.setState({
                  text: text + el.text,
                })
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}
export default Chat
