import React, { useState, useEffect }  from "react"
import { getDefaultNormalizer } from "@testing-library/react"
import {
    Col,
    Row,
    Tabs,
    Button,
    Divider,
    Avatar
} from 'antd';
import {CheckOutlined,PlusOutlined,MessageOutlined,InfoCircleOutlined,ClockCircleOutlined} from '@ant-design/icons';
import Info from "./info";
import LastActivities from "./favorites";
import {Top} from '../body/profile'
import Actions from '../../redux/actions'
import { connect } from "react-redux";
import { getOne, addFriend } from "../../DAO/userDao";
import BookDoa from "../../DAO/BooksDao";

import { useParams } from "react-router-dom";
import Model from "../body/profile/model"
const { TabPane } = Tabs;
const TabsInfo =[
    {name : "info" ,icon: <InfoCircleOutlined/>,componenent:<Info/> },
    {name : "Dérnières activités ", icon :<ClockCircleOutlined />, componenent : <Model title= {"j'ai en cous de lire.... "} />},

]
const size =(span , offset=0)=>{
    return {span , offset}
}
const Friend = (props)=>{

    const [friend , setFriend]= useState(null)
    function callback(key) {
        console.log(key);
      }
    const {id}=useParams()
    useEffect(()=>{
       
        getOne(id, setFriend)
    },[])
    return(
        <div>
            {
                friend?
                <div>
                    <Row>
                        <Top user={friend}/>
                        <Col span={20} offset={2} style={{background:""}}>
                            <Row>
                                <AddFriend {...props} id ={id}/>
                            </Row>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                    <Tabs onChange={callback} type="card" style={{width:"100%"}}>
                        <TabPane tab={
                            <span>
                                Info
                            </span>
                            } key={1}>
                               info..........
                        </TabPane>
                        
                        <TabPane tab={
                            <span>
                                Activité
                            </span>
                            } key={2}>
                                <LastActivities friend={friend}/>
                        </TabPane>
                    </Tabs>
                    </Row>
                </div>
            :""
            }
            
            
        </div>
    )
}

const Message =(props)=>{
    return(
        <Col xl={{...size(2,1)}} md={{...size(3,1)}} sm={{...size(5,1)}} xs={{...size(8,1)}} >
            <Button type="ghost" icon={<MessageOutlined />}>
                Message
            </Button>
        </Col>
    )
}
export const AddFriend =(props)=>{
    const [isfriend, setFriend]=useState(false)
    const toggleFriend=()=>{
        
        addFriend({...props,isfriend,setFriend})
    }
    useEffect(()=>{
        if(props.user.friends.includes(props.id))
            setFriend(true)
        else setFriend(false)
        console.log("friendsss 1 ",props.user)
    },[])
    return(
        <Col xl={{...size(3,21)}} md={{...size(4,20)}} sm={{...size(5,19)}} xs={{...size(6,14)}}>
            <Button 
                type={isfriend?"primary":"ghost"} 
                icon={isfriend?<CheckOutlined />:<PlusOutlined />  }
                onClick={()=>toggleFriend()}
                >
                Suivre
            </Button>
        </Col>
    )
}
const mapStore =(store)=>{
    const {userManagementReduicer} = store
    return{
        
        user:userManagementReduicer

    }
}

export default connect(mapStore ,{...Actions}) (Friend)

