
import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";

import BookManagement from "../books/booksManagement"
import UserManagement from "../readers/userManagement"
 /* import Home from "./Home"*/
import claimsManagement from "../claims/index" 
import App from '../../App'
import categorieManagement from '../categories/categorieManagement';
import Statistique from '../statistic/statistique';
class User extends React.Component { 
  render() {
    
    return (
        <div>
          <Switch>
            <Route path ='/' exact component={BookManagement}/>
            <Route path="/usersManagement"   component={UserManagement}/>
            <Route path="/claimsManagement"  component={claimsManagement}/>
            <Route path="/booksManagement" component={BookManagement}/>
            <Route path="/statistique" component={Statistique}/>
            <Route path="/categorieManagement" component={categorieManagement}/>
          </Switch>
            </div>

            
     
   
    );
}
}


export default User;