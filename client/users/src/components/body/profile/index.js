import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Divider,
    Avatar,
    Tabs
    } from 'antd';
import {BodyStyle} from "../../style"

import Info from "./info"
import Encours from "./enCours"
import Lecture from "./lecture"
import LirePlusTard from "./lirePlusTard"
import Favorie from "./favorie"
import Model from './model'
import { connect } from "react-redux";
import {UserOutlined,PlusOutlined,MessageOutlined,InfoCircleOutlined,ClockCircleOutlined} from '@ant-design/icons';

import Actions from '../../../redux/actions'
import { getEnCours, getLectures, getLirePlusTard, getFavorites } from "../../../DAO/BooksDao";
const InfoModel =["Nom","Prénom","UserName","Email","Téléphone"]

const { TabPane } = Tabs;
const Profile =(props)=>{
    const TabsInfo =[
        {
            name : "mes infos" 
            ,icon: <InfoCircleOutlined/>,
            componenent:<Info/> 
        },
        {
            name : "En cours", 
            icon :<ClockCircleOutlined />, 
            componenent :<Model books = {props.enCours} title= {"j'ai en cous de lire.... "} link ={"/encours"}/>
        },
        {
            name : "favorites", 
            icon :<ClockCircleOutlined />, 
            componenent :<Model books = {props.favorites} title= {"mes favorie.... "} link ={"/Favorie"}/>
        },
        {
            name : "lectures", 
            icon :<ClockCircleOutlined />, 
            componenent :<Model books = {props.lectures} title= {"je ai lu... "} link ={"/Lecture"}  />
        },
        {
            name : "Lire plus Tard", 
            icon :<ClockCircleOutlined />, 
            componenent :<Model books = {props.lirePlusTard} title= {"je vais lire.... "} link ={"/LirePlusTard"}/>
        },
    
    ]
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    
    const [length ,setLength]=useState(0)
    useEffect(()=>{
        //pass limit
        //page = 1
        //searsh word = ""
        getEnCours(props,setLength)
        getLectures(props,setLength)
        getLirePlusTard(props,setLength)
        getFavorites(props,setLength)
    },[])
    
    return(
        <Row>
            <Top user = {props.user}/>
            <Divider/>
            <Tabs  type="card" style={{width:"100%"}}>
                {
                    TabsInfo.map((tab,index)=>{
                        return (
                            <TabPane tab={
                                <span>
                                  {tab.icon} 
                                  {tab.name}
                                </span>
                              } key={index+1}>
                                  {tab.componenent}   
                            </TabPane>
                        )
                    })
                }
               
            </Tabs>
        </Row>
    )
    
}
export const Top = (props)=>{

    return(
        <Col span={20} offset={2} style={{background:""}}>
                    <Divider style={{    margin: "0px 0"}} orientation="left" plain>
                            <Avatar size={120} icon={<UserOutlined />} src={props.user.picture.large} />
                            <div>
                                <h3>{`${props.user.name.last} ${props.user.name.first }`}</h3>
                            </div>
                    </Divider>
                </Col>
    )
}
const mapStore =(store)=>{
    const {FavoritesReducer,EnCoursReducer,LecturesReducer,LirePlusTardReducer,userManagementReduicer} = store
    return{
        favorites : FavoritesReducer,
        lirePlusTard : LirePlusTardReducer,
        lectures : LecturesReducer,
        enCours : EnCoursReducer,
        user:userManagementReduicer

    }
}

export default connect(mapStore,{...Actions}) (Profile)