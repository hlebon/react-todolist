import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Modal from 'react-modal'
import {
  MdAdd,
  MdSearch,
  MdDelete,
  MdKeyboardArrowUp,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdFormatListBulleted
} from 'react-icons/lib/md'


function Item(props) {
    return (
      <div className="cflex-wrap">
        <div className="cfw-author center-item">
            {props.item.title[0].toUpperCase()}
        </div>
        <div className="cfw-content cflex-column">
          <div className={props.item.completed ? "checked" : ""}>{props.item.title}</div>
          <small>{props.item.creationDate}</small>
        </div>
        <div className="cfw-options center-item">
          <span onClick={() => props.openModal(props.item)}>
            <MdFormatListBulleted/>
          </span>
          <span onClick={() => props.removeTask(props.item.id)}>
            <MdDelete/>
          </span>
          <span onClick={() => props.completeTask(props.item)}>
            {props.item.completed ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
          </span>
        </div>
      </div>
    )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

class ItemList extends Component {
  state = {
    isModalOpen : false,
    itemInView: null
  }

  openModal = (item) => {
    this.setState({
      itemInView: item,
      isModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      itemInView: null
    })
  }

  render(){
    const { itemInView } = this.state;

    return (
      <div>
          <ul className="list">
          {this.props.list.map((item, index) => (  
            <li className="item-list" key={item.id}>
              <Item 
                item={item} 
                removeTask={this.props.removeTask} 
                completeTask={this.props.completeTask}
                openModal={this.openModal}/>
            </li>
          ))}
          </ul>
          { itemInView && 
            <Modal 
              className="modal"
              overlayClassName="overlay"
              isOpen={this.state.isModalOpen} 
              onRequestClose={this.closeModal}
              contentLabel='Modal'
              ariaHideApp={false}>
              <div classNanem="detail">
                <h2>Detail</h2>
                <div>
                  <div>
                    <label>Task</label>
                    <p>{itemInView.title}</p>
                  </div>
                  <div>
                    <label>Description</label>
                    <p>{itemInView.description}</p>
                  </div>
                  <div>
                    <label>Creation Date</label>
                    <p>{itemInView.creationDate}</p>
                  </div>
                </div>
              </div>
            </Modal>
          }
      </div>
    )
  }
  
}

ItemList.propTypes = {
  list: PropTypes.array.isRequired,
  removeTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired
}

function EmptyListMessage(props){
  return (
    <div className="emptyList">
      <h2>No hay tareas agregadas</h2>
    </div>
  )
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

    showInputSearch = () =>  this.setState({onSearch: true})
    hideInputSearch = () => this.setState({ onSearch: false })
  
    render() {
        const { list, onRemoveTask, onCompleteTask } = this.props;
        const { value, onSearch } = this.state;

        let newList
        if(value){
          const match = new RegExp(escapeRegExp(this.state.value), "i");
          newList = list.filter((item) => match.test(item.title))
        }else{
          newList = list
        }

        newList.sort(sortBy("-id"))
        
        return (
          <div className="cflex-column">
            <div className="head cflex-wrap">
              <div className="title">
                Task
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
            {newList.length 
            ? <ItemList list={newList} removeTask={onRemoveTask} completeTask={onCompleteTask}/>
            : <EmptyListMessage/>}
            
          </div>
        )
      }
    }

    TodoList.propTypes = {
      list: PropTypes.array.isRequired, 
      onRemoveTask: PropTypes.func.isRequired,
      onCompleteTask: PropTypes.func.isRequired
    }  

export default TodoList;