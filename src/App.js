import React from 'react';
import Tareas from './TodoList'
import './App.css';

const listaDeTareas = [
  { nombre: "Hacer Super" },
  { nombre: "Estudiar React" },
  { nombre: "Hacer deporte" },
  { nombre: "Sacar a pasear al perro" }]


class TareasContainer extends React.Component {
    state = {
      value: "",
      list: []
    }

    componentDidMount(){
      this.setState({
        list: listaDeTareas
      })
    }
  
    onChangeValue = (value) => {
      this.setState({
        value: value
      })
    }
  
    onAddTask = () => {
      this.setState((state) => ({
        list: state.list.concat({ nombre :this.state.value})
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

      console.log(this.state.list);

      return (
        <div>
          <div>
            <label>Tarea</label>
            <input value={this.state.value}
              onChange={(event) => this.onChangeValue(event.target.value)}
              type="text" />
            <button onClick={this.onAddTask}>Guardar</button>
          </div>
          <Tareas tareas={this.state.list} removeTask={this.onRemoveTask} />
        </div>
      )
    }
  }

export default TareasContainer;
