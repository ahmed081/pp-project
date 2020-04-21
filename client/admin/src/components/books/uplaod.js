import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React,{useState,useEffect} from 'react'
const UplaodIt =(props)=>{



    return(
      <Upload {...props}>
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </Upload>
    )
}
export default UplaodIt