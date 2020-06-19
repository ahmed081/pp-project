import React, { useState, useEffect } from "react"
import { Descriptions, Col } from "antd"
import {BodyStyle} from "../style"
const Info =(props)=>{
    const [last,setLast]=useState()
    const [first,setFirst]=useState()
    const [date,setDate]=useState()
    const [email,setEmail]=useState()
    const [mobile,setMobile]=useState()
    const friend = props.user
    useEffect(()=>{
        setLast(friend.name.last)
        setFirst(friend.name.first)
        setDate(friend.dob.date)
        setEmail(friend.email)
        setMobile(friend.mobile)
    },[])
    
    return (
        <div>
                <Col span={20} offset={2} style={BodyStyle.LeftSide}>
                <Descriptions size="small" column={1} title="Les informations d'utilisateur">
                    <Descriptions.Item  label="Nom"><Item contexte='last' title={last}  /></Descriptions.Item>
                    <Descriptions.Item label="Prénom"><Item contexte='first'  title={first}/></Descriptions.Item>
                    <Descriptions.Item label="age"><Item contexte='date' title={date} /></Descriptions.Item>
                    <Descriptions.Item label="email"><Item contexte='email' title={email}  /></Descriptions.Item>
                    <Descriptions.Item label="mobile"><Item contexte='mobile' title={mobile} /></Descriptions.Item>
                    
                </Descriptions>
                
            </Col>
        </div>
    )
}
const Item  = (props)=>{
    
    return(
        <div>

            <div>{props.title}</div>

            
        </div>
    )
}
export default Info