export const loginAction =()=>{
    return{
        type : "LOGIN"
    }
}
export const setToken =(token)=>{
    return{
        type : "SET_TOKEN",
        token : token
    }
}