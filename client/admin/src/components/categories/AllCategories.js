import React,{useState,useEffect} from 'react'
import {Button,Modal, Input, Badge} from 'antd'
import {connect} from 'react-redux'
import { Table, Radio, Divider,Select } from 'antd';
import { Link,useLocation } from 'react-router-dom'
import Actions from '../../redux/actions'
import BooksDao from '../../dao/booksDao'
import { getCategorie } from '../../dao/categoriesDao';
import categorie from './categorie';



const { Option } = Select;

const AllCategories = (props)=>{
  
    
  const [visible,setVisible]= useState(false)
  const [loading , setLoading] = useState(true)
  const [book,setBook]= useState()
  const [categoires,setCategories]= useState()
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
      title: 'Catégorie',
      dataIndex: 'categorie',
      render: text => <a>{text}</a>,
    },
    {
      title: 'nombres des lirves',
      dataIndex: 'nbr',
      render: text =><Badge  count={text} />,
    },
    {
        title: 'Action',
        render: (props) => {
          return(
            <div><Link to={"categorieManagement/"+props.categorie} >afficher</Link>
            <span> | </span>
            <Link onClick={()=>{showModal(props);console.log(visible)}} >delete</Link></div>
          )
        },
    },
  ];
 // rowSelection object indicates the need for row selection

    const showModal = (props) => {
      setBook(props)
      setVisible(true)
    };
  
    const handleOk = e => {
      console.log(e);
      console.log("deleted ",book._id)
      
      BooksDao.deleteBook(props.token,book,props)
      setVisible(false)
    };
  
    const handleCancel = e => {
      console.log(e);
      console.log("cancel delete ",book._id)
      setVisible(false)
    };
    useEffect(() => {
        setTimeout(() => {
          setLoading(false)
          setCategories(getCategorie(props))
          console.log(props.books)
        }, 500);
        console.log("all book : ", props)
    }, [])
    function onChange(pageNumber) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 500);
        //BooksDao.getBooksByPage(pageNumber,props)
        props.bookCurrentPage(pageNumber-1)
        
        console.log('Page: ', pageNumber);
      }
      function handleChange(value) {
        setAction(value)
        console.log(`selected ${value}`);
      }
    return (
        <div>
            <SuppModel handleCancel = {handleCancel} handleOk={handleOk} visible ={visible} book={book} />
            <Button type="dashed" style ={{float: "right",top: "18px", fontWeight: "bold"}} ><Link to ='categorieManagement/add'>ajouter nouveau</Link></Button>
            <div style={{position: "relative",top: "40px"}}>
                <Select defaultValue="action" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="Supprimer">Supprimer</Option>
                    
                </Select>
                <Button type="primary" 
                    disabled={selectedRows.length<=0?true:false} 
                    onClick={()=>{action ==="Supprimer" ?selectedRows.map(async book => await BooksDao.deleteBook(props.token,book,props)):console.log("ssss")}}>
                    executer 
                </Button>
                <div>
                <Input.Search/>
                </div>
                
                <Table 
                        pagination={{defaultCurrent:props.page+1,total:props.length,onChange:onChange}}
                        {...{loading:loading}}
                        rowSelection={{
                         ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={categoires}
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
          {props.book?<p>voulez vous vraiment supprimer le livre : {props.book._id}</p> :null}
          
          
        </Modal>
  )
}

const mapSotre =(store)=>{
  const {BooksManagemntReducer} = store
  const {BooksLenghtReduicer} = store
  const {TokenReduicer} = store
  const {BooksPageReduicer} = store
  return {
    
    books : BooksManagemntReducer,
    length : BooksLenghtReduicer,
    token : TokenReduicer,
    page : BooksPageReduicer
  }
} 

export default connect(mapSotre,{...Actions}) (AllCategories)



