import React, { Component } from 'react';
import TodoHome from './component/HomePage/TodoHome'
import TodoEdit from './component/EditPage/TodoEdit'
import AddTask from './component/AddPage/AddTask'
import { Route } from 'react-router-dom'


const Todo = [
  { name: "Hacer Super" },
  { name: "Estudiar React" },
  { name: "Hacer deporte" },
  { name: "Sacar a pasear al perro" }]


class App extends Component{
  state = {
    list: []
  }

  componentDidMount(){
    this.setState({
      list: Todo
    })
  }

  onAddTask = (task) => {
    this.setState((state) => ({
      list: state.list.concat({ name : task.title})
    }))

    this.setState({
      value: ""
    })
  }

  onRemoveTask = (task) => {
    this.setState((state) => ({
      list: state.list.filter((t) => t.name !== task)
    }))
  }

  render(){
    return(
      <div>
        <Route exact path="/" render={()=> (
          <TodoHome list={this.state.list} onRemoveTask={this.onRemoveTask}/>
        )}/>
        <Route path="/edit" render={()=> (
          <TodoEdit/>
        )}/>
        <Route path="/add" render={({history})=> (
          <AddTask onAddTask={(task) => {
            this.onAddTask(task);
            history.push("/");
          }}
          />
        )}/>
      </div>
    )
  }
}

export default App
