import React , {useState,useEffect} from "react"
import { Link,useLocation } from 'react-router-dom'
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { LogoutOutlined } from "@ant-design/icons"


const Header =(props)=>{

    return (
      <div className="sidebarMenu"> 
        <Link to="/profile"> Voir Profile</Link>
        <Link onClick={()=>window.location = `/Lecture`} > Mes lectures</Link>
        <Link onClick={()=>window.location = `/LirePlusTard`} > à lire plus tard </Link>
        <Link onClick={()=>window.location = `/Favorie`} > Mes favoris</Link>
        <Link to='/amis' > Les amis</Link>
        <Link to="/abonnement"> abonnement</Link>
        <center>
          <Link onClick={()=>{
            props.login()
            props.initUser({})
            localStorage.removeItem("JWTToken")
            window.location ='/'
          }
          }  > <LogoutOutlined /> déconnexion</Link>
        </center>
      </div>
 
      
       
    )
}
const mapStore =(store)=>{
  const {loginReducer} = store
  return {
      Login:loginReducer
  }

}
export default connect(mapStore,{...Actions}) (Header)