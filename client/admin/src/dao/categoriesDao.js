import categories from "../data/categories.json"

export const getCategorie=(props)=>{
    const cats = Object.keys(categories).map(categorie=>{
        return{
            categorie,nbr:categories[categorie]
        }
    })
    return cats
}