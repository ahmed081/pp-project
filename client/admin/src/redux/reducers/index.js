import {MenuMagementReducer,MenuTitle} from './UIReducers'
import {BooksManagemntReducer,BooksLenghtReduicer,BooksPageReduicer} from './bookReduicers'
import {loginReduicer,TokenReduicer} from './loginReduicer'
import {ReadersManagemntReducer,ReadersLenghtReduicer,ReadersPageReduicer} from './readerReduicers'

const Reducers = {
    MenuMagementReducer,
    MenuTitle,
    
    loginReduicer,
    TokenReduicer,
//books
    BooksManagemntReducer,
    BooksLenghtReduicer,
    BooksPageReduicer,
//readers
    ReadersManagemntReducer,
    ReadersLenghtReduicer,
    ReadersPageReduicer
}



export default Reducers;