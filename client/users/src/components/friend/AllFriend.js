import React, { useEffect, useState } from "react"
import { getFriends, addFriend } from "../../DAO/userDao"
import { connect } from "react-redux"
import Actions from '../../redux/actions'
import { Card, Avatar, Col, Row, Pagination } from "antd"
import {AddFriend} from './index'
import { Link } from "react-router-dom"
const Info =(props)=>{
    const size = 8
    const [page , setPage] = useState(1)
    const [friends,setFriends] =useState([])
    const [length,setLength]=useState(0)
    useEffect(()=>{
        getFriends({...props,setPage,setLength,setFriends,page:page-1,size:size})
    },[])
    const ChangePage =(p)=>{
        getFriends({...props,setLength,setFriends,page:p-1,size:size})
        setPage(p)
    }
    return (
        <Row>
            {
                friends.map(friend =>{
                    return(
                        <Col span={22} offset={1} style={{background:"red"}} >
            
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