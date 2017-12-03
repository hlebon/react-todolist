import React, { Component } from 'react';
import TodoList from './component/HomePage/TodoList'
import AddTask from './component/AddPage/AddTask'
import { Route } from 'react-router-dom'

const Todo = [
  {
    id: 1,
    title: "Hacer Super",
    description: "Comprar para el desayuno de mañana y el almuerzo",
    creationDate: (new Date("2017-10-2")).toLocaleDateString(),
    completed: false
  },
  {
    id: 2,
    title: "Pintar la casa",
    description: "LLamar para preguntar a que hora puedo pasar por la pintura",
    creationDate: (new Date("2017-8-7")).toLocaleDateString(),
    completed: true
  },
  {
    id: 3,
    title: "Estudiar para examen",
    description: "Estudiar los ultimos dos capitulos PMBOOK",
    creationDate: (new Date("2017-11-3")).toLocaleDateString(),
    completed: false
  }
]

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component{
  state = {
    list: []
  }

  componentDidMount(){
    this.setState({
      list: Todo
    })
  }

  onDragEnd = (result) => {
    console.log(result)
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const list = reorder(
      this.state.list,
      result.source.index,
      result.destination.index
    );

    this.setState({
      list,
    });
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

  onCompleteTask = (objItem) => {
    this.setState((prevState) => ({
      list: prevState.list.map((item)=>{
        if(item.id === objItem.id){
          item.completed = !item.completed
        }
        return item
      })
    }))
  }

  render(){
    return(
      <div className="container">
        <Route exact path="/" render={()=> (
          <TodoList onDragEnd={this.onDragEnd} list={this.state.list} onRemoveTask={this.onRemoveTask} onCompleteTask={this.onCompleteTask}/>
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
