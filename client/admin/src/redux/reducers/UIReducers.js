export default function(state =[], action)
{
    switch (action.type) {
        case "ADD_MENU_ITEM":
            return [...state,action.paylaod]
            
    
        default:
            return state
    }
}