import React , {useState,useEffect} from "react"
import {
    Layout,
    Col,
    Row,
    Form,
    Input,
    Button,
    Divider,
    Empty,
    Avatar,
    Result
    } from 'antd';
import {BodyStyle,ContactUsStyle} from "../style"
import img from '../../images/backgroundImage.jpg'
import Profile from "./profile/index"
import Context from "./profile/Context"
import ContactUs from "./contactezNous/index";
import Books from "../books/index";
import Friend from "../friend";
import Lire from "./lire/lire";
import AllFriend from "../friend/AllFriend";
import { BrowserRouter, Route, Switch, Redirect, useLocation, Link } from "react-router-dom";
import Book from "../books/book";
import bookpage from "../books/bookpage";
import UserBarMenu from "../userBar/menu"
import logo from '../../images/logo.jpeg'
import Categorie from "../books/Categorie";
import Searsh from './searsh'
import { FacebookOutlined, InstagramOutlined, GoogleOutlined, CopyrightCircleOutlined } from "@ant-design/icons";
import Categories from './categories'

const { TextArea } = Input;
const { Header, Content,Footer} = Layout;

const Body =(props)=>{

    const location = useLocation()
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    useEffect(()=>{
        console.log("body =>",location.pathname)
    })
    return (
        <div style={BodyStyle.body}  onClick={()=>{props.setToggleMenu(false);props.setToggleProfile(false)}}>
            <Layout>
                <Header>
                    <Col xl={{...size(23)}} sm={{...size(0)}} xs={{...size(0)}}>Mylib</Col>

                </Header>
                <Content style={{minHeight:"400px"}}>
                        <Switch>
                            <Route path='/' exact render={() => <Redirect to="/books"/>}/>  
                            <Route path='/books' exact component={Books}/>
                            <Route path='/contactUs' exact component={ContactUs}/>    
                            <Route path='/LirePlusTard' exact render ={()=><Context size={8} context={"lireplustard"} title={"je vais lire ..."}/> }/>
                            <Route path='/Favorie' exact render ={()=><Context size={8} context={"favorite"} title={"Mes favoris"}/>}/>   
                            <Route path='/Lecture' exact render ={()=><Context size={8} context={"lectures"} title={"J'ai lu ....."}/>}/> 
                            <Route path ='/profile' exact component={Profile} />
                            <Route path ='/encours' exact render ={()=><Context size={8} context={"encours"} title={"je suis en cours de lire...."}/>}/> 
                            <Route  path='/books/categories' exact  component={Categories}/>
                            <Route  path='/books/categories/:id' exact  component={Categorie}/>
                            <Route path='/books/:id' exact  component={bookpage} />
                            <Route path='/amis/:id' exact  component={Friend} />
                            <Route path='/amis' exact  component={AllFriend} />
                            <Route path='/searsh/:id' exact  component={Searsh} />
                            <Route path='/lire' exact  render={() => <Redirect to="/books"/>} />
                            <Route path='/lire/:id' exact  component={Lire} />
                            <Route path='*' render={() => <Redirect to="/books"/>} />
                        </Switch>
                   
                </Content >
                <Footer>
                    
                    <div>
                        <center><CopyrightCircleOutlined /> copyright 2020 MyLib</center>
                    </div>
                </Footer>
            </Layout>
        </div>
    )
}




export default Body