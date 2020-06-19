import React, { useState, useEffect } from "react"
import { Row, Col, Input, Button, Checkbox } from "antd"
import { Link } from "react-router-dom"
import background from '../../images/background.jpg'
import actions from "../../redux/actions"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { login } from "../../DAO/login"
const Login =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    const authentification = ()=>{
        setloading(true)
        setTimeout(() => {
            login({username,password}).then(data=>{
                console.log(data)
                setloading(false)
                props.initUser(data.user)
                localStorage.setItem("JWTToken" , data.token)
                props.login()
            }).catch(err=>{
                setloading(false)
            })
            
        }, 0);
    }

    const [username,setUserame] = useState()
    const [password,setPassword]= useState()
    const [loading , setloading]=useState(false)
    useEffect(()=>{
        if(props.rememberMe && props.user.login){
            setUserame(props.user.login.username)
            setPassword(props.user.login.password)
            
            console.log('here')
        }
        console.log('here1' ,props.remmemberMe )
    },[])
    return (
        <div style={{height:"600px",background:"#1890ff6b" ,backgroundImage:"url("+background+")",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
            <Row>
                <Col span={24} style={{height:"100px"}}>
                </Col>
                <Col  xl={{...size(7,9)}} lg={{...size(8,8)}}  md={{...size(10,7)}} sm={{...size(12,6)}} xs={{...size(18,3)}} style={{background:"white",height:'400px',borderRadius:"30px"}}>
                    <Row>
                        <Col span={24}  style={{height:"auto",background:"transparent"}}>
                            <div style={{height:"60px",textAlign:'center',background:"transparent",fontSize:" 29px",fontFamily: "initial",fontWeight: "bold",marginTop:"40px"}} >login</div>
                        </Col>
                        <Col span={22} offset={1} style={{height:"auto",marginTop:10}}>
                            <Row gutter={[16,16]}>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input value={username} onChange={(event)=>setUserame(event.target.value)} style={{height:50,borderRadius:22}} placeholder="Username" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input value={password} onChange={(event)=>setPassword(event.target.value)} type="password" style={{height:50,borderRadius:22}} placeholder="Password" />
                                    </div>
                                </Col>
                                
                                <Col span={20} offset={2}>
                                    <div >
                                        
                                            <Button loading={loading} type="primary" onClick={()=>authentification()} style={{height:39,borderRadius:22, width:'100%'}} size={size}>
                                                SIGN IN
                                            </Button>
                                        
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Link to='/signup'>
                                            <Button type="ghost"   style={{height:39,borderRadius:22, width:'100%'}} size={size}>
                                                CREER UN COMPTE
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div style={{height:39,borderRadius:22, width:'100%',textAlign:"center",}} >
                                        <Link  size={size}>
                                            Mot de passe oublié
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                            
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
const mapStore =(store)=>{
    const {userManagementReduicer,loginReducer,rememberMeReducer} = store
    return {
        user: userManagementReduicer,
        Login:loginReducer,
        rememberMe:rememberMeReducer
    }
  
  }
  export default connect(mapStore,{...Actions}) (Login)