import React,{useEffect, useState} from 'react';
import './App.css';
import { Link,useLocation, Route, BrowserRouter as Router } from 'react-router-dom'

import {UserBarStyle} from './components/style'


import HeaderApp from './components/header/index'
import SideBarApp from './components/sidebar/index'
import Body from './components/body/index'
import UserBar from './components/userBar/index'
import { connect } from 'react-redux';
import Actions from './redux/actions'
import {getUser} from './DAO/userDao'
import Authentification from './components/login/';
import { checkLogin } from './DAO/login';
function App(props) {


  useEffect(()=>{
      
      console.log(localStorage.getItem("JWTToken"))
      if(localStorage.getItem("JWTToken"))
      {
          checkLogin({token:localStorage.getItem("JWTToken")}).then(data=>{
            props.login()
            props.initUser(data.user)
              console.log("login")
              setLoading(false)
          }).catch(err=>{
              setLoading(false)
              console.log("no login")
          })
          
        }else setLoading(false)
  },[])
  const [loding , setLoading]= useState(true)
  const login = props.Login
  return (
    <Router>
      {
        loding?<div>loading......</div>:
        <div>
            {
              login?<MyApp {...props}/>:
              <Authentification/>
            }
        </div>
      }
      
      
        
    </Router>
  );
}
const MyApp =(props)=>{
  const [toggleMenu , setToggleMenu] = useState(false)
  const [toggleProfile , setToggleProfile] = useState(false)
  return(
    <div>
      {Object.keys(props.user).length<=0?<div>wait</div>:
        <div>
            
            <HeaderApp toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleProfile={toggleProfile} setToggleProfile={setToggleProfile} />
            {
                toggleMenu
                  ?<SideBarApp/>
                  :""
            }
            {
                toggleProfile
                  ?<UserBar/>
                  :""
            }
            <Body setToggleMenu ={setToggleMenu} setToggleProfile ={setToggleProfile} />
        </div>
        }
    </div>
  )
}
const mapStore =(store)=>{
  const {userManagementReduicer,loginReducer} = store
  return {
      user: userManagementReduicer,
      Login:loginReducer
  }

}
export default connect(mapStore,{...Actions}) (App);

/*  */
