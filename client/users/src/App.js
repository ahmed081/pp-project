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
import Login from './components/login/login';
import SignUp from './components/login/SignUp';
function App(props) {

  const [toggleMenu , setToggleMenu] = useState(false)
  const [toggleProfile , setToggleProfile] = useState(false)
  useEffect(()=>{
    setTimeout(() => {
      getUser(props)
    }, 0);
    
    console.log("from App user => ",props.user)
  },[])
  return (
    <Router>
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
    </Router>
  );
}
const mapStore =(store)=>{
  const {userManagementReduicer} = store
  return {
      user: userManagementReduicer
  }

}
export default connect(mapStore,{...Actions}) (App);

/*  */
