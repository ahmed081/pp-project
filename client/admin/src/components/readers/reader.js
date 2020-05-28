import React,{useState,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import {connect} from "react-redux"
import moment from 'moment';
import {
    Form,
    Input,
    Select,
    InputNumber,
    Tooltip,
    Tag ,
    DatePicker ,
    Button,
    Layout 
  } from 'antd';
import langages from '../../data/langages'
import countries from '../../data/countries'
import { AppstoreAddOutlined } from '@ant-design/icons';
import countrie from '../../data/countries';
import Upload from './uplaod'
import Axios from "axios"
import BooksDao from '../../dao/booksDao'
const Reader = (props)=>{
    let location =  useLocation();
    let action = useLocation().pathname.split('/')[2]
    const [header,setHeader]= useState("Ajouter un Livre")
    const [name,setName]= useState({fist:"",last:""})
    const [email,setEmail]= useState("")
    const [mobile,setMobile]= useState("")
    const [gender,setGender]= useState("Sexe")
    const [login,setLogin]= useState({username:"",password:""})
    const [dob,setDob]= useState({date:"",age:""})

    useEffect(() => {
        
        if(action !== "add")
        {
            const reader = props.readers[parseInt(action)]
            console.log("reader info :" ,props.readers[parseInt(action)])
            setHeader("Afficher un reader ")
            console.log(props)
            setName({fist:reader.name.fist,last:reader.name.last})
            setEmail(reader.email)
            setMobile(reader.mobile)
            setGender(reader.gender)
            setLogin({username:reader.login.username,password:reader.login.password})
            setDob({date:reader.dob.date,age:reader.dob.age})
        }
        
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
        const onSubmit =()=>{
            if(action === "add")
            {

            }else{
                
            }
            
        }
    return (
        
        <div>
            <h1>{header}</h1>
            <Form
            
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
        
            >
                
                
                <Form.Item label="Nom Complet">
                    <Input value={name.fist} onChange={(event)=>{setName({...name,fist :event.target.value})}} placeholder="prénom"/>
                    <Input value={name.last} onChange={(event)=>{setName({...name,last :event.target.value})}} placeholder="nom"/>
                </Form.Item>
                <Form.Item label="Date de naissance">
                    <DatePicker 
                        defaultValue={moment(dob.date, 'YYYY/MM/DD')} 
                        format={'YYYY/MM/DD'}
                        onChange={(date, dateString)=>{
                            console.log((new Date()), Date(dateString));
                            const d = new Date(dateString)
                            console.log(d.getMonth())
                            const nd = Date.now()
                            const calc_age = new Date(nd - d.getTime())
                            setDob({date : d.getFullYear()+"/"+parseInt(d.getMonth()+1)+"/"+d.getDate() , age : Math.abs(calc_age.getUTCFullYear() - 1970)+""})
                        }} 
                    />
                </Form.Item>
                <Form.Item label="Sexe">
                    <Select value={gender} onChange={(value)=>{setGender(value)}}>
                        <Select.Option value="M">homme</Select.Option>
                        <Select.Option value="F">femme</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="email">
                    <Input value={email} onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email"/>
                </Form.Item>
                
                <Form.Item label="Login">
                    <Input value={login.username} onChange={(event)=>{setLogin({...login,username :event.target.value})}} placeholder="user name"/>
                    <Input value={login.password} onChange={(event)=>{setLogin({...login,password :event.target.value})}} placeholder="password"/>
                </Form.Item>

                <Form.Item label="Téléphone">
                    <Input value={mobile} onChange={(event)=>{setMobile(event.target.value)}} placeholder="Mobile"/>
                </Form.Item>
                
                        
                
                
                <Form.Item label="show state">
                    <Button onClick={()=>console.log('age : ',dob.date)}>show state</Button>
                </Form.Item>
                <Form.Item label =" " onClick = {onSubmit}>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
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