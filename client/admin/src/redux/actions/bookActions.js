export const addBook =(book)=>{
    return {
        type : "ADD_BOOK",
        book: book
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