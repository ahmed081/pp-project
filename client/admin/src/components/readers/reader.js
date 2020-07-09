import React,{useState,useEffect} from 'react'
import { Link,useLocation, useParams } from 'react-router-dom'
import {connect} from "react-redux"
import moment from 'moment';
import readerShape from "../../data/userShape.json"
import {
    Form,
    Input,
    Select,
    InputNumber,
    Tooltip,
    Tag ,
    DatePicker ,
    Button,
    Layout, 
    Spin,
    Row,
    Col,
    Descriptions,
    Badge,
    Avatar
  } from 'antd';
import langages from '../../data/langages'
import countries from '../../data/countries'
import { AppstoreAddOutlined } from '@ant-design/icons';
import countrie from '../../data/countries';
import Upload from './uplaod'
import Axios from "axios"
import BooksDao from '../../dao/booksDao'
import { getOne, editReader,addReader } from '../../dao/readerDao';

const Reader = (props)=>{
    let location =  useLocation();
    let action = useLocation().pathname.split('/')[2]
    const [header,setHeader]= useState("Ajouter un Lecteur")
    const [reader,setReader]= useState()
    const {id}=useParams()
    useEffect(() => {
        
        if(action !== "add")
        {
            getOne({id}).then(reader=>{
                setReader(reader)
                console.log(reader)
            })
            
        }
        else setReader(readerShape)
        
        }, [])
    const uplaodData = {
        name: 'file',
        action: 'http://localhost:3000/book/uplaod',
        headers: {
            token: props.token,
        },
        onChange(info) {
            
            if (info.file.status !== 'uploading') {
                console.log("files : ",info.file, info.fileList);
                
            }
        },
        };
        const onSubmit =async()=>{
            if(action === "add")
            {
                console.log("dddddaz")

                const R = await addReader({reader:reader})
                if(R)
                    console.log("daz")
                else console.log("!daz")
            }else{
                const R = await editReader({reader:reader})
                if(R)
                    window.location = "/usersManagement"
                else console.log("!daz")
            }
            
        }
    return (
        
        <div>
            <div style={{padding:"15px 1px"}}>
                <center>
                    <h1>{header}</h1>
                </center>
            </div>
            <div>
                {
                    !reader?<div style={{padding:"100px 1px"}}><center><Spin/></center></div>:
                    <Row>
                        <Col offset={3} span={14} >
                            <Form
                    
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                                layout="horizontal"
                        
                            >
                                
                                
                                <Form.Item label="Nom Complet">
                                    <Input value={reader.name.first} onChange={(event)=>{
                                        const name = {
                                            ...reader.name,
                                            first:event.target.value
                                        }
                                        setReader({...reader,name})
                                    }} placeholder="prénom"/>
                                    <Input value={reader.name.last} onChange={(event)=>{
                                        const name = {
                                            ...reader.name,
                                            last:event.target.value
                                        }
                                        setReader({...reader,name})
                                    }} placeholder="nom"/>
                                </Form.Item> 
                                <Form.Item label="Date de naissance">
                                    <DatePicker 
                                        defaultValue={reader.dob.date?moment(reader.dob.date, 'YYYY/MM/DD'):""} 
                                        format={'YYYY/MM/DD'}
                                        onChange={(date, dateString)=>{
                                            const dob ={
                                                date: date,
                                                age:(new Date()).getFullYear() - (new Date(dateString)).getFullYear()
                                            }
                                            const d = new Date()
                                            console.log(d.getFullYear())
                                            setReader({
                                                ...reader,
                                                dob
                                            })
                                        // console.log((new Date()), Date(dateString));
                                        }} 
                                    />
                                </Form.Item>
                                <Form.Item label="Sexe">
                                    <Select value={reader.gender} onChange={(value)=>{
                                        setReader({
                                            ...reader,
                                            gender:value
                                        })
                                    }}>
                                        <Select.Option value="M">homme</Select.Option>
                                        <Select.Option value="F">femme</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="email">
                                    <Input value={reader.email} onChange={(event)=>{
                                        setReader({
                                            ...reader,
                                            email:event.target.value
                                        })
                                    }} placeholder="Email"/>
                                </Form.Item>
                                <Form.Item label="Téléphone">
                                    <Input value={reader.mobile} onChange={(event)=>{
                                        setReader({
                                            ...reader,
                                            mobile:event.target.value
                                        })
                                    }} placeholder="Mobile"/>
                                </Form.Item>
                                
                                        
                                
                                
                                
                                <Form.Item label =" " onClick = {()=>onSubmit()}>
                                    <Button type="primary">Modifier</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col offset={1} span={6}>
                            <div>
                                <center>
                                    <Avatar size={200} shape="square" src={reader.picture.large} />
                                <center style={{padding:"12px 1px"}}>
                                    <Button>
                                        changer image
                                    </Button>
                                </center>
                                <div style={{padding:"12px  30px"}}>
                                    <Descriptions>
                                        <Descriptions.Item label="Abonnée"><Badge status={reader.subscribe?"success":"error"} /></Descriptions.Item>
                                    </Descriptions>
                                </div>
                                </center>
                            </div>
                        </Col>
                    </Row>
                }
            </div>
        </div>
    )
}
const mapSotre =(store)=>{
    const { ReadersManagemntReducer} = store
    const { TokenReduicer} = store
    return {
        readers : ReadersManagemntReducer,
        token : TokenReduicer,
    }
}

export default connect(mapSotre,{}) (Reader);