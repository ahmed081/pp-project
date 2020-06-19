import React , {useState,useEffect} from "react"
import { Link,useLocation } from 'react-router-dom'
import {SideBarStyle} from '../style'
import { 
  Divider,
  Avatar,
  } from 'antd';
import {UserOutlined } from '@ant-design/icons';

const Menu =()=>{

    return (
      <div className="sidebarMenu"> 
        <Link to="/books">Tous les livres</Link>
        <Link to= "/books/categories">categories</Link>
        <Link to="/profile"> A propos MyLib</Link>
        <Link to="/contactUs">  Contacter Nous</Link>
        
      </div>
 
      
       
    )
}
export default Menu