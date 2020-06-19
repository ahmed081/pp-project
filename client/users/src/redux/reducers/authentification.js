import { tuple } from "antd/lib/_util/type"

export const  loginReducer =(state =false,action)=>
{
    if(action.type === "LOGIN")
        return !state
    else return state
}
export const  rememberMeReducer =(state =true,action)=>
{
    if(action.type === "REMEMBERME")
        return !state
    else return state
}