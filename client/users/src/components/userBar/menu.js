import React , {useState,useEffect} from "react"
import { Link,useLocation } from 'react-router-dom'


const Header =()=>{

    return (
      <div className="sidebarMenu"> 
        <Link to="/profile"> Voir Profile</Link>
        <Link to="/Lecture"> Mes lectures</Link>
        <Link to="/LirePlusTard"> à lire plus tard </Link>
        <Link to="/Favorie"> Mes favoris</Link>
        <Link to="/Amis"> Les amis</Link>
      </div>
 
      
       
    )
}
export default Header