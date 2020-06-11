import React from "react"
import { Row, Col, Input, Button, Checkbox } from "antd"
import { Link } from "react-router-dom"
import background from '../../images/background.jpg'
const SignUp =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    return (
        <div style={{height:"100%",background:"#1890ff6b" ,backgroundImage:"url("+background+")",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
            <Row>
                <Col span={24} style={{height:"50px"}}>
                </Col>
                <Col  xl={{...size(7,8)}} lg={{...size(8,8)}}  md={{...size(10,7)}} sm={{...size(12,6)}} xs={{...size(18,3)}} style={{background:"white",height:'auto',borderRadius:"30px",paddingBottom:10}}>
                    <Row>
                        <Col span={24}  style={{height:"auto",background:"transparent"}}>
                            <div style={{height:"60px",textAlign:'center',background:"transparent",fontSize:" 29px",fontFamily: "initial",fontWeight: "bold",marginTop:"40px"}} >Sign Up</div>
                        </Col>
                        <Col span={22} offset={1} style={{height:"auto",marginTop:10}}>
                            <Row gutter={[16,16]}>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input style={{height:40,borderRadius:22}} placeholder="Nom" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input style={{height:40,borderRadius:22}} placeholder="Prénom" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input style={{height:40,borderRadius:22}} placeholder="Email" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Input type="password" style={{height:40,borderRadius:22}} placeholder="Password" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    
                                    <div >
                                        <Input type="password" style={{height:40,borderRadius:22}} placeholder="Comfirm Password" />
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                    <Checkbox></Checkbox>
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                    <Button type="primary" style={{height:39,borderRadius:22, width:'100%'}} size={size}>
                                        CREER COMPTE
                                    </Button>
                                    </div>
                                </Col>
                                <Col span={20} offset={2}>
                                    <div >
                                        <Button type="ghost"  style={{height:39,borderRadius:22, width:'100%'}} size={size}>
                                            LOGIN
                                        </Button>
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
export default SignUp