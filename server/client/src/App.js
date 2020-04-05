import React,{useState} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true
function App() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const checkauto =()=>{
    axios.get(`http://localhost:3030/authrequired`,{withCredentials: true})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }
  const submitForm =()=>{
    //if user is loging 
    
    if(email!=="" && password!=="")
    {
      
      
      axios.post(`http://localhost:3030/login`, { email,password })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
  }
  return (
    <div className="App">
      email
      <input 
        type ="email" 
        value = {email}
        onChange={event=>{setEmail(event.target.value)}} /><br/>
      password
      <input 
        type ="password"
        value = {password}
        onChange={event=>{setPassword(event.target.value)}} /><br/>
        <input type="submit" onClick ={submitForm}/>
        <input type="button" value ="autoriser" onClick ={checkauto}/>
    </div>
  );
}

export default App;
