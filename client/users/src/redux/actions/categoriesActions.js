export const addCategorie =(categorie)=>{
    return {
        type : "ADD_CATEGORIE",
        categorie: categorie
    }
}
export const selectCategorie=(categorie)=>{
    return {
        type : "SELECT_CATEGORIE",
        categorie: categorie
    }
}
export const resetCategories =()=>{
    return {
        type : "RESET_CATEGORIE",
    }
}
export const CategoriesLenght =(length)=>{
    return {
        type : "CATEGORIES_LENGTH",
        length: length
    }
}

