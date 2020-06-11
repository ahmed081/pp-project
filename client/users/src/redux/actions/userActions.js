export const initUser =(user)=>{
    return {
        type:"INIT_USER",
        user :user
    }
}
export const toggleFriend=(id)=>{
    return {
        type:"TOGGLE_FRIEND",
        id :id
    }
}