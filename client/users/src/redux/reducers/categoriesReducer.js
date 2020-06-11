
export const CategoriesManagemntReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_CATEGORIE":
            console.log("inside book reduicer :",state)
            return [...state,action.categorie]
        case "RESET_CATEGORIE":
            return []
        default:
            return state
    }
}

export const selectCategorieReduicer =(state ={} , action)=>
{
    switch (action.type) {
        case "SELECT_CATEGORIE":
            return action.categorie

        default:
            return state
    }
}

export const CategorieLengthReduicer =(state ={} , action)=>
{
    switch (action.type) {
        case "CATEGORIES_LENGTH":
            return action.length

        default:
            return state
    }
}