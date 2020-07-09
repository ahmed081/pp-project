import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
import { Link,useLocation,Route, useParams } from 'react-router-dom'

import claimsManagement from './claimsManagement'
import { getAll,setTreatedDao} from '../../dao/claimsDao'
import {Button,Modal, Input, Badge, Select, Table, Tabs, Descriptions } from 'antd'
const size = 20
const { Option } = Select;
const AllClaims = (props)=>{
    const {id} =useParams()
    const rowSelection = {
        onChange: (_selectedRowKeys, _selectedRows) => {
          setSelectedRows(_selectedRows)
          console.log(`selectedRowKeys: ${selectedRows}`);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
      };
        const columns = [
            {
                title: 'Type',
                dataIndex: 'type',
            },
            {
                title: 'Claimer',
                render: claim  => <div><Link to={`/usersManagement/${claim.id_claimer}`}>{claim.id_claimer}</Link></div>
            },
            id!=="message"?
            {
                title: 'Claimed On',
                render: claim  => <div><Link to={id==='user'?`/usersManagement/${claim.claimed_On}`:`/booksManagement/${claim.claimed_On}`}>{claim.claimed_On}</Link></div>
            }:{},
            {
              title: 'Traated',
              dataIndex: 'treated',
              render: treated  => <Badge status={treated?"success":"error" } text={treated?"treated":"untreated" } />
            },
            {
                title: <center>Actions</center>,
                render: (claim) => {
                  return(
                      <center>
                    <div>{!claim.treated?<Link
                        onClick={async()=>{
                            claim.treated = true
                           await setTreatedDao({claim})
                        }}
                    >set treated</Link>:""}
                    <span> {!claim.treated?"|":""} </span>
                    <Link onClick={()=>{showModal(claim);console.log(visible)}} >show</Link></div>
                    </center>
                  )
                },
            },
        ];
    const showModal = (props) => {
        setClaim(props)
        console.log(props)
        setVisible(true)
        };
    
        const handleOk = e => {
        console.log(e);
        console.log("deleted ",claim._id)
        setVisible(false)
        };
    
        const handleCancel = e => {
        console.log(e);
        console.log("cancel delete ",claim._id)
        setVisible(false)
        };
    const [visible,setVisible]= useState(false)
    
    const [page,setPage] = useState(1)
    const [length,setLength]=useState()
    const [claims,setClaims]=useState()
    const [loading,setLoading]=useState(true)
    const [selectedRows,setSelectedRows] = useState([])
    const [claim,setClaim]=useState()
    const [action , setAction]= useState()
    const [treated , setTreated]= useState(false)
    const [cle,setCle]=useState("")
    useEffect(() => {
        setTimeout(() => {
            getAll({size:size,page:page-1,type:id,treated:treated}).then(data=>{
                setClaims(data.docs)
                console.log(data.length)
                setLength(data.length)
                setLoading(false)
            })
        }, 500);
        
        props.setTitle(Const.BOOKSUI_TITLE)
    }, [])
    function handleChange(value) {
        setAction(value)
        console.log(`selected ${value}`);
      }
    const onChange= async(pageNum)=>{
        setLoading(true)
        const data= await getAll({size:size,page:pageNum-1,type:id,treated:treated})
        setTimeout(() => {
            setLength(data.length)
            setClaims(data.docs)
            setLoading(false)
        }, 500);
    }
    const callback = async (key) => {
        console.log(key);
        const  treated = key==="true"
        console.log(treated)
        setLoading(true)
        setTimeout(() => {
            getAll({size:size,page:page-1,type:id,treated:treated}).then(data=>{
                setClaims(data.docs)
                console.log(data.length)
                setLength(data.length)
                setLoading(false)
                setTreated(treated)
            })
        }, 500);
      }
    return (
        <div>
            
            <div>
            <Button type="dashed" style ={{float: "right",top: "18px", fontWeight: "bold"}} >
              <Link to ='/usersManagement/add'>ajouter nouveau</Link>
            </Button>
            <div style={{position: "relative",top: "40px"}}>
                <Select defaultValue="action" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="Supprimer">Supprimer</Option>
                    
                </Select>
                <Button type="primary" 
                    disabled={selectedRows.length<=0?true:false} 
                    onClick={()=>{action ==="Supprimer" ?selectedRows.map():console.log("ssss")}}>
                    executer 
                </Button>
                <div  style={{width:"50%"}} >
                <Tabs defaultActiveKey="false" onChange={callback}>
                    <Tabs.TabPane tab="traité" key="true">
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="non traité" key="false">
                    </Tabs.TabPane>
                </Tabs>
                </div>
                <Table 
                        pagination={{defaultCurrent:page,total:length,pageSize:size,onChange:onChange}}
                        {...{loading:loading}}
                        rowSelection={{
                         ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={claims}
                />
            </div>
            </div>
            <SuppModel handleCancel = {handleCancel} handleOk={handleOk} visible ={visible} claim={claim} />

        </div>
    )
}

const SuppModel = (props)=>{
    const {claim}= props
    return(
      <Modal
            title="Suppression d'une réclamation"
            visible={props.visible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
          >
            {props.claim?<div>
                <Descriptions title={`claims type : ${claim.type}`} layout="horizontal">
                    <Descriptions.Item label="claimer  "> {claim.id_claimer}</Descriptions.Item>
                    <Descriptions.Item label="claimer on  "> {claim.claimed_On}</Descriptions.Item>
                    <Descriptions.Item label="content  "> {claim.claim_text}</Descriptions.Item>
                </Descriptions>
            </div> :null}
            
            
          </Modal>
    )
  }
const mapSotre =(store)=>{
    const {TokenReduicer} = store
    return {
      token : TokenReduicer,
    }
}

export default connect(mapSotre,{...Actions}) (AllClaims);