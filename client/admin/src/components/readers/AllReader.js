import React,{useState,useEffect} from 'react'
import {Button,Modal} from 'antd'
import {connect} from 'react-redux'
import { Table, Radio, Divider,Select } from 'antd';
import { Link,useLocation } from 'react-router-dom'
import Actions from '../../redux/actions'
import BooksDao from '../../dao/booksDao'


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
  
    
  const [visible,setVisible]= useState(false)
  const [loading , setLoading] = useState(true)
  const [reader,setReader]= useState()
  const [selectedRows,setSelectedRows] = useState([])
  const [action , setAction]= useState()
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
      dataIndex: 'name',
      render: name  => <a>{name.fist + " "+name.last}</a>,
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
      title: 'Age',
      dataIndex: 'dob',
      render : dob => <div>{dob.age}</div>
    },
    {
        title: 'Actions',
        render: (props) => {
          return(
            <div><Link to={"usersManagement/"+props.key} >afficher</Link>
            <span> | </span>
            <Link onClick={()=>{showModal(props);console.log(visible)}} >delete</Link></div>
          )
        },
    },
  ];
 // rowSelection object indicates the need for row selection

    const showModal = (props) => {
      setReader(props)
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
    useEffect(() => {
        setTimeout(() => {
          setLoading(false)
          console.log(props.readers)
        }, 500);
        console.log("all readers : ", props)
        }, [])
        function onChange(pageNumber) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
          }, 500);
            BooksDao.getBooksByPage(pageNumber,props)
            props.readerCurrentPage(pageNumber-1)
            
            console.log('Page: ', pageNumber);
          }
          function handleChange(value) {
            setAction(value)
            console.log(`selected ${value}`);
          }
    return (
        <div>
            <SuppModel handleCancel = {handleCancel} handleOk={handleOk} visible ={visible} reader={reader} />
            <Button type="dashed" style ={{float: "right",top: "18px", fontWeight: "bold"}} >
              <Link to ='usersManagement/add'>ajouter nouveau</Link>
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
                <Table 
                        pagination={{defaultCurrent:props.page+1,total:props.length,onChange:onChange}}
                        {...{loading:loading}}
                        rowSelection={{
                         ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={props.readers}
                />
            </div>
            
        
        </div>
    )
}
const SuppModel = (props)=>{
  return(
    <Modal
          title="Supprimer un livre"
          visible={props.visible}
          onOk={props.handleOk}
          onCancel={props.handleCancel}
        >
          {props.reader?<p>voulez vous vraiment supprimer le livre : {props.reader.name.fist+ " "+props.reader.name.last}</p> :null}
          
          
        </Modal>
  )
}

const mapSotre =(store)=>{
  const {ReadersManagemntReducer} = store
  const {ReadersLenghtReduicer} = store
  const {TokenReduicer} = store
  const {ReadersPageReduicer} = store
  return {
    
    readers : ReadersManagemntReducer,
    length : ReadersLenghtReduicer,
    token : TokenReduicer,
    page : ReadersPageReduicer
  }
} 

export default connect(mapSotre,{...Actions}) (Reader)



