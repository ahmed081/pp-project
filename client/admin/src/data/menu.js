import {
    UsergroupAddOutlined ,
    BookOutlined ,
    CarryOutOutlined,
    SnippetsOutlined,
    AreaChartOutlined
  
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
    {
        key:"gc",
        title : "gestion des catégories",
        icon : SnippetsOutlined ,
        route : "categorieManagement",
    },
    {
        key:"s",
        title : "statistique",
        icon : AreaChartOutlined ,
        route : "statistique",
    },
    
] 