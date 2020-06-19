import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import { SearshFriends, SearshBooks, SearshCategories } from "../../header/searsh"
import { getBooks } from "../../../DAO/BooksDao"
import {  getReaders } from "../../../DAO/userDao"
import { Spin, Empty } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { getCategories } from "../../../DAO/categorieDao"


const Searsh = (props)=>{
    const {id} = useParams()
    const [books,setBooks] = useState([])
    const [friends,setFriends] = useState([])
    const [categories,setCategories] = useState({})
    const [size1 , setSize1] = useState(4)
    const [size2 , setSize2] = useState(4)
    const [size3 , setSize3] = useState(4)
    const [loading,setLoading]=useState(true)
    const [empty,setEmpty]=useState(true)
    const  user = props.user
    const getData=async(size1 ,size2)=>{
        const databook = await getBooks({page:0,size:size1,cle:id})
        const datauser = await getReaders({user,page:0,size:size2,cle:id})
        const datacategories = await getCategories({cle:id})
        if(databook.docs.length <= 0 && datauser.docs.length<=0)
            setEmpty(true)
        else setEmpty(false)
        setBooks(databook.docs)
        setFriends(datauser.docs)
        setCategories(datacategories)
        
    }
    useEffect(()=>{
        getData(size1,size2)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        
    },[])
    return(
        <div style={{minHeight:345}} >
            {
                loading?<center><Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></center>:
                empty ?<div><Empty/></div>:
                <div>
                    <div>
                        {
                            books.length<=0?"":
                            <div>
                                <SearshBooks books={books} />
                                <div style={{float:"right"}} >
                                    <Link  onClick={()=>{
                                        setSize1(size1+4)
                                        getData(size1+4,size2)
                                    }} >afficher plus...</Link>
                                </div>
                            </div>
                        }
                    </div>
                    
                    <div>
                        {
                            friends.length<=0?"":
                            <div>
                                <SearshFriends friends={friends} />
                                <div style={{float:"right"}} >
                                    <Link  onClick={()=>{
                                        setSize2(size2+4)
                                        getData(size1,size2+4)
                                    }} >afficher plus...</Link>
                                </div>
                            </div>
                        }
                    </div>
                    
                    <div>
                        {
                            Object.keys(categories).length<=0?"":
                            <div>
                                <SearshCategories categories={categories} size={size3} />
                                <div style={{float:"right"}} >
                                    <Link  onClick={()=>{
                                        setSize3(size3+4)
                                    }} >afficher plus...</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            
        </div>
    )
}
const mapStore =(store  )=>{
    const {userManagementReduicer} =store

    return{
        user :userManagementReduicer
    }

}
export default connect(mapStore) (Searsh)