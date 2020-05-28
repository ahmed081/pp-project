import {AddMenuItem} from "./UIActions"
import {setTitle} from "./UIActions"
import {addBook,resetBook,booksLenght,bookCurrentPage,deleteBook} from "./bookActions"
import {addReader,resetReaders,readersLenght,readerCurrentPage,deleteReader} from "./readerActions"
import {loginAction,setToken} from "./loginAction"
export default {
    AddMenuItem,
    setTitle,
//books
    addBook,
    loginAction,
    setToken,
    resetBook,
    booksLenght,
    bookCurrentPage,
    deleteBook,
//readers
    addReader,
    resetReaders,
    readersLenght,
    readerCurrentPage,
    deleteReader
}