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
import Model from './model'
import { connect } from "react-redux";
import {UserOutlined,PlusOutlined,MessageOutlined,InfoCircleOutlined,ClockCircleOutlined} from '@ant-design/icons';

import Actions from '../../../redux/actions'
import { getEnCours, getLectures, getLirePlusTard, getFavorites, getBasedContext } from "../../../DAO/BooksDao";
const InfoModel =["Nom","Prénom","UserName","Email","Téléphone"]
const reMake =(props)=>{
    
    const user = props.user;
    const books = props.data.docs.map(book=>{
        return {...book,
            link : "/Books/"+book._id,
            favorite:user.favorites.includes(book._id)?true:false,
            lirePlusTard:user.lireplustard.includes(book._id)?true:false,
            lecture:user.lectures.find(b=>book._id === b.id)?true:false,
        }
        
    })
    props.setBooks(books)
    console.log("ahmed : ",props.data)
}
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
    const [favoris,setFavoris]=useState([])
    const [lecture,setLecture]=useState([])
    const [enCours,setEnCours]=useState([])
    const [lirePlusTard,setLirePlusTard]=useState([])
    
    const [length ,setLength]=useState(0)
    useEffect(()=>{
        //pass limit
        //page = 1
        //searsh word = ""
        const initData = async ()=>{

            const user = props.user;
            let data = await getBasedContext({...props,page:0,size:4,cle:"",context:"lireplustard"})
            reMake({user,data,setBooks:setLirePlusTard})
            data = await getBasedContext({...props,page:0,size:4,cle:"",context:"favorite"})
            reMake({user,data,setBooks:setFavoris})
            data = await getBasedContext({...props,page:0,size:4,cle:"",context:"lectures"})
            reMake({user,data,setBooks:setLecture})
            data = await getBasedContext({...props,page:0,size:4,cle:"",context:"encours"})
            reMake({user,data,setBooks:setEnCours})
        }
        
        initData();

        //getFavorites(props,setLength)
    },[])
    
    return(
        <Row>
            <Top user = {props.user}/>
            <Divider/>
            <Tabs  type="card" style={{width:"100%"}}>
                <TabPane tab={
                    <span>
                        <InfoCircleOutlined/> 
                        mes infos
                    </span>
                    } key={1}>
                        <Info/>   
                </TabPane>

                <TabPane tab={
                    <span>
                        <InfoCircleOutlined/> 
                        enCours
                    </span>
                    } key={2}>
                        <Model books = {enCours} title= {"j'ai en cous de lire.... "} link ={"/encours"}/>
                </TabPane>      
                  
                <TabPane tab={
                    <span>
                        <InfoCircleOutlined/> 
                        favorites
                    </span>
                    } key={3}>
                        <Model books = {favoris} title= {"mes favorie.... "} link ={"/Favorie"}/>
                </TabPane> 

                <TabPane tab={
                    <span>
                        <InfoCircleOutlined/> 
                        lectures
                    </span>
                    } key={4}>
                       <Model books = {lecture} title= {"je ai lu... "} link ={"/Lecture"}  />
                </TabPane> 

                <TabPane tab={
                    <span>
                        <InfoCircleOutlined/> 
                        Lire plus Tard
                    </span>
                    } key={5}>
                        <Model books = {lirePlusTard} title= {"je vais lire.... "} link ={"/LirePlusTard"}/>
                </TabPane> 
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
    const {userManagementReduicer} = store
    return{
        
        user:userManagementReduicer

    }
}

export default connect(mapStore,{...Actions}) (Profile)