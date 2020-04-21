export const loginReduicer =(state=false, action)=>
{
    
        switch (action.type) {
            case "LOGIN":
                return !state
            default:
                return state
    
        }

}
export const TokenReduicer =(state="", action)=>
{
    
        switch (action.type) {
            case "SET_TOKEN":
                return action.token
            default:
                return state
    
        }

}