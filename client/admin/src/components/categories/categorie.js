import React,{useState,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import {connect} from "react-redux"
import {
    Form,
    Input,
    Select,
    InputNumber,
    Tooltip,
    Tag ,
    Button,
    Layout 
  } from 'antd';
import langages from '../../data/langages'
import countries from '../../data/countries'
import { AppstoreAddOutlined } from '@ant-design/icons';
import countrie from '../../data/countries';
import Axios from "axios"
import BooksDao from '../../dao/booksDao'
const Book = (props)=>{
    let location =  useLocation();
    let action = useLocation().pathname.split('/')[2]
    const [header,setHeader]= useState("Ajouter un Livre")
    const [title,setTitle]= useState("")
    const [ISBN,setISBN]= useState("")
    const [langage,setLangage]= useState("")
    const [description,setDescription]= useState("")
    const [pages,setPages]= useState(20)
    const [authors,setAuthors]= useState([])
    const [country, setCountry]=useState([])
    const [subject, setSubject]=useState([])
    const [file, setfile]=useState()
    useEffect(() => {
        
        if(action !== "add")
        {
            console.log("book inso :" ,props.books[parseInt(action)].pages)
            setHeader("Afficher un livre ")
            setTitle(props.books[parseInt(action)].title)
            setISBN(props.books[parseInt(action)].ISBN)
            setLangage(props.books[parseInt(action)].langage)
            setDescription(props.books[parseInt(action)].description)
            setPages(props.books[parseInt(action)].pages)
            setAuthors(props.books[parseInt(action)].authors)
            setCountry(props.books[parseInt(action)].country)
            setSubject(props.books[parseInt(action)].subject)
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
                setfile(info.file)
            }
        },
        };
        const onSubmit =()=>{
            if(action === "add")
            {
                BooksDao.addBook({
                    title,
                    ISBN,
                    langage,
                    description,
                    pages,
                    authors,
                    country,
                    subject,
                    file,
                    token:props.token
                })
            }else{

                const {_id} = props.books[parseInt(action)]
                BooksDao.editBook(
                        props.token,
                        {
                            _id,
                            title,
                            ISBN,
                            langage,
                            description,
                            pages,
                            authors,
                            country,
                            subject,
                            file,
                        }
                    )
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
                
                
                <Form.Item label="Titre">
                    <Input value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder="Title de livre"/>
                </Form.Item>
                <Form.Item label="ISBN">
                    <Input value={ISBN} onChange={(event)=>{setISBN(event.target.value)}} placeholder="ISBN de livre"/>
                </Form.Item>
                <Form.Item label="Desription">
                    <Input.TextArea placeholder="desription" allowClear value={description}  onChange={value => setDescription(value.target.value)} />
                </Form.Item>
                <Form.Item label="Nombre des pages">
                    <InputNumber min={1} value={pages} onChange={(value)=> setPages(value)} />
                </Form.Item>
               
                <Form.Item label="Langage">
                <Select defaultValue="Langage" onChange={(value)=>{setLangage(value)}}>
                    {langages.map(({name,nativeName}) =>{
                   
                        return <Select.Option value={name}>{nativeName}</Select.Option>
                    })}
                    
                </Select>
                </Form.Item>
                <Form.Item label="Auteurs">
                <Select mode="tags" value={authors} onChange={(value)=>{setAuthors([...value])}}>
                </Select>


                </Form.Item>
                <Form.Item label="Pays">
                <Select mode="tags" value={country} onChange={(value)=>{setCountry([...value])}}>
                    {Object.keys(countrie).map((country,key) =>{
                     
                        return <Select.Option value={countrie[country]}  key ={key}>{countrie[country]}</Select.Option>
                    })}
                    
                </Select>
                       
                </Form.Item>
                <Form.Item label="Sujets">
                <Select mode="tags" value={subject} onChange={(value)=>{setSubject([...value])}}>
                </Select>


                </Form.Item>
                
                
                {action === "55698" ? 
                    <Form.Item label="show state">
                    <Button onClick={()=>console.log('file : ',file)}>show state</Button>
                    </Form.Item>:
                    null
                }
                <Form.Item label =" " onClick = {onSubmit}>
                    <Button type="primary">Submit</Button>
                    </Form.Item>
            </Form>
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

export default connect(mapSotre) (Book);