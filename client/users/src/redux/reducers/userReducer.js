export const userManagementReduicer =(state ={} , action)=>
{
    switch (action.type) {
        case "INIT_USER":
            return action.user
        case "TOGGLE_FRIEND":
            console.log('toggle friend')
            const index =state.friends.indexOf(action.id)
            if(index>=0)
                return{
                    ...state,
                    friends:[...state.friends.slice(0,index),...state.friends.slice(index+1,state.friends.length)]
                }
            else return {
                ...state,
                friends:[...state.friends,action.id]
            }
            
        default:
            return state
    }
}