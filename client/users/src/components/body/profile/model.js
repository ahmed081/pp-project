import React , {useState,useEffect} from "react"
import {
    Divider, Row, Col, Card, Tooltip, Empty,
    } from 'antd';

import { Link } from "react-router-dom";

const size =(span , offset=0)=>{
    return {span , offset}
}
const Model =(props)=>{
    const [loading , setLoading]=useState(true)
    useEffect(()=>{

    },[])
    const books = props.books
    const title = props.title
    const link= props.link
    const length = props.length
    return(
        <div>
            
            
            <div>
            {
                books.length<=0 ?<Empty/>:
                <Row gutter={[8,24]}>
                    {
                        books.map((book,index)=>{
                            return(
                                <Tooltip title={book.title} placement="bottom" >
                                    
                                    <Col xl={{...size(5,1)}} lg={{...size(5,1)}} md={{...size(7,1)}} sm={{...size(11,1)}} xs={{...size(11,1)}}>
                                        <Link to={book.link}>
                                            <Card
                                                hoverable
                                                style={{ width: "100%" }}
                                                cover={<img alt={book.title} src={book.image} />}
                                            >
                                                <Card.Meta  title={book.title} />
                                            </Card>
                                        </Link>
                                    </Col>
                                    
                                </Tooltip>
                            )
                            
                            
                        })
                    }
                    
                </Row>
            
            }
            {
                link?
                        <div style={{float:"right"}} >
                            <Link to={link}>Plus...</Link>
                        </div>
                    :
                    ""
            }
            </div>
        </div>
        
    )
}

export default Model
