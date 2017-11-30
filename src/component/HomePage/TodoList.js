import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'

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
        <div>https://dribbble.com/shots/3246783-Reminder-UI</div>
      </div>
  </div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired
}

function ItemList(props) {
  return (
    <div>
      <ul className="list">
        {props.list.map((item, index) => (
          <li className="item-list" key={index}>
            <Item item={item}/>
          </li>
        ))}
      </ul>
    </div>)
}

ItemList.propTypes = {
  list: PropTypes.array.isRequired
}

class TodoList extends Component {
    state = {
      value: "",
    }
      
    onChangeValue = (event) => {
      const query = event.target.value;
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
          showList = list.filter((item) => match.test(item.title))
        }else{
          showList = list
        }

        return (
          <div className="cflex-column">
            <div className="input-group">
              <input value={this.state.value}
                onChange={this.onChangeValue}
                type="text" placeholder="New Task" className="form-control" />
            </div>
            <ItemList list={showList} removeTask={onRemoveTask} />
            <Link to="/add">Add</Link>
          </div>
        )
      }
    }

    TodoList.propTypes = {
      list: PropTypes.array.isRequired, 
      onRemoveTask: PropTypes.func.isRequired
    }  

export default TodoList;