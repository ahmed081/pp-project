export const addBook =(book)=>{
    return {
        type : "ADD_BOOK",
        book: book
    }
}
export const addFavories=(book)=>{
    return {
        type : "ADD_FAVORITE",
        book: book
    }
}
export const addLectures=(book)=>{
    return {
        type : "ADD_LECTURE",
        book: book
    }
}
export const addEnCours=(book)=>{
    return {
        type : "ADD_ENCOURS",
        book: book
    }
}
export const addLirePlusTard=(book)=>{
    return {
        type : "ADD_LIREPLUSTARD",
        book: book
    }
}
export const selectBook =(book)=>{
    return {
        type : "SELECT_BOOK",
        book: book
    }
}
export const resetFavorites =()=>{
    return {
        type : "RESET_FAVORITES",
    }
}
export const resetLirePlusTards =()=>{
    return {
        type : "RESET_LIREPLUSTARDS"
    }
}
export const resetLectures =()=>{
    return {
        type : "RESET_LECTURES",
    }
}
export const resetEnCours =()=>{
    return {
        type : "RESET_ENCOURS",
    }
}
export const resetBook =()=>{
    return {
        type : "RESET_BOOKS",
    }
}
export const booksLenght =(lenght)=>{
    return {
        type : "BOOKS_LENGHT",
        lenght: lenght
    }
}
export const bookCurrentPage =(page)=>{
    return {
        type : "BOOKS_PAGE",
        page: page
    }
}
export const deleteBook =(key)=>{
    return {
        type : "DELETE_BOOK",
        key: key
    }
}