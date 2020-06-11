import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Pagination,
    } from 'antd';
import Book from "./book";
import { getBooks } from "../../DAO/BooksDao";

const AllBooks  =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    const ChangePage =page =>{
        console.log(page)
        getBooks(props,page-1)
    }
    const [page , setPage]=useState(1)
    return(
        <Col xl={{...size(18,2)}} sm={{...size(18,3)}} xs={{...size(22,1)}} >
                <Row gutter={[16, 16]}>
                    {
                        props.books.map(book => {
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
                        total={props.length}
                        responsive={true}
                        onChange={ChangePage}
                        showSizeChanger={false}
                        />
                </Col>
            </Col>
    )
}



export default AllBooks