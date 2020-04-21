export const AddMenuItem=(item)=>{
    return {
        type: 'ADD_MENU_ITEM',
        paylaod :{
            item:item
        }
    }
}
export const setTitle = title =>{
    return {
        type:'SET_Header_TITLE',
        paylaod :{
            title:title
        }
    }
}

