import React, { Component } from 'react';
import TodoHome from './component/HomePage/TodoHome'
import TodoEdit from './component/EditPage/TodoEdit'
import { Route } from 'react-router-dom'

class App extends Component{
  render(){
    return(
      <div>
        <Route exact path="/" render={()=> (
          <TodoHome/>
        )}/>
        <Route path="/edit" render={()=> (
          <TodoEdit/>
        )}/>
      </div>
    )
  }
}

export default App
