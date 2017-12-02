import React, { Component } from 'react';
import TodoList from './component/HomePage/TodoList'
import TodoEdit from './component/EditPage/TodoEdit'
import AddTask from './component/AddPage/AddTask'
import { Route } from 'react-router-dom'


const Todo = [
  {
    id: 1,
    title: "Hacer Super",
    description: "Comprar para el desayuno de mañana y el almuerzo",
    author: "Hans",
    creationDate: "14/11/2017",
    complete: false
  },
  {
    id: 2,
    title: "Pintar la casa",
    description: "LLamar para preguntar a que hora puedo pasar por la pintura",
    author: "Daniel",
    creationDate: "25/10/2017",
    complete: true
  },
  {
    id: 3,
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

  handleAddTask = (task) => {
    task["id"] = this.state.list.length + 1
    task["complet"] = false
    task["creationDate"] = (new Date()).toDateString()
    task["author"] = "Hans"
    console.log(task);
    console.log(this.state.list)
    this.setState((state) => ({
      list: state.list.concat([task])
    }))
  }

  onRemoveTask = (task) => {
    this.setState((state) => ({
      list: state.list.filter((t) => t.id !== task)
    }))
  }

  render(){
    return(
      <div className="container">
        <Route exact path="/" render={()=> (
          <TodoList list={this.state.list} onRemoveTask={this.onRemoveTask}/>
        )}/>
        <Route path="/add" render={({history})=> (
          <AddTask addTask={(task) => {
            this.handleAddTask(task);
            history.push("/");
          }}
          />
        )}/>
      </div>
    )
  }
}

export default App
