import React,{useState,useEffect} from 'react'
import { Link,useLocation, useParams } from 'react-router-dom'
import {connect} from "react-redux"
import {
    Form,
    Input,
    Select,
    InputNumber,
    Tooltip,
    Tag ,
    Button,
    Layout, 
    Empty,
    Spin,
    Row,
    Col,
    Rate
  } from 'antd';
import langages from '../../data/langages'
import countries from '../../data/countries'
import { AppstoreAddOutlined } from '@ant-design/icons';
import countrie from '../../data/countries';
import Upload from './uplaod'
import Axios from "axios"
import BooksDao from '../../dao/booksDao'
const Book = (props)=>{
    let location =  useLocation();
    const [book,setBook]= useState()
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
    const {id}=useParams()
    useEffect(() => {
        console.log(id)
        if(action !== "add")
        {
            BooksDao.getOne({id}).then(book=>{
                setBook(book)
            
                
                    setHeader("Afficher un livre ")
                    setTitle(book.title)
                    setISBN(book.ISBN)
                    setLangage(book.langage)
                    setDescription(book.description)
                    setPages(book.pages)
                    setAuthors(book.authors)
                    setCountry(book.country)
                    setSubject(book.Subject)
            
            }) 
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

                const {_id} = book
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
            <div style={{padding:"18px 13px"}}>
                <center>
                    <h1>{header}</h1>
                </center>
                
            </div>
            {
                action!=="add" && !book ? <div style={{padding:"100px 16px"}} ><center><Spin/></center></div>:
            <Row>
                <Col span={16}>
                    <Form
                
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                
                    >
                        
                        
                        <Form.Item label="Titre">
                            <Input value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder="Title de livre"/>
                        </Form.Item>
                        <Form.Item label="ISBN">
                            <Input value={ISBN} onChange={(event)=>{setISBN(event.target.value)}} placeholder="ISBN de livre"/>
                        </Form.Item>
                        <Form.Item label="Desription">
                            <Input.TextArea placeholder="desription" allowClear value={description} autoSize={ {minRows: 2, maxRows: 6 }} onChange={value => setDescription(value.target.value)} />
                        </Form.Item>
                        <Form.Item label="Nombre des pages">
                            <InputNumber min={1} value={pages} onChange={(value)=> setPages(value)} />
                        </Form.Item>
                    
                        <Form.Item label="Langage">
                        <Select defaultValue="Langage" value={langage} onChange={(value)=>{setLangage(value)}}>
                            {langages.map(({avb,nativeName}) =>{
                        
                                return <Select.Option value={avb}>{nativeName}</Select.Option>
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
                            <Form.Item label="Téléchargement de livre">
                                <Upload {...uplaodData}/>
                            </Form.Item>:
                            null
                        }
                        {action === "55698" ? 
                            <Form.Item label="show state">
                            <Button onClick={()=>console.log('file : ',file)}>show state</Button>
                            </Form.Item>:
                            null
                        }
                        <Form.Item label =" " onClick = {onSubmit}>
                            <Button type="primary">Modifier</Button>
                            </Form.Item>
                    </Form>
                </Col>
                <Col offset={2} span={6}>
                    <center>
                        <img width="250px" src={book.image}/>
                        <center><Rate disabled defaultValue={book.rating.rate} /></center>
                        
                    </center>
                </Col>
            </Row>
            }

        </div>
    )
}
const mapSotre =(store)=>{
    const { TokenReduicer} = store
    return {
        token : TokenReduicer,
    }
}

export default connect(mapSotre) (Book);