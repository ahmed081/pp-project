import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Login from './login'
import SignUp from './SignUp'

const Index = (props)=>{

    return (
        <div>
            <Switch>
            <Route path='/login' exact component={Login} />
                <Route path='/signup'  component={SignUp} />
                
                <Route path='*'  render={()=> <Redirect to='/login'/>} />
            </Switch>
        </div>
    )
}
export default Index