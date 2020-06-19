import React , {useState,useEffect} from "react"

import { Link,useLocation } from 'react-router-dom'
import {HeaderStyle} from '../style'
import { 
    Input ,
    Col,
    Tooltip,
    Divider,
    Row,
    Avatar,
    Descriptions
} from 'antd';
import { SearchOutlined,UserOutlined,DownOutlined,UpOutlined } from '@ant-design/icons';
import { getBooks } from "../../DAO/BooksDao";
import { connect } from "react-redux";
import Actions from '../../redux/actions'
import { getReaders } from "../../DAO/userDao";
import { getCategories } from "../../DAO/categorieDao";

const Searsh =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
  }

  useEffect(()=>{
    
  },[])
  const [searshTab,setSearshTab] = useState(false)
  const [books,setBooks] = useState([])
  const [friends,setFriends] = useState([])
  const [categories,setCategories] = useState({})
  const [searshValue,setSearshValue]=useState("")

  const user = props.user
  const onSearsh =async(event)=>{
    const cle = event.target.value
    const databook = await getBooks({page:0,size:2,cle})
    const datauser = await getReaders({user,page:0,size:2,cle})
    const datacategories = await getCategories({cle})
    setSearshValue(cle)
    if(!searshTab) setSearshTab(!searshTab)
    setBooks(databook.docs)
    setFriends(datauser.docs)
    setCategories(datacategories)
    //console.log(datauser)
  }
  return (
      
        <Col xl={{...size(12,4)}} sm={{...size(0)}} xs={{...size(0)}}>

            <div className="Header-Component-searsh" style={HeaderStyle.HeaderComponentSearsh} >
              <Input
                  onChange={(event)=>onSearsh(event)}
                  
                  style = {{borderRadius:"20px" ,height:"35px" ,zIndex:1}}
                  placeholder="Chercher...."
                  
                  
                  suffix={
                    <Tooltip title="rechercher">
                      <SearchOutlined style={HeaderStyle.HeaderComponentInputSearsh} onClick={()=>{
                        if(searshValue !== "")
                          window.location='/searsh/'+searshValue
                      }} />
                    </Tooltip>
                  }
              />
              {
                  searshTab?<div style={{ overflowY: "scroll", padding: "0px 21px",color: "black",height:"auto",background:"#f7f7f7",position:"relative",bottom:18,zIndex:0,borderRadius:5,border:"1px solid #a794944a",boxShadow:"0px 0px 1px black"}}>
                    <div style={{height: 15}} ></div>
                    <div>
                            <SearshBooks books={books} />
                            <SearshFriends friends={friends} />
                            <SearshCategories categories={categories} size ={2} />
                           
                              
                    </div>
                  </div>:""
              }
              
            </div>
        </Col>
  )
}
export const SearshCategories =(props)=>{

  const categories = props.categories
  const size  = props.size
  return (
          <div >
          <Divider orientation="left">
              <div>
                  categories
              </div>
          </Divider>
          <div>
            {
              Object.keys(categories).map((categorie,i)=>{
                if(i<size)
                return(
                  <Link onClick={()=>window.location = `/books/categories/${categorie}`} >
                      <div>
                      
                        <Row gutter={[16,16]}>
                        <Col span={5} style={{}}>
                            <center>
                              <Avatar size={50} style={{ backgroundColor: "orange", verticalAlign: 'middle' }}>
                                  <h3 style={{color:"white"}} >{categorie[0]}</h3>
                              </Avatar>
                            </center>
                          </Col>
                          <Col span={19} offset={0} style={{}}>
                            <h4>
                              {categorie}
                            </h4>
                            <Descriptions>
                              <Descriptions.Item label='Livres'>{categories[categorie]}</Descriptions.Item>
                            </Descriptions>
                         
                          </Col>
                          
                        </Row>
                        
                    </div>
                    </Link>
                )
              })
            }
          </div>
          
        </div>
  )
}
export const SearshBooks =(props)=>{

  const books = props.books

  return (
          <div >
          <Divider orientation="left">
              <div>
                  Livres
              </div>
          </Divider>
          <div>
            {
              books.map(book=>{
                return(
                  <Link onClick={()=>window.location = `/books/${book._id}`} >
                      <div>

                        <Row gutter={[16,16]}>
                          <Col span={5} style={{}}>
                            <center>
                              <Avatar size={50} shape="square" src={`${book.image}`} />
                            </center>
                          </Col>
                          <Col span={19} style={{}}>
                              <div>
                                <h4>
                                    {book.title}
                                </h4>
                              </div>

                          </Col>
                        </Row>
                        
                    </div>
                    </Link>
                )
              })
            }
          </div>
          
        </div>
  )
}
export const SearshFriends =(props)=>{

  const friends = props.friends

  return (
    <div >
    <Divider orientation="left">
        <div>
            Lecteurs  
        </div>
    </Divider>
    <div>
    {
        friends.map(friend=>{
          return(
            <Link onClick={()=>window.location = `/amis/${friend._id}`}>
                <div>

                  <Row gutter={[16,16]}>
                    <Col span={5} style={{}}>
                      <center>
                        <Avatar size={50}  src={`${friend.picture.large}`} />
                      </center>
                    </Col>
                    <Col span={19} style={{}}>
                        <div>
                          <h4>
                            {`${friend.name.last} ${friend.name.first}`}
                          </h4>
                        </div>
                        
                    </Col>
                  </Row>
                  
              </div>
              </Link>
          )
        })
      }
     
    </div>
  </div>
  )
}
const mapStore =(store)=>{
  const {userManagementReduicer} = store
  return{
      
      user:userManagementReduicer
  }
}

export default connect(mapStore,{...Actions}) (Searsh)