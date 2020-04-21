import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {  Menu,Layout, Select  } from 'antd';
import {
  UsergroupAddOutlined ,
  BookOutlined ,
  CarryOutOutlined

  } from '@ant-design/icons';
  import { Link,useLocation } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';

const {Sider } = Layout;
const { SubMenu } = Menu;


  
const MyMenu =(props)=>{
    
    const [collapsed,setCollapsed] =useState(false)
    let location = useLocation().pathname.split('/')[1]
    const item =props.menuItems.filter(item=>item.item.route == location )[0]
    const select = item?item.item.key:null
    
 
    const onCollapse = collapses => {
       setCollapsed( collapses );
    };
    return(
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" style={{height: 64}} />
          <Menu theme="dark" defaultSelectedKeys={[select]} mode="inline">
            {props.menuItems.map(item =>{
              item = item.item
                return (
                  
                     <Menu.Item  component={item.Link} key={item.key}>
                        
                            <item.icon />
                            <Link to={`/${item.route}`}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item> 
                )
            })
        }
            
          </Menu>
        </Sider>
    )
}
const mapState =(state)=>{
  const {MenuMagementReducer} = state

  return {
    menuItems : MenuMagementReducer
  }
}

export default connect(mapState)(MyMenu)

