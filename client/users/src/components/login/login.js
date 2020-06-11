import React from "react"
import { Row, Col, Input, Button } from "antd"
import { Link } from "react-router-dom"
import background from '../../images/background.jpg'
const Login =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    return (
        <div style={{height:"100%",background:"#1890ff6b" ,backgroundImage:"url("+background+")",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
            <Row>
                <Col span={24} style={{height:"100px"}}>
                </Col>
                <Col  xl={{...size(7,8)}} lg={{...size(8,8)}}  md={{...size(10,7)}} sm={{...size(12,6)}} xs={{...size(18,3)}} style={{background:"white",height:'410px',borderRadius:"30px"}}>
                    <Row>
                        <Col span={24}  style={{height:"auto",background:"transparent"}}>
                            <div style={{height:"60px",textAlign:'center',background:"transparent",fontSize:" 29px",fontFamily: "initial",fontWeight: "bold",marginTop:"40px"}} >login</div>
                        </Col>
                        <Col span={22} offset={1} style={{height:"auto",marginTop:10}}>
                            <Row gutter={[16,16]}>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input style={{height:50,borderRadius:22}} placeholder="Email or username" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input type="password" style={{height:50,borderRadius:22}} placeholder="Password" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                    <Button type="primary" style={{height:39,borderRadius:22, width:'100%'}} size={size}>
                                        SIGN IN
                                    </Button>
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Button type="ghost"  style={{height:39,borderRadius:22, width:'100%'}} size={size}>
                                            CREER UN COMPTE
                                        </Button>
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
export default Login