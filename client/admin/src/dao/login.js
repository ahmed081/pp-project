import Axios from 'axios'
import url from "./backendInfo"
export const loginDao =(login,props)=>{
    
    const requestUrl = `${url}/login`
    console.log('url url : ' ,requestUrl)
    Axios.post(requestUrl,{...login}).then((res)=>{
            console.log("daz hna")
            const token = res.data.token
            props.setToken(token)
            props.loginAction()

        }).catch(err=>{
            console.log("madazch  hna" , err.request)
            console.log(err)
            
        })
}

