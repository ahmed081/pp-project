import {
    UsergroupAddOutlined ,
    BookOutlined ,
    CarryOutOutlined
  
    } from '@ant-design/icons';

export const menuItems =[
    
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