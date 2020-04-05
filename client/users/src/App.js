import React from 'react';
import './App.css';
import { Layout,Button,Input ,Row,Col} from 'antd';
import image from "./backgroundImage.jpg";

const { Search } = Input;
const { Header, Footer, Sider, Content} = Layout;
function App() {
  return (
    <Layout style={{background: `url(${image})`,backgroundRepeat: "no-repeat",backgroundSize: "cover"}}>
    <Header style={{padding: "0px 33px",}}>
    <Row>
      
      <Col xs={{span:24}} sm={{span:24}} md={{span:18,offset:3}} lg={{span:18,offset:3}} >
          <Search
              onSearch={value => console.log(value)}
              placeholder="Search here"
              style={{ width: "100%",borderRadius:9}}
          />
        </Col>
    </Row>
    
        
        
    </Header>
    <Layout>
      
      <Content>Content</Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
  );
}

export default App;
