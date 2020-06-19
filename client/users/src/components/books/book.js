import React , {useState,useEffect} from "react"
import {
    Layout,
    Col,
    Rate ,
    Input,
    Card 
    } from 'antd';
import img from '../../images/backgroundImage.jpg'
import {image} from "../../data"
import { Link } from "react-router-dom";
const { Meta } = Card;

const Book =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    const book = props.book
    useEffect(()=>{
        console.log("rating ",book.rating.rate)
    },[])
    return (
        
        <Col style={{}} xl={{...size(6)}} lg={{...size(6)}} md={{...size(8)}} sm={{...size(12)}} xs={{...size(12)}}  >
                <Link to={book.link}>
                <Card
                    hoverable
                    style={{ width: "100%", }}
                    cover={< img  height='300px' alt={book.title} src={book.image} />}
                >
                <Meta 
                    title={book.title}
                    description={<div>
                        <div style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} >{book.description}</div>
                        <Rate style={{width:"100%"}} disabled defaultValue={book.rating.rate} /></div>} />
            </Card>
            </Link>                         
        </Col>
    )
}




export default Book