import React from 'react';

function Tareas(props) {
    console.log(props)
    return (
      <ul>{props.tareas.map((tarea) => (
        <li key={tarea.nombre}>
          <span>{tarea.nombre}</span>
          <button onClick={() => props.removeTask(tarea.nombre)}>x</button>
        </li>
      ))}
      </ul>)
    }

export default Tareas