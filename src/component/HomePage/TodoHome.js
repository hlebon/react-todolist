import {Component} from 'react';
import TodoHome from './TodoList'

const Todo = [
    { nombre: "Hacer Super" },
    { nombre: "Estudiar React" },
    { nombre: "Hacer deporte" },
    { nombre: "Sacar a pasear al perro" }]
  
  
  class TodoHome extends React.Component {
      state = {
        value: "",
        list: []
      }
  
      componentDidMount(){
        this.setState({
          list: Todo
        })
      }
    
      onChangeValue = (value) => {
        this.setState({
          value: value
        })
      }
    
      onAddTask = () => {
        this.setState((state) => ({
          list: state.list.concat({ nombre : this.state.value})
        }))
    
        this.setState({
          value: ""
        })
      }
    
      onRemoveTask = (task) => {
        this.setState((state) => ({
          list: state.list.filter((t) => t.nombre !== task)
        }))
      }
  
      render() {
        return (
          <div>
            <div>
              <label>Todo List</label>
              <input value={this.state.value}
                onChange={(event) => this.onChangeValue(event.target.value)}
                type="text" />
              <button onClick={this.onAddTask}>Guardar</button>
            </div>
            <Tareas tasks={this.state.list} removeTask={this.onRemoveTask} />
          </div>
        )
      }
    }
  
  export default TodoHome;