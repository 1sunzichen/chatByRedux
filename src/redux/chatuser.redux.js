import Axios from 'axios';
const UL="USER_LIST";
const initState={
    userlists:[]
}
function userlist(data){
   // console.log(data);
    
    return {type:UL,payload:data}

}
export function chatuser(state=initState,action){
    switch(action.type){
        case UL:
        console.log(action.payload);
        return {...state,userlists:action.payload}
        default:
        return state;
    }
}
export function getUserList(type){
    return dispatch=>{
        Axios.get('/user/list?type='+type)
        .then(
            res=>{
                if(res.data.code==0){
                    
                    dispatch(userlist(res.data.data))
                    
                    
                }
            }
        )
    }
}
