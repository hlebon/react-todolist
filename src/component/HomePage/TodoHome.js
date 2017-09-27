import React, { Component } from 'react';
import TodoList from './TodoList'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

  class TodoHome extends Component {
      state = {
        value: "",
      }
      
      onChangeValue = (query) => {
        this.setState({
          value: query.trim()
        })
      }
  
      render() {
        const { list, onRemoveTask } = this.props;
        const { value } = this.state;

        let showList
        if(value){
          const match = new RegExp(escapeRegExp(this.state.value), "i");
          showList = list.filter((item) => match.test(item.name))
        }else{
          showList = list
        }


        return (
          <div className="container">
            <div className="input-group">
              <input value={this.state.value}
                onChange={(event) => this.onChangeValue(event.target.value)}
                type="text" className="form-control" placeholder="New Task" />
            </div>
            <TodoList list={showList} removeTask={onRemoveTask} />
            <Link to="/add" className="create float-right btn btn-primary">Add</Link>
          </div>
        )
      }
    }
  
  export default TodoHome;