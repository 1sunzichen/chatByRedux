import Axios from "axios";
import { getRedirectPath } from "../util";

 const REG_SUC='REG_SUC';
 const LOGININ="LOGININ";
 const LOGOUT="logout";
const AuthSuc="AS";
const ERR_MSG='ERR_MSG';
const LOAD="LOAD";
const initState={
    redirTo:"",
    // isAuth:false,
    msg:"",
    user:"",
    type:"",
}
export function user(state=initState,action){
    switch(action.type){
    //     case REG_SUC:
    //     return {...state,msg:"",isAuth:true,...action.payload
    // ,redirTo:getRedirectPath(action.payload)}
    //     case LOGININ:
    //     return {
    //         ...state,msg:"",isAuth:true,...action.payload,
    //         redirTo:getRedirectPath(action.payload)
    //     }
        case AuthSuc:
        return {
            ...state,msg:"",isAuth:true,...action.payload,
            redirTo:getRedirectPath(action.payload)
        }

        case ERR_MSG:
        return {...state,isAuth:false,msg:action.msg}
        case LOAD:
        return {
            ...state,...action.payload
        }
        case LOGOUT:
        return{
            ...initState,redirTo:'/login'
        }
        default:
        return state;
    }

}
export function register({user,pwd,type,repwd}){
    if(!user||!pwd||!type){
        return errorMsg("输入密码")
    }
    if(pwd!=repwd){
        return errorMsg("no")
    }
    return dispatch=>{
     Axios.post("/user/reg",{user,pwd,type})
    .then(res=>{
        if(res.status===200&&res.data.code==0){
            dispatch(authSuc({user,pwd,type}))
        }else{
            dispatch(errorMsg(res.data.msg));

        }
    })
    }
}
export function logoutSubmit(){
    return {type:LOGOUT}
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg("输入密码")
    }
    return dispatch=>{
        Axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                //
                
                dispatch(authSuc(res.data.data))
                dispatch(errorMsg(res.data.msg))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function loaddata(data){
    return {type:LOAD,payload:data}
}
export function update(data){
    return dispatch=>{
        Axios.post('/user/update',data)
        .then(
            res=>{
                if(res.status===200&&res.data.code==0){
                console.log(res.data);

                    dispatch(authSuc(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg));
        
                }
            }
        )
    }
}
function authSuc(obj){
    const {pwd,...data}=obj
    return {type:AuthSuc,payload:data}
}
// function loginSuc(data){
//     return {type:LOGININ,payload:data}
// }
// function registerSuc(data){
//     return{type:REG_SUC,payload:data}
// }
function errorMsg(msg){
    return {msg,type:ERR_MSG}
}
