import Const from '../../data/const'

export const ReadersManagemntReducer =(state =[], action)=>
{
    switch (action.type) {
        case "ADD_READER":
            return [...state,action.reader]
        case "RESET_READERS":
            return []
        case "DELETE_READER":
            console.log("here deleted")
            return state.filter((reader)=>{
                    if(reader.key!==action.key) 
                        return reader
                })
        default:
            return state
    }
}
export const ReadersLenghtReduicer =(state =0, action)=>
{
    if(action.type === "READERS_LENGHT")
        return action.lenght
    else
        return state
}
export const ReadersPageReduicer =(state =0, action)=>
{
    if(action.type === "READERS_PAGE")
    {
        console.log(action.page)
        return action.page
    }
        
    else
        return state
}