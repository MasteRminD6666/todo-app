import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import Header from '../Header';
import Form from '../Form';
import List from '../List';
import { v4 as uuid } from 'uuid';
import { ListContext } from '../../context/list';

const ToDo = () => {
  const listObject = useContext(ListContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <Header incomplete={incomplete} />
      <Form handleChange={handleChange} handleSubmit={handleSubmit} />
      <List list={list} toggleComplete={toggleComplete} />
    </>
  );
};

export default ToDo;
