import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Card, 
    Input,
    Skeleton,
    Pagination,
    Empty
    } from 'antd';
import img from '../../images/backgroundImage.jpg'
import Book from "./book";
import Categories from "./categories";
import { useLocation, Route, BrowserRouter, Switch, useParams } from "react-router-dom";
import {connect} from "react-redux"
import Actions from '../../redux/actions'
import {  getByCategories } from "../../DAO/BooksDao";
import Allbooks from "./Allbooks";
const reMake =(props)=>{
    
    const user = props.user;
    const books = props.data.docs.map(book=>{
        return {...book,
            link : "/Books/"+book._id
        }
        
    })
    return books
}

const Categorie =(props)=>{



    const size =(span , offset=0)=>{
        return {span , offset}
    }
    const booksize = 12
    const {id} = useParams()
    let location = useLocation()
    useEffect(()=>{
        getByCategories({categorie:id,page:page-1,size:booksize,cle:searchValue}).then(data=>{
            const b =reMake({...props,data})
            
            setTimeout(() => {
                setBooks(b)
                if(b.length<=0)
                setEmpty(true)
                else setEmpty(false)
                setLength(data.length)
                setLoading(false)
            }, 500);
            
        })
    },[])
    const [searchValue,setSearchValue] = useState("")
    const [page , setPage]=useState(1)
    const [books , setBooks]=useState([])
    const [length , setLength]=useState(0)
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(true)
    const searsh =async(value)=>{
        console.log(value)
        setSearchValue(value)
        setLoading(true)
        const data =await getByCategories({categorie:id,page:page-1,size:booksize,cle:value})
        const b =reMake({...props,data})
        setTimeout(() => {
            setBooks(b)
            if(b.length<=0)
                setEmpty(true)
            else setEmpty(false)
            setLength(data.length)
            setLoading(false)
        }, 500);
    }
    const ChangePage = async page =>{
        setLoading(true)
        console.log(page)
        setPage(page)
        const data = await getByCategories({categorie:id,page:page-1,size:booksize,cle:searchValue})
        const b =reMake({...props,data})
        setTimeout(() => {
            setBooks(b)
            if(b.length<=0)
                setEmpty(true)
            else setEmpty(false)
            setLength(data.length)
            setLoading(false)
        }, 500);
        

    }
    return (
        
        <Row>
            <Categories/>
            <Col xl={{...size(18,2)}} sm={{...size(18,3)}} xs={{...size(22,1)}} >
            
            <div style={{padding: "14px 0px"}}>
                <Input.Search
                    value ={searchValue}
                    placeholder="search text"
                    onChange={(event)=>{searsh(event.target.value)}}
                    onSearch={value => searsh(value)}
                    style={{ width: 320 }}
                />
                
            </div>
            <Skeleton loading={loading} active  >
                {
                    empty?<Empty/>:
                    <div>
                        <Row gutter={[16, 16]}>
                            {
                                books.map(book => {
                                        return (
                                            <Book book={book}/>
                                        )
                                })
                            }
                        </Row>
                        <Col span={24} >
                            <Pagination 
                                size="small" 
                                current={page} 
                                pageSize={12} 
                                total={length}
                                responsive={true}
                                onChange={ChangePage}
                                showSizeChanger={false}
                                />
                        </Col>
                    </div>
                }
                </Skeleton>
            </Col>
            
        </Row>
                   
    )
}

const mapSotre =(store)=>{
    const {userManagementReduicer} = store
    return {user : userManagementReduicer}
}


export default connect(mapSotre,{...Actions}) (Categorie)