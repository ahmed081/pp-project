import React,{useState,useEffect, useParams} from 'react'
import { useLocation} from "react-router";
import {  Menu,Layout, Select  } from 'antd';
import {
  UsergroupAddOutlined ,
  BookOutlined ,
  CarryOutOutlined

  } from '@ant-design/icons';
  import { Link } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';

const {Sider } = Layout;
const { SubMenu } = Menu;
const pathItems = window.location.href.split('/')
const locationItem = window.location.href.split('/')[pathItems.length-1]

  const menuItems =[
    
    {
        key:"gu",
        title : "gestion des utilisateurs",
        icon : UsergroupAddOutlined,
        route : "usersManagement",
    },
    {
        key:"gl",
        title : "gestion des livres",
        icon : BookOutlined,
        route : "booksManagement",
    }
    ,
    {
        key:"gr",
        title : "gestion des réclamation",
        icon : CarryOutOutlined ,
        route : "claimsManagement",
    },
    
]  
  
const Test =()=>{
    const [collapsed,setCollapsed] =useState(false)
    const [items,setItem] =useState([])
    let select =menuItems.filter(item=>item.route == locationItem )[0]
    select = select?select.key:null
    useEffect(() => {
        setItem([...
            menuItems.map(item =>{
                return (
                    <Menu.Item  component={item.Link} key={item.key}>
                        
                            <item.icon />
                            <Link to={item.route}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            })
        ])
      }, [])
    const onCollapse = collapses => {
      //seclect.key||
      //console.log(seclect?seclect.key:null)

      setCollapsed( collapses );
    };
    return(
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" style={{height: 64}} />
          <Menu theme="dark" defaultSelectedKeys={[select]} mode="inline">
            {items}
            
          </Menu>
        </Sider>
    )
}

export default Test;