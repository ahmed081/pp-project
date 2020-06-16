import categories from "../data/categories.json"
import {getByCategories} from "./BooksDao"
import {uri} from "./config"
import Axios from "axios"
export const getCategories =async ()=>{
    const res = await Axios.get(`${uri}/book/categories`)
    return res.data
}