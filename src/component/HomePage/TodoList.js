import React from 'react';

function TodoList(props) {
    console.log(props)
    return (
      <div className="list-group">{props.list.map((item, index) => (
        <a key={index} className="list-group-item list-group-item-action">
          <span>{item.name}</span>
          <button onClick={() => props.removeTask(item.name)}
            className="btn btn-primary rounded-circle float-right">&times;</button>
        </a>
      ))}
      </div>)
    }

export default TodoList