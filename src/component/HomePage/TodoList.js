import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import MdAdd from 'react-icons/lib/md/add'
import MdSearch from 'react-icons/lib/md/search'
import MdDelete from 'react-icons/lib/md/delete'
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up'

function Item(props){
  return (
    <div className="cflex-wrap">
      <div className="cfw-author center-item">
          {props.item.author[0].toUpperCase()}
      </div>
      <div className="cfw-content cflex-column">
        <div>{props.item.title}</div>
        <small>{props.item.creationDate}</small>
      </div>
      <div className="cfw-options center-item">
        <span onClick={() => props.removeTask(props.item.id)}>
          <MdDelete/>
        </span>
      </div>
  </div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired
}

function ItemList(props) {
  return (
    <div>
      <ul className="list">
        {props.list.map((item, index) => (
          <li className="item-list" key={item.id}>
            <Item item={item} removeTask={props.removeTask}/>
          </li>
        ))}
      </ul>
    </div>)
}

ItemList.propTypes = {
  list: PropTypes.array.isRequired,
  removeTask: PropTypes.func.isRequired
}

class TodoList extends Component {
    state = {
      value: "",
      onSearch: false
    }
      
    onChangeValue = (event) => {
      const query = event.target.value;
        this.setState({
          value: query.trim()
        })
    }

    onCreateTaks = () => {
      alert("Hola desde onCreate Task")
    }

    showInputSearch = () => {
      this.setState({
        onSearch: true
      })
    }

    hideInputSearch = () => this.setState({ onSearch: false })
  
    render() {
        const { list, onRemoveTask } = this.props;
        const { value, onSearch } = this.state;

        let showList
        if(value){
          const match = new RegExp(escapeRegExp(this.state.value), "i");
          showList = list.filter((item) => match.test(item.title))
        }else{
          showList = list
        }
        
        return (
          <div className="cflex-column">
            <div className="head cflex-wrap">
              <div className="title">
                Tareas
              </div>
              <div className="img">
                <Link to="/add">
                  <MdAdd/>
                </Link>
                { onSearch 
                  ? <MdKeyboardArrowUp onClick={this.hideInputSearch}/>
                  : <MdSearch onClick={this.showInputSearch}/>
                }
                
              </div>
            </div>
            {this.state.onSearch && 
              <div className="input-group">
                <input value={this.state.value}
                  onChange={this.onChangeValue}
                  type="text" placeholder="Search..." className="form-control" />
              </div>
            }
            <ItemList list={showList} removeTask={onRemoveTask} />
          </div>
        )
      }
    }

    TodoList.propTypes = {
      list: PropTypes.array.isRequired, 
      onRemoveTask: PropTypes.func.isRequired
    }  

export default TodoList;