import React,{useEffect} from 'react';
import Layout from './components/index/layout'
import Login from './components/login/login'
import Application from './components/login/application'
import {connect} from "react-redux"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

function App(props) {
  useEffect(() => {

    console.log("ppppppppppppppppppppppp ",props)
    }, [])
  return (
    <div className="App">
      <Router>
         
        {props.isLoging?<Layout/>:<Login/> }
    
           
          
        
      </Router> 
      
      
    </div>
  );
}
const mapStore =(state)=>{
  const {loginReduicer} = state;
  return {
  isLoging : loginReduicer
  }
}
export default connect(mapStore) (App);
