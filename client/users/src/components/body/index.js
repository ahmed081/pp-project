import React , {useState,useEffect} from "react"
import {
    Layout,
    Col,
    Row,
    Form,
    Input,
    Button,
    Divider
    } from 'antd';
import {BodyStyle,ContactUsStyle} from "../style"
import img from '../../images/backgroundImage.jpg'
import Profile from "./profile/index"
import Lecture from "./profile/lecture"
import LirePlusTard from "./profile/lirePlusTard"
import Favorie from "./profile/favorie"
import Encours from "./profile/enCours"
import ContactUs from "./contactezNous/index";
import Books from "../books/index";
import Friend from "../friend";
import Lire from "./lire/lire";
import AllFriend from "../friend/AllFriend";
import { BrowserRouter, Route, Switch, Redirect, useLocation } from "react-router-dom";
import Book from "../books/book";
import bookpage from "../books/bookpage";
const { TextArea } = Input;
const { Header, Content} = Layout;
const Categories =[
    {name:"Arts & Entertainment" , nbr: 50},
    {name:"Humor" , nbr: 50},
    {name:"Business " , nbr: 50},
    {name:"College" , nbr: 50},
    {name:"Language Learning" , nbr: 50}]
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
                <Content>
                        <Switch>
                            <Route path='/' exact render={() => <Redirect to="/books"/>}/>  
                            <Route path='/books' exact component={Books}/>
                            <Route path='/contactUs' exact component={ContactUs}/>    
                            <Route path='/LirePlusTard' exact component={LirePlusTard}/>   
                            <Route path='/Favorie' exact component={Favorie}/>   
                            <Route path='/Lecture' exact component={Lecture}/> 
                            <Route path ='/profile' exact component={Profile} />
                            <Route path ='/encours' exact component={Encours} />
                            <Route path='/books/:id' exact  component={bookpage} />
                            <Route path='/amis/:id' exact  component={Friend} />
                            <Route path='/amis' exact  component={AllFriend} />
                            <Route path='/lire' exact  render={() => <Redirect to="/books"/>} />
                            <Route path='/lire/:id' exact  component={Lire} />
                        </Switch>
                   
                </Content>
            </Layout>
        </div>
    )
}




export default Body