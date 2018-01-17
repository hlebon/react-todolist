import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Modal from 'react-modal'
import MdAdd from 'react-icons/lib/md/add'
import MdSearch from 'react-icons/lib/md/search'
import MdDelete from 'react-icons/lib/md/delete'
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import MdCheckBox from 'react-icons/lib/md/check-box'
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank'
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted'

const styles = {
  modal: {
    overlay: {
      position: "fixed",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      backgroundColor: "rgba(133, 130, 130, 0.753)"
    },
    content: {
      position: "absolute",
      top: "40px",
      left: "200px",
      right: "200px",
      bottom: "40px",
      border: "1px solid rgb(204, 204, 204)",
      background: "rgb(255, 255, 255)",
      overflow: "auto",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
      boxShadow: "0 3px 8px 0 rgba(0,0,0,.24), 0 3px 12px 0 rgba(0,0,0,.12)",
      minWidth: "500px"
    }
  }
}

class Item extends Component{
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
    return (
      <div className="cflex-wrap">
        <div className="cfw-author center-item">
            {this.props.item.title[0].toUpperCase()}
        </div>
        <div className="cfw-content cflex-column">
          <div className={this.props.item.completed ? "checked" : ""}>{this.props.item.title}</div>
          <small>{this.props.item.creationDate}</small>
        </div>
        <Modal 
          style={styles.modal}
          isOpen={this.state.isModalOpen} 
          onRequestClose={this.closeModal}
          contentLabel='Modal'
          >
          Hola
        </Modal>
        <div className="cfw-options center-item">
          <span onClick={() => this.openModal(this.props.item)}>
            <MdFormatListBulleted/>
          </span>
          <span onClick={() => this.props.removeTask(this.props.item.id)}>
            <MdDelete/>
          </span>
          <span onClick={() => this.props.completeTask(this.props.item)}>
            {this.props.item.completed ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
          </span>
        </div>
      </div>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired
}

function ItemList(props) {
  return (
    <div>
        <ul className="list">
        {props.list.map((item, index) => (  
          <li className="item-list" key={item.id}>
            <Item item={item} removeTask={props.removeTask} completeTask={props.completeTask}/>  
          </li>
        ))}
        </ul>
    </div>)
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