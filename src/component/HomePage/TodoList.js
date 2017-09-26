import React from 'react';

function TodoList(props) {
    console.log(props)
    return (
      <ul className="list-group">{props.tasks.map((task, index) => (
        <li key={index} className="list-group-item">
          <span>{task.name}</span>
          <a onClick={() => props.removeTask(task.name)}
            className="float-right">&times;</a>
        </li>
      ))}
      </ul>)
    }

export default TodoList