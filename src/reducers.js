//合并所有reducers
import {combineReducers} from 'redux';
import {chatuser} from './redux/chatuser.redux';
import {user} from './redux/user.redux';
import {chat} from './redux/chat.redux';
export default combineReducers({user,chatuser,chat});