import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Pagination,
    Input,
    Skeleton,
    } from 'antd';
import Book from "./book";
import { getBooks } from "../../DAO/BooksDao";
import { connect } from "react-redux";
import Actions from '../../redux/actions'
const reMake =(props)=>{
    
    const user = props.user;
    const books = props.data.docs.map(book=>{
        return {...book,
            link : "/Books/"+book._id,
            favorite:user.favorites.includes(book._id)?true:false,
            lirePlusTard:user.lireplustard.includes(book._id)?true:false,
            lecture:user.lectures.find(b=>book._id === b.id)?true:false,
        }
        
    })
    props.setBooks(books)
    console.log("ahmed : ",props.data)
}
const AllBooks  =(props)=>{
    useEffect(()=>{
        getBooks({page:page,size:booksize,cle:searchValue}).then(data=>{
            reMake({...props,data,setBooks})
            setLength(data.length)
        })
        
    },[])
    const booksize = 12
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    const ChangePage = async page =>{
        console.log(page)
        setPage(page)
        setBooks([])
        const data = await getBooks({page:page-1,size:booksize,cle:searchValue})
        reMake({...props,data,setBooks})
        

    }
    const searsh =async(value)=>{
        console.log(value)
        setSearchValue(value)
        setBooks([])
        const data =await getBooks({page:page-1,size:booksize,cle:value})
        reMake({...props,data,setBooks})
        console.log(data.length)
        setLength(data.length)
    }
    const [searchValue,setSearchValue] = useState("")
    const [page , setPage]=useState(1)
    const [books , setBooks]=useState([])
    const [length , setLength]=useState(0)
    return(
        <Col xl={{...size(18,2)}} sm={{...size(18,3)}} xs={{...size(22,1)}} >
            
            <div style={{padding: "14px 0px"}}>
                <Input.Search
                    value ={searchValue}
                    placeholder="input search text"
                    onChange={(event)=>{searsh(event.target.value)}}
                    onSearch={value => searsh(value)}
                    style={{ width: 400 }}
                />
                
            </div>
            <Skeleton loading={books.length<=0?true:false} active  >
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
                </Skeleton>
            </Col>
    )
}

const mapSotre =(store)=>{
    const {userManagementReduicer,BooksLengthReducer} = store
    return {

        user:userManagementReduicer,
        length : BooksLengthReducer
    }
}


export default connect(mapSotre,{...Actions}) (AllBooks)
