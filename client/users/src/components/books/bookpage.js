import React, { useEffect, useState } from 'react'
import Book from './book'
import Actions from "../../redux/actions"
import {
    Avatar ,
    Divider,
    Row,
    Col,
    Card,
    Rate,
    Button,
    Tooltip,
    Tabs 

    } from 'antd';

import {ClockCircleOutlined,StarOutlined,ReadOutlined} from '@ant-design/icons';
import {image} from "../../data"
import Categorie from './categories';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOne, toggleFavorite,toggleLirePlusTard } from '../../DAO/BooksDao';
const { TabPane } = Tabs;
const Left = (props)=>{
    const book = props.book
    useEffect(()=>{
        console.log("book book => ",book)
    },[])
    return(
        <div>
            <div>
                
                <Card
                    hoverable
                    style={{ width: "100%" }}
                    cover={<img alt={book.title} src={book.image} />}
                >
                    <Card.Meta 
                        title={book.title}
                        description={<div><Rate  defaultValue={book.rate} /></div>} />
                </Card>
                
            </div>
            
        </div>
    )
}
const BookInfos =(props)=>{
    const book = props.book
    const infos= ["ISBN","page","authors","Subject","langauge"]
    return (
        <div>
        <div>
            <Divider orientation="center" >
                
            </Divider>
        </div>
        <div>
            
        </div>
        {Object.keys(book).map((index,key) =>{

            if(infos.includes(index))
            {
                return(
                    <Row gutter={16,16} key={key}>
                        <Col  span={8} offset={1}>
                            <div style={{textAlign:"right"}} >{index}</div>
                        </Col>
                        <Col span={2} offset={1}>
                            <div style={{textAlign:"center"}}>:</div>
                        </Col>
                        <Col  span={8} offset={1} >
                            {
                                typeof(book[index]) === "object"?
                                    <div>{Object.values(book[index]).join(" , ")}</div>:
                                    <div>{book[index]}</div>
                            }
                                    
                            
                        </Col>
                    </Row>
                )
            }
            else return null
        })}
        
        </div>
    )
}
const Description =({description})=>{
    return (
        <div>
            <div>
                <Divider orientation="center" >
                    <h2>Description</h2>
                </Divider>
            </div>
            <div>
                {description}
            </div>
        </div>
    )
}
const Avie =(props)=>{

    return (
        <div>
            <div>
                <Divider orientation="center" >
                    <h2>avis</h2>
                </Divider>
            </div>
            <div>
                les avies
            </div>
        </div>
    )
}
const Buttons =(props)=>{
    const [favorite,setfavorite] = useState(false)
    const [lirePlusTard,setLirePlustard]=useState(false)
    useEffect(()=>{
        console.log("buttons => ",props.book)
        setfavorite(props.book.favorite)
        setLirePlustard(props.book.lirePlusTard)
    },[])
    
    const book = props.book
    return(
        <div className="book-page-icon">
            <div>
                <Tooltip placement="right" title="Lire plus tard">
                    <Button 
                        type={lirePlusTard?"primary":"default"} 
                        onClick={()=>toggleLirePlusTard(props,setLirePlustard,lirePlusTard)} 
                        shape="circle" icon={<ClockCircleOutlined />} 
                        size="large" />
                </Tooltip>
            </div>
            <div>
                <Tooltip placement="right" title="ajouter au favorie">
                        <Button 
                            type={favorite?"primary":"default"} 
                            onClick={()=>toggleFavorite(props,setfavorite,favorite)} 
                            icon={<StarOutlined />} 
                            size="large" />  
                </Tooltip>
                    </div>
            <div>
                <Tooltip placement="right" title="Lire">
                    <Button type="ghost " shape="circle" icon={<ReadOutlined />} size="large" />  
                </Tooltip>
                    </div>
        </div>
    )
}
const Title =({title})=>{
    return(
        <div style={{textAlign: "center"}}>
             <h1>{title}</h1>
        </div>
    )
}
const BookPage =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    
    const {id} = useParams()
    let book = props.books.find(book => book._id==id)
    useEffect(()=>{
        props.selectBook({})
        getOne(props,id)
        
    },[])
    return(
        <div>
            
            {Object.entries(props.book).length <= 0? <div>wait</div>:
            <Row >
                
                <Col  span ={24}>
                    <Row gutter={[8, 8]}>
                        <Col  xl={{...size(7,1)}} lg={{...size(7,1)}} md={{...size(9,1)}} xs={{...size(20,1)}} xs={{...size(20,1)}}  >
                            <Left book ={props.book}/>
                        </Col>
                        <Col xl={{...size(2)}} lg={{...size(2)}} md={{...size(2)}} sm={{...size(2)}} xs={{...size(1)}}>
                                <Buttons {...props} />
                        </Col>
                        <Col style={{background:""}} xl={{...size(14)}} lg={{...size(14)}} md={{...size(11 )}} sm={{...size(22,1)}} xs={{...size(22,1)}}>
                            <Tabs type="card">
                                <TabPane tab="à props" key="1">
                                    <Title title ={props.book.title}/>
                                    <BookInfos book = {props.book}/>
                                    <Description description={props.book.description} />
                                </TabPane>   
                                <TabPane tab="avis" key="2">
                                    <Avie/>
                                </TabPane>  
                            </Tabs>
                                
                                
                                
                        </Col>
                </Row>
              </Col>
            </Row>
            }
        </div>
        
    )
}
const mapStore =(store)=>{
    const {
        BooksManagemntReducer,
        selectBookReduicer,
        userManagementReduicer
    
    } = store
    return {
        book : selectBookReduicer,
        books : BooksManagemntReducer,
        user:userManagementReduicer

    }
}
export default connect(mapStore , {...Actions}) (BookPage)