const ADD_GUN="加";
const REMOVE_GUN="减";
export function counter(state=0,action){
    switch(action.type){
        case "加":
        return state+1; 
        case "减":
        return state-1;
        default:
        return 10;
    }
}
//action createor
export function add(){
    return{type:ADD_GUN}
}
export function remove(){
    return {type:REMOVE_GUN}
}
export function sadd(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(add());
        },0)
    }
}