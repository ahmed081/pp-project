import categories from "../data/categories.json"
import {getByCategories} from "./BooksDao"

export const getCategories =(props)=>{
    console.log(categories.count)
    const length = categories.count
    const categoriesArray = categories.categories
    props.resetCategories()
    categoriesArray.map(categorie=>{
        console.log("cat => ",categorie)
        props.addCategorie(categorie)
    })
    props.CategoriesLenght(length) 
}