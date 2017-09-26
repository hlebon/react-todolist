import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TareasContainer from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TareasContainer />, document.getElementById('root'));
registerServiceWorker();
