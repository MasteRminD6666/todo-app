import React from 'react';
import './App.scss'
import ToDo from './components/todo/todo.js';
import ListContext from './context/list';
export default class App extends React.Component {
  render() {
    return (
      <ListContext>
        <ToDo />
      </ListContext>
    );
  }
}
