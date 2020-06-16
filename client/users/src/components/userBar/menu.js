import React , {useState,useEffect} from "react"
import { Link,useLocation } from 'react-router-dom'


const Header =()=>{

    return (
      <div className="sidebarMenu"> 
        <Link to="/profile"> Voir Profile</Link>
        <Link onClick={()=>window.location = `/Lecture`} > Mes lectures</Link>
        <Link onClick={()=>window.location = `/LirePlusTard`} > à lire plus tard </Link>
        <Link onClick={()=>window.location = `/Favorie`} > Mes favoris</Link>
        <Link onClick={()=>window.location = `/Amis`} > Les amis</Link>
      </div>
 
      
       
    )
}
export default Header