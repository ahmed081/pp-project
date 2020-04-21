import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
import {Button} from 'antd'
import { Link,useLocation } from 'react-router-dom';
import Axios from 'axios'
import {loginDao} from '../../dao/login'
const {loginAction,setToken} = Actions


const Login = (props)=>{
    useEffect(() => {

        }, [])
    const login =()=>{
        const login ={
            userName : "ahmed",
            password: "123456789a-e"
        }
         loginDao(login ,props)
        /*Axios.post('http://localhost:3030/login',{...login}).then((res)=>{
            const token = res.data.token
            props.setToken(token)
            props.loginAction()

        }).catch(err=>{
            console.log(err)
            
        }) */
       // props.loginAction()
    }
    return (
        <div>
            <div>Login Page</div>
            <Button type="dashed" onClick={login} >  
            
             <Link to='/' >Login</Link>
            
            </Button>
        </div>
    )
}
const mapSotre =(store)=>{
    return store
}

export default connect(null,{loginAction,setToken}) (Login);