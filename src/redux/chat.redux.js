import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
//获取聊天列表
const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0,
  users: {},
}
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter((v) => !v.read && v.to == action.payload.userid).length,
      }
    case MSG_RECV:
      const n = action.payload.to == action.userid ? 1 : 0
      return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n }
    case MSG_READ:
      const { from, num } = action.payload
      return { ...state, chatmsg: state.chatmsg.map((v) => ({ ...v, read: from == v.from ? true : v.read })), unread: state.unread - num }
    default:
      return state
  }
}
function msgList(msgs, users, userid) {
  //获取的消息
  console.log(msgs, 'msgs', users)
  return {
    type: MSG_LIST,
    payload: { msgs, users, userid },
  }
}
function msgRecv(msg, userid) {
  return {
    type: MSG_RECV,
    payload: msg,
    userid,
  }
}
function msgRead({ from, userid, num }) {
  return {
    type: MSG_READ,
    payload: {
      from,
      userid,
      num,
    },
  }
}
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', { from }).then((res) => {
      const userid = getState().user._id
      if (res.state == 200 && res.data.code === 0) {
        const num = res.data.num

        dispatch(msgRead({ from, userid, num }))
      }
    })
  }
}
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then((res) => {
      if (res.data.code === 0 && res.state == 200) {
        console.log(res.data, getState())
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userid))
      }
    })
  }
}
export function getMsgListById(toId) {
  return (dispatch, getState) => {
    axios.get(`/user/getMsgListById?id=${toId}`).then((res) => {
      if (res.data.code === 0) {
        console.log(res.data, getState())
        const userid = getState().user._id
        const tempmsg = res.data.msgs.map((v) => {
          v.history = true
          return v
        })
        dispatch(msgList(tempmsg, res.data.users, userid))
      }
    })
  }
}
export function sendMsg({ from, to, message }) {
  return (dispatch) => {
    socket.emit('sendMsg', { from, to, message })
  }
}
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', (data) => {
      console.log(data, 'recv')
      const userid = getState().user._id

      dispatch(msgRecv(data, userid))
    })
  }
}
