import Const from '../../data/const'

export const BooksManagemntReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_BOOK":
            console.log("inside book reduicer :",state)
            return [...state,action.book]
        case "RESET_BOOKS":
            return []
        case "SET_BOOKS":
            return []
        case "DELETE_BOOK":
            return state.filter((book)=>{
                    if(book.key!==action.key) 
                        return book
                })
        default:
            return state
    }
}
export const BooksLenghtReduicer =(state =0, action)=>
{
    if(action.type === "BOOKS_LENGHT")
        return action.lenght
    else
        return state
}
export const BooksPageReduicer =(state =0, action)=>
{
    if(action.type === "BOOKS_PAGE")
    {
        console.log(action.page)
        return action.page
    }
        
    else
        return state
}