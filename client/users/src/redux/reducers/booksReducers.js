
export const BooksManagemntReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_BOOK":    
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
export const  BooksLengthReducer =(state = 0,action)=>
{
    if(action.type === "BOOKS_LENGHT")
        return action.lenght
    else return state
}
export const FavoritesReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_FAVORITE":
            console.log("inside FavoritesReducer :",state)
            return [...state,action.book]
        case "RESET_FAVORITES":
            return []
        default:
                return state
    }
}
export const LecturesReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_LECTURE":
            console.log("inside LecturesReducer :",state)
            return [...state,action.book]
        case "RESET_LECTURES":
            return []
        default:
            return state
    }
}
export const EnCoursReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_ENCOURS":
            console.log("inside EnCoursReducer :",state)
            return [...state,action.book]
        case "RESET_ENCOURS":
            return []
        default:
            return state
    }
}
export const LirePlusTardReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_LIREPLUSTARD":
            console.log("inside LirePlusTardReducer :",state)
            return [...state,action.book]
        case "RESET_LIREPLUSTARDS":
            return []
        default:
            return state
    }
}

export const selectBookReduicer =(state ={} , action)=>
{
    switch (action.type) {
        case "SELECT_BOOK":
            return action.book

        default:
            return state
    }
}