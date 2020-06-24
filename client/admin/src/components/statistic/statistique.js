import React,{useState,useEffect} from 'react'
import { Select, Row, Col } from 'antd'
import Actions from '../../redux/actions'
import { connect } from 'react-redux'

const {Option} = Select
const Statistique = (props)=>{
    useEffect(()=>{
        props.setTitle("statistique")

    },[])
    const  handleChange =(value)=> {
        console.log(`selected ${value}`);
      }
    return (
        <div>
            <div>
                <center>
                    <h2>Statistique</h2>
                </center>
            </div>
            <div>
                <Row gutter={[16,16]}>
                    <Col offset={2} span={2} >
                        Choix :
                    </Col>
                    <Col span={10} >
                        <Select defaultValue="1" style={{ width: 300 }} onChange={handleChange}>
                            <Option value="1">nomber des livres lue par chaque user</Option>
                            <Option value="2">le nombre des lectures par livres</Option>
                            <Option value="3" >top 10 lecteur par mois</Option>
                            <Option value="4">nbr des abbo par mois  </Option>
                            <Option value="5">le profit d'année  </Option>
                        </Select>
                    </Col>
                </Row>
            </div>
            
        </div>
    )
}




const mapSotre =(store)=>{
    const {BooksManagemntReducer} = store
    const {TokenReduicer} = store
    const {BooksPageReduicer} = store
    return {
      books : BooksManagemntReducer,
      token : TokenReduicer,
      page : BooksPageReduicer
    }
}

export default connect(mapSotre,{...Actions}) (Statistique);
 



