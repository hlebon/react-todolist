import React, { Component } from 'react';
import TodoList from './component/HomePage/TodoList'
import TodoEdit from './component/EditPage/TodoEdit'
import AddTask from './component/AddPage/AddTask'
import { Route } from 'react-router-dom'


const Todo = [
  {
    title: "Hacer Super",
    description: "Comprar para el desayuno de mañana y el almuerzo",
    author: "Hans",
    creationDate: "14/11/2017",
    complete: false
  },
  {
    title: "Pintar la casa",
    description: "LLamar para preguntar a que hora puedo pasar por la pintura",
    author: "Daniel",
    creationDate: "25/10/2017",
    complete: true
  },
  {
    title: "Estudiar para examen",
    description: "Estudiar los ultimos dos capitulos PMBOOK",
    author: "Claudia",
    creationDate: "8/11/2017",
    complete: false
  }
]



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
      <div className="container">
        <Route exact path="/" render={()=> (
          <TodoList list={this.state.list} onRemoveTask={this.onRemoveTask}/>
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
