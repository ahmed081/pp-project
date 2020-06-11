import {addBook,resetBook,selectBook,booksLenght,bookCurrentPage,deleteBook,addFavories,addLectures,addEnCours,addLirePlusTard} from "./booksActions"
import {addCategorie,selectCategorie,resetCategories,CategoriesLenght}from './categoriesActions'
import {resetFavorites,resetLirePlusTards,resetLectures,resetEnCours} from './booksActions'
import {initUser,toggleFriend} from './userActions'

export default {
    selectBook,addBook,resetBook,booksLenght,bookCurrentPage,deleteBook,addFavories,addLectures,addEnCours,addLirePlusTard,
    resetFavorites,resetLirePlusTards,resetLectures,resetEnCours,
    
    addCategorie,selectCategorie,resetCategories,CategoriesLenght,
    initUser,toggleFriend
}