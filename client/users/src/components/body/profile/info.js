import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Divider,
    Avatar,
    Descriptions,
    Button,
    Input
    } from 'antd';
import {UserOutlined, KeyOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import {BodyStyle} from "../../style"
import { connect } from "react-redux";
import { initUser } from "../../../redux/actions/userActions";
import { editReader } from "../../../DAO/userDao";
const InfoModel =["Nom","Prénom","UserName","Email","Téléphone"]


const Info =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    useEffect(()=>{
        console.log(props.user)
    },[])
    const user = props.user;
    const [last,setLast]=useState(user.name.last)
    const [first,setFirst]=useState(user.name.first)
    const [date,setDate]=useState(user.dob.date)
    const [email,setEmail]=useState(user.email)
    const [mobile,setMobile]=useState(user.mobile)
    const [username,setUsername]=useState(user.login.username)
    const [edit,setEdit]=useState(false)
    const [loadingEdit , setLoadingEdit]=useState(false)
    const toggleEdit= ()=>{
        if(edit)
        {
            setLoadingEdit(true)
            setTimeout(() => {
                const editUser =user
                editUser.name.last = last
                editUser.name.first = first
                editUser.dob.date= date
                editUser.email = email
                editUser.mobile= mobile
                editUser.login.username = username
                console.log(editUser)
                setEdit(!edit)
                editReader({user:editUser}).then(data=>{
                    setLoadingEdit(false)
                    initUser(editUser)
                })
                
            },1000 );
        }else setEdit(!edit)
    }
    return(
        <Col span={20} offset={2} style={BodyStyle.LeftSide}>
            <Descriptions size="small" column={1} title="Les informations d'utilisateur">
                <Descriptions.Item  label="Nom"><Item title={last} edit={edit} function={setLast}/></Descriptions.Item>
                <Descriptions.Item label="Prénom"><Item title={first} edit={edit} function={setFirst}/></Descriptions.Item>
                <Descriptions.Item label="age"><Item title={date} edit={edit} function={setDate}/></Descriptions.Item>
                <Descriptions.Item label="email"><Item title={email} edit={edit} function={setEmail} /></Descriptions.Item>
                <Descriptions.Item label="mobile"><Item title={mobile} edit={edit} function={setMobile}/></Descriptions.Item>
                <Descriptions.Item label="UserName"><Item title={username} edit={edit} function={setUsername}/></Descriptions.Item>
                <Descriptions.Item label="Password"><Button><KeyOutlined /></Button></Descriptions.Item>
                
            </Descriptions>
                <div>
                    <Button type={edit?"primary":"ghost"} loading={loadingEdit} onClick={()=>toggleEdit()} >
                        {
                            edit?<div>Enregistrer <SaveOutlined /></div>:
                            <div>Modifier <EditOutlined /></div>
                        }
                    </Button> 
                </div>
        </Col>
    )
}

const Item  = (props)=>{
    
    return(
        <div>
            {
            props.edit?
            <Input value={props.title} onChange={(event)=>{props.function(event.target.value)}} />:
            <div>{props.title}</div>

            }
        </div>
    )
}
const mapStore = (store)=>{
    const {userManagementReduicer} =store
    return {
      user : userManagementReduicer
    }
  }
export default connect(mapStore) (Info)