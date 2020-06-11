import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Divider,
    Avatar
    } from 'antd';
import {UserOutlined } from '@ant-design/icons';
import {BodyStyle} from "../../style"
import { connect } from "react-redux";
const InfoModel =["Nom","Prénom","UserName","Email","Téléphone"]


const Info =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    
    const user = props.user;
    
    return(
        <Col xl={{...size(10)}} md={{...size(10)}} sm={{...size(24)}} xs={{...size(24)}} style={BodyStyle.LeftSide}>
                <div style={{borderRight: "1px solid #0000001f",}}>

                
                <Divider plain>
                    <Avatar size={100} src={user.picture.large} />

                </Divider>
                </div>
                <InfiDetail user ={props.user}/>
        </Col>
    )
}

const InfiDetail  = (props)=>{
    const user = props.user
    const fillterInfo=[user.name.last , user.name.first,user.login.username,user.email,user.mobile]

    return(
        <div>
            {
                InfoModel.map((info,index) =>{
                    return(
                        <Row style={{padding: "10px 13px"}}>
                            <Col span={9} style={{padding: "0px 30px"}}>
                                {info}
                            </Col>
                            <Col span={6} style={{textAlign: "center"}}>:</Col>
                            <Col span={9} >{fillterInfo[index]}</Col>
                        </Row>
                    )
                })
            }
        </div>
    )
}
const mapStore = (store)=>{
    const {userManagementReduicer} =store
    return {
      user : userManagementReduicer
    }
  }
export default connect(mapStore) (Info)