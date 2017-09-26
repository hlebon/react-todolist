import React from 'react';

function TodoList(props) {
    console.log(props)
    return (
      <ul>{props.tasks.map((task) => (
        <li key={task.name}>
          <span>{task.id}</span>
          <button onClick={() => props.removeTask(task.id)}>x</button>
        </li>
      ))}
      </ul>)
    }

export default TodoList