import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Avatar, Descriptions, Divider, Card } from 'antd'
import { getCategories } from '../../../DAO/categorieDao'
import { Link } from 'react-router-dom'

const Categorie =(props)=>{
    const [searchValue,setsearchValue]=useState("")
    const [categories,setCategories]=useState({})
    const searsh =async(value)=>{
        setsearchValue(value)
        getCategories({cle:value}).then(data=>{
            setCategories(data)
        })
    }
    useEffect(()=>{
        getCategories({cle:""}).then(data=>{
            setCategories(data)
        })
    },[])
    return(
        <div>
            <div style={{padding: "14px 7px"}}>
                <Input.Search
                    value ={searchValue}
                    placeholder="search text"
                    onChange={(event)=>{searsh(event.target.value)}}
                    onSearch={value => searsh(value)}
                    style={{ width: 320 }}
                />
                
            </div>
            <Row>
                {
                    Object.keys(categories).map(categorie=>{
                        return(<Col span={8}>
                            <Link to={`/books/categories/${categorie}`}>
                                
                                    <Row >
                                        <Col span={24} >
                                            <center >
                                            <Avatar size={100} style={{ backgroundColor: "orange", verticalAlign: 'middle' }}>
                                                {categories[categorie]}
                                            </Avatar>
                                            </center>
                                            
                                        </Col>
                                        <Col span={24}>
                                            <center>
                                                <h4>{categorie}</h4>
                                            </center>
                                        </Col>
                                    </Row>
                                
                            </Link>
                            </Col>
                        )
                    })
                }
                
            </Row>
        </div>
    )
}
export default Categorie