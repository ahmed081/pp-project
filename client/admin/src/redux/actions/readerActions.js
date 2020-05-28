export const addReader =(reader)=>{
    return {
        type : "ADD_READER",
        reader: reader
    }
}
export const resetReaders =()=>{
    return {
        type : "RESET_READERS",
    }
}
export const readersLenght =(lenght)=>{
    return {
        type : "READERS_LENGHT",
        lenght: lenght
    }
}
export const readerCurrentPage =(page)=>{
    return {
        type : "READERS_PAGE",
        page: page
    }
}
export const deleteReader =(key)=>{
    return {
        type : "DELETE_READER",
        key: key
    }
}