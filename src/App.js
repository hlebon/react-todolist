import { Component } from 'react';
import TodoHome from './component/TodoHome'
import TodoEdit from './component/TodoList'

import './App.css';


class App extends Component{
  render(){
    return(
      <div className="container">
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

