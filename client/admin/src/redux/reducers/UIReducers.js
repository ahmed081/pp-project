import Const from '../../data/const'

export const MenuMagementReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_MENU_ITEM":
            return [...state,action.paylaod]
        default:
            return state
    }
}

export const MenuTitle =(state =Const.HOME_TITLE, action)=>
{
    
        switch (action.type) {
            case "SET_Header_TITLE":
                return action.paylaod.title
            default:
                return state
    
        }

}