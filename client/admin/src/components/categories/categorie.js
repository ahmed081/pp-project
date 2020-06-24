import React,{useState,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import {connect} from "react-redux"


import BooksDao from '../../dao/booksDao'
import { Button, Steps, Input, Row, Col } from 'antd'
import Book from '../books/book'
const Cat =()=>{
    return (
        <div>
            <div style={{padding:"75px 0px"}} >
                    <Row>
                        <Col span={4} style={{}}>
                            <center>
                                <h4>Entrer la categorie :</h4>
                            </center>
                        </Col>
                        <Col offset={1} span={10} >
                            <Input/>
                        </Col>
                    </Row>
                    
                
            </div>
            
        </div>
    )
}
const Categorie = (props)=>{
    const steps = [
        {
          title: 'categorie à ajouter',
          content: <Cat/>,
        },
        {
          title: 'ajouter un livre ',
          content: <Book/>,
        }
      ];
    let location =  useLocation();
    let action = useLocation().pathname.split('/')[2]
    const [header,setHeader]= useState("Ajouter une catégorie")
    const [current,setCurrent]= useState(0)
   
    useEffect(() => {
        if(action !== "add")
            setHeader("Ajouter une catégorie")
    }, [])
    const next=() =>{
        setCurrent(current+1)
    }
    
    const prev=() => {
        setCurrent(current-1)
    }
    return (
        
        <div>
            <h1>{header}</h1>
            <div>
            <Row>
                <Col span ={19  }>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Steps.Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </Col>
                
                
                    <Col span ={20} offset={2}>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                            suivant
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() =>{}}>
                            valider
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                précédent
                            </Button>
                        )}
                        </div>
                    </Col>
                </Row>
                
            </div>
        </div>
    )
}
const mapSotre =(store)=>{
    const { BooksManagemntReducer} = store
    const { TokenReduicer} = store
    return {
        books : BooksManagemntReducer,
        token : TokenReduicer,
    }
}

export default connect(mapSotre) (Categorie)