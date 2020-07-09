import React,{useState,useEffect} from 'react'
import {Button,Modal, Input} from 'antd'
import {connect} from 'react-redux'
import { Table, Radio, Divider,Select } from 'antd';
import { Link,useLocation, useParams } from 'react-router-dom'
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
const size = 20

const { Option } = Select;

const Book = (props)=>{
  
    
  const columns = [
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      render: text => <a>{text}</a>,
    },
    {
      title: 'title',
      dataIndex: 'title',
    },
    {
      title: 'pages',
      dataIndex: 'pages',
    },
    {
      title: 'langage',
      dataIndex: 'langage',
    },
    {
        title: 'Action',
        render: (props) => {
          return(
            <div><Link to={"/booksManagement/"+props._id} >afficher</Link>
            <span> | </span>
            <Link onClick={()=>{showModal(props);console.log(visible)}} >delete</Link></div>
          )
        },
    },
  ];
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
  
 // rowSelection object indicates the need for row selection
  
  const showModal = (props) => {
    setBook(props)
    setVisible(true)
  };
  
  const handleOk = e => {
    console.log(e);
    console.log("deleted ",book._id)
    
    //BooksDao.deleteBook(props.token,book,props)
    setVisible(false)
  };
  
  const handleCancel = e => {
    console.log(e);
    console.log("cancel delete ",book._id)
    setVisible(false)
  };
  const [visible,setVisible]= useState(false)
  const [loading , setLoading] = useState(true)
  const [book,setBook]= useState()
  const [books, setBooks] = useState([])
  const [selectedRows,setSelectedRows] = useState([])
  const [action , setAction]= useState()
  const [cle , setCle]= useState("")
  const [length , setLength]= useState("")
  const [page , setPage]= useState(1)
  const {id } = useParams()
  useEffect(() => {
    setTimeout(() => {
        BooksDao.getbooksByCategorie({categorie:id,page:page-1,size:size,cle:cle}).then(data=>{
          setBooks(data.docs)
          setLength(data.length)
          setLoading(false)
        })
    }, 500);
    
      
      }, [])
  const onChange=async (pageNumber)=> {
        setLoading(true)
        const b = await BooksDao.getbooksByCategorie({categorie:id,page:pageNumber-1,size:size,cle:cle})
        setTimeout(() => {
          setLoading(false)
          setPage(pageNumber)
          setBooks(b.docs)
          setLength(b.length)
        }, 500);
    }
    const searsh =async(motCle)=>{
      //searsh
        setLoading(true)
        const b = await BooksDao.getbooksByCategorie({categorie:id,page:page-1,size:size,cle:motCle})
        setTimeout(() => {
          setLoading(false)
          setBooks(b.docs)
          setLength(b.length)
        }, 500);
    }
    function handleChange(value) {
      setAction(value)
      console.log(`selected ${value}`);
    }

    return (
        <div>
            <SuppModel handleCancel = {handleCancel} handleOk={handleOk} visible ={visible} book={book} />
            <div style={{position: "relative",top: "40px"}}>
                <Select defaultValue="action" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="Supprimer">Supprimer</Option>
                    
                </Select>
                <Button type="primary" 
                    disabled={selectedRows.length<=0?true:false} 
                    onClick={()=>{action ==="Supprimer" ?selectedRows.map(async book => showModal(books[1])):console.log("ssss")}}>
                    executer 
                </Button>
                <div  style={{width:"50%"}} >
                  <Input.Search placeholder='Chercher livre' onChange={event=> {setCle(event.target.value);searsh(event.target.value)}} onSearch={(value, event)=>searsh(cle)}/>
                </div>
                <Table 
                        pagination={{defaultCurrent:page,total:length,onChange:onChange,pageSize:size}}
                        {...{loading:loading}}
                        rowSelection={{
                         ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={books}
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
          {props.book?<p>voulez vous vraiment supprimer le livre : {props.book.title}</p> :null}
          
          
        </Modal>
  )
}

const mapSotre =(store)=>{
  const {TokenReduicer} = store
  return {
    token : TokenReduicer,
  }
} 

export default connect(mapSotre,{...Actions}) (Book)



