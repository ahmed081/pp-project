import React , {useState,useEffect} from "react"
import {
    Layout,
    Col,
    Row,
    Form,
    Input,
    Button
    } from 'antd';
import {BodyStyle,ContactUsStyle} from "../../style"


const { TextArea } = Input;

const ContactUs =(props)=>{


    const size =(span , offset=0)=>{
        return {span , offset}
    }
    return (
        
            <Row>
                <Col xl={{...size(10,2)}}  md={{...size(14)}} sm={{...size(0)}} xs={{...size(0)}} style={ContactUsStyle.LeftSide} > left</Col>
                <Col xl={{...size(12)}}  md={{...size(10)}} sm={{...size(20,4)}} xs={{...size(20,4)}} style={ContactUsStyle.RightSide}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                    >
                    <Form.Item label="subject" rules={[{ required: true }]}>
                        <Input placeholder="entrer subject" />
                    </Form.Item>
                    <Form.Item label="Message" rules={[{ required: true }]}>
                        <TextArea 
                            autoSize={{ minRows: 10}}
                            placeholder="Message" 
                            allowClear 
                        />
                    </Form.Item>
                    <Form.Item wrapperCol= {{ offset: 4, span: 16 }} >
                        <Button type="ghost " htmlType="submit">
                                Envoyer
                        </Button>
                    </Form.Item>
                    </Form>

                </Col>
            </Row>
                
    )
}




export default ContactUs