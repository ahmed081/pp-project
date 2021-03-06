import {BooksManagemntReducer,BooksLengthReducer,selectBookReduicer,FavoritesReducer,LecturesReducer,EnCoursReducer,LirePlusTardReducer} from './booksReducers'
import {CategorieLengthReduicer, selectCategorieReduicer,CategoriesManagemntReducer} from "./categoriesReducer"
import {userManagementReduicer} from "./userReducer"
import {loginReducer,rememberMeReducer} from "./authentification"


export default {
    BooksLengthReducer,BooksManagemntReducer,selectBookReduicer,FavoritesReducer,LecturesReducer,EnCoursReducer,LirePlusTardReducer,
    CategorieLengthReduicer, selectCategorieReduicer,CategoriesManagemntReducer,
    userManagementReduicer,
    loginReducer,rememberMeReducer
}