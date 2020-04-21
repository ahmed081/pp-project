import React,{useState,useEffect} from 'react'
import {Button} from 'antd'
import {connect} from 'react-redux'
import { Table, Radio, Divider,Select } from 'antd';
import { Link,useLocation } from 'react-router-dom'
import Actions from '../../redux/actions'
import BooksDao from '../../dao/booksDao'

const {addBook,CurrentPage} = Actions
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
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
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
        render: (props) => <Link to={"booksManagement/"+props.key} >afficher</Link>,
    },
  ];
 // rowSelection object indicates the need for row selection

const Book = (props)=>{
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
          setLoading(false)
          console.log(props.books)
        }, 500);
        console.log("all book : ", props)
        }, [])
        function onChange(pageNumber) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
          }, 500);
            BooksDao.getBooksByPage(pageNumber,props)
            props.CurrentPage(pageNumber-1)
            
            console.log('Page: ', pageNumber);
          }
          function handleChange(value) {
            console.log(`selected ${value}`);
          }
    return (
        <div>
            <Button type="dashed" style ={{float: "right",top: "18px", fontWeight: "bold"}} ><Link to ='booksManagement/add'>ajouter nouveau</Link></Button>
            <div style={{position: "relative",top: "40px"}}>
                <Select defaultValue="action" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="Supprimer">Supprimer</Option>
                    
                </Select>
                <Table 
                        pagination={{defaultCurrent:props.page+1,total:props.length,onChange:onChange}}
                        {...{loading:loading}}
                    rowSelection={{
                    
                    ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={props.books}
                />
            </div>
            
        
        </div>
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

export default connect(mapSotre,{...Actions}) (Book)



