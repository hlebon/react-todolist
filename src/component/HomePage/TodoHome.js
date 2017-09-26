import React, { Component } from 'react';
import TodoList from './TodoList'

const Todo = [
    { name: "Hacer Super" },
    { name: "Estudiar React" },
    { name: "Hacer deporte" },
    { name: "Sacar a pasear al perro" }]
  
  
  class TodoHome extends Component {
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
          list: state.list.concat({ name : this.state.value})
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
  
      render() {
        return (
          <div className="container">
            <div className="input-group">
              <input value={this.state.value}
                onChange={(event) => this.onChangeValue(event.target.value)}
                type="text" className="form-control" placeholder="New Task" />
              <span className="input-group-btn">
                <button onClick={this.onAddTask} className="btn btn-primary">Guardar</button>
              </span>
            </div>
            <TodoList tasks={this.state.list} removeTask={this.onRemoveTask} />
          </div>
        )
      }
    }
  
  export default TodoHome;