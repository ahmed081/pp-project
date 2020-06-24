import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
import { Row, Col } from 'antd'
import { BookOutlined, UserSwitchOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const {setTitle} = Actions


const ClaimManagement = (props)=>{
    useEffect(() => {

        console.log(props)
        props.setTitle(Const.CLAIMSUI_TITLE)
        }, [])
    return (
        <div>
            <div style={{padding:"26px 0px"}}>
                <h2>
                    <center>Les réclamations</center>
                </h2>
            </div>
            <Row gutter={[16,16]}>
                <Col span={8} style={{cursor:"pointer"}}>
                    <Link>
                        <div style={{boxShadow:"0px 0px 2px black", padding: '20px',width:'100%',height:"100%"}}>
                            <div style={{fontSize: "80px"}}>
                                <center>
                                    <BookOutlined />
                                </center>
                            </div>
                            <div>
                                <center>
                                    <h3>
                                        les réclamations des livres
                                    </h3>
                                        
                                </center> 
                            </div>
                        </div>
                    </Link>
                    
                </Col>
                <Col span={8} style={{}}>
                <Link>
                        <div style={{boxShadow:"0px 0px 2px black", padding: '20px',width:'100%',height:"100%"}}>
                            <div style={{fontSize: "80px"}}>
                                <center>
                                    <UserSwitchOutlined />
                                </center>
                            </div>
                            <div>
                                <center>
                                    <h3>
                                        les réclamations des Utilisateurs
                                    </h3>
                                        
                                </center> 
                            </div>
                        </div>
                    </Link>

                </Col>
                <Col span={8} style={{}}>
                    <Link>
                        <div style={{boxShadow:"0px 0px 2px black", padding: '20px',width:'100%',height:"100%"}}>
                            <div style={{fontSize: "80px"}}>
                                <center>
                                    <MailOutlined />
                                </center>
                            </div>
                            <div>
                                <center>
                                    <h3>
                                        Messages
                                    </h3>
                                        
                                </center> 
                            </div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}
const mapSotre =(store)=>{
    return store
}

export default connect(mapSotre,{setTitle}) (ClaimManagement);