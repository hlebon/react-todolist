import React from 'react';

function TodoList(props) {
    return (
      <div>
        <ul className="list-group">
          {props.list.map((item, index) => (
            <li key={index} className="list-group-item list-group-item-action">
              <div>
                <div>
                  <h5>{item.author}</h5>
                  <small className="text-muted float-right">{item.creationDate}</small>
                </div>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>)
    }

export default TodoList