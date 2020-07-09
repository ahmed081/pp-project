import React,{useState,useEffect} from 'react'
import {Button,Modal, Input, Badge} from 'antd'
import {connect} from 'react-redux'
import { Table, Radio, Divider,Select } from 'antd';
import { Link,useLocation } from 'react-router-dom'
import Actions from '../../redux/actions'
import BooksDao from '../../dao/booksDao'
import { getAll } from '../../dao/readerDao';
const size =20

/* 
    #to do 
        -login 
        - token management
        - bring data from server 
        - delete one and many book action
            * create actions and reducer
            * dispatch them 
        - promt to comfim delete 
        - fix pagination 

 */
const { Option } = Select;

const Reader = (props)=>{
  
    

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
      title: 'Name',
      render: reader  => <Link to={`/usersManagement/${reader._id}`}>{reader.name.first + " "+reader.name.last}</Link>,
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Sexe',
      dataIndex: 'gender',
    },
    {
      title: 'abonnée',
      dataIndex: 'subscribe',
      render : subscribe => <div>{<Badge status={subscribe?"success":"error"} text	={`${subscribe}`} />}</div>
    },
    {
      title: 'Age',
      dataIndex: 'dob',
      render : dob => <div>{dob.age}</div>
    },
    {
        title: 'Actions',
        render: (props) => {
          return(
            <div><Link to={"/usersManagement/"+props._id} >afficher</Link>
            <span> | </span>
            <Link onClick={()=>{showModal(props);console.log(visible)}} >delete</Link></div>
          )
        },
    },
  ];
 // rowSelection object indicates the need for row selection

    const showModal = (props) => {
      setReader(props)
      console.log(props)
      setVisible(true)
    };
  
    const handleOk = e => {
      console.log(e);
      console.log("deleted ",reader._id)
      props.deleteReader(reader.key)
     // BooksDao.deleteBook(props.token,reader,props)
      setVisible(false)
    };
  
    const handleCancel = e => {
      console.log(e);
      console.log("cancel delete ",reader._id)
      setVisible(false)
    };
    const [visible,setVisible]= useState(false)
    const [loading , setLoading] = useState(true)
    const [reader,setReader]= useState()
    const [selectedRows,setSelectedRows] = useState([])
    const [action , setAction]= useState()
    const [page , setPage]= useState(1)
    const [length , setlength]= useState()
    const [readers , setReaders]= useState()
    const [cle , setCle]= useState("")
    useEffect(() => {
      setTimeout(() => {
      getAll({page:page-1,size:size,cle:cle}).then(data=>{
        setLoading(false)
        setReaders(data.docs)
        setlength(data.length)
      })
      
      }, 500);
    
    }, [])
    const searsh = async(motCle)=>{
        //searsh
        setLoading(true)
        const data = await getAll({page:page-1,size:size,cle:motCle})
        setTimeout(() => {
          setLoading(false)
          setReaders(data.docs)
          setlength(data.length)
        }, 500);
    }
    const  onChange=async(pageNumber)=> {
      setLoading(true)
      const data = await getAll({page:pageNumber-1,size:size,cle:cle})
      setTimeout(() => {
        setPage(pageNumber)
        setReaders(data.docs)
        setlength(data.length)
        setLoading(false)

      }, 500);
        
      }
    function handleChange(value) {
      setAction(value)
      console.log(`selected ${value}`);
    }
    return (
        <div>
            <SuppModel handleCancel = {handleCancel} handleOk={handleOk} visible ={visible} reader={reader} />
            <Button type="dashed" style ={{float: "right",top: "18px", fontWeight: "bold"}} >
              <Link to ='/usersManagement/add'>ajouter nouveau</Link>
            </Button>
            <div style={{position: "relative",top: "40px"}}>
                <Select defaultValue="action" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="Supprimer">Supprimer</Option>
                    
                </Select>
                <Button type="primary" 
                    disabled={selectedRows.length<=0?true:false} 
                    onClick={()=>{action ==="Supprimer" ?selectedRows.map(async reader => await BooksDao.deleteBook(props.token,reader,props)):console.log("ssss")}}>
                    executer 
                </Button>
                <div  style={{width:"50%"}} >
                  <Input.Search placeholder='Chercher lecteur' onChange={event=> {setCle(event.target.value);searsh(event.target.value)}} onSearch={(value, event)=>searsh(cle)}/>
                </div>
                <Table 
                        pagination={{defaultCurrent:page,total:length,onChange:onChange}}
                        {...{loading:loading}}
                        rowSelection={{
                         ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={readers}
                />
            </div>
            
        
        </div>
    )
}
const SuppModel = (props)=>{
  return(
    <Modal
          title="Suppression d'un lecteur"
          visible={props.visible}
          onOk={props.handleOk}
          onCancel={props.handleCancel}
        >
          {props.reader?<p>voulez vous vraiment supprimer le lecteur :{`  ${props.reader.name.first} ${props.reader.name.last} `}</p> :null}
          
          
        </Modal>
  )
}

const mapSotre =(store)=>{
  const {TokenReduicer} = store
  return {
    
    token : TokenReduicer,
  }
} 

export default connect(mapSotre,{...Actions}) (Reader)



