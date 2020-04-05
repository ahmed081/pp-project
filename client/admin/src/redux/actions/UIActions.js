export const AddMenuItem=(key,title,icon,route)=>{
    return {
        type: 'ADD_MENU_ITEM',
        paylaod :{
            title:title,
            icon:icon,
            route:route,
            key:key
        }
    }
}