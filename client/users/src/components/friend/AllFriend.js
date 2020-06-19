import React, { useEffect, useState } from "react"
import { getFriends, addFriend } from "../../DAO/userDao"
import { connect } from "react-redux"
import Actions from '../../redux/actions'
import { Card, Avatar, Col, Row, Pagination, Input } from "antd"
import {AddFriend} from './index'
import { Link } from "react-router-dom"
const Info =(props)=>{
    const size = 5
    const [page , setPage] = useState(1)
    const [friends,setFriends] =useState([])
    const [length,setLength]=useState(0)
    const [searchValue,setSearchValue] = useState("")
    useEffect(()=>{
        getFriends({...props,setPage,setLength,cle:searchValue,setFriends,page:page-1,size:size}).then(data=>{
            setFriends(data.docs)
            setLength(data.length)

        })
    },[])
    const ChangePage =(p)=>{
        getFriends({...props,setPage,setLength,cle:searchValue,setFriends,page:p-1,size:size}).then(data=>{
            setFriends(data.docs)
            setLength(data.length)
            setPage(p)

        })
        
    }
    const searsh =(value)=>{
        console.log(value)
        
        getFriends({...props,setPage,setLength,cle:value,setFriends,page:page,size:size}).then(data=>{
            setFriends(data.docs)
            setLength(data.length)
            setSearchValue(value)

        })
    }
    return (
        <Row>
            <div style={{padding: "14px 22px"}}>
                <Input.Search
                        placeholder="input search text"
                        onChange={(event)=>{searsh(event.target.value)}}
                        onSearch={value => searsh(value)}
                        style={{ width: 400 }}
                    />
            </div>
            {
                friends.map(friend =>{
                    return(
                        <Col span={22} offset={1} >
            
                            <div>
                               
                                <Card style={{ width: "100%" }} >
                                    <Card.Meta
                                        avatar={
                                            <Link to={`/amis/${friend._id}`}>
                                                <Avatar size={50} src={`${friend.picture.large}`} />
                                            </Link>
                                        }
                                    title={<Link to={`/amis/${friend._id}`}>{`${friend.name.last} ${friend.name.first}`}</Link>}
                                    description={
                                        <div>
                                            <span>This is the description</span>
                                            <AddFriend {...props} id={friend._id}/>
                                        </div>
                                    }
                                    />
                                </Card>
                               
                            </div>
                        </Col>
                    )
                })
            }
            <Col span={24} >
                    <Pagination
                        size="small" 
                        current={page} 
                        pageSize={size} 
                        total={length}
                        responsive={true}
                        onChange={ChangePage}
                        showSizeChanger={false}
                        />
                </Col>
        </Row>
      
    )
}
const mapState =(store)=>{
    const {userManagementReduicer} =store
    return{
        user:userManagementReduicer
    }
}
export default connect(mapState,{...Actions}) (Info)