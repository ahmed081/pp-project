import categories from "../data/categories.json"
import {getByCategories} from "./BooksDao"
import {uri} from "./config"
import Axios from "axios"
export const getCategories =async (props)=>{
    const res = await Axios.get(`${uri}/book/categories?cle=${props.cle}`)
    return res.data
}