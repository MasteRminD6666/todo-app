import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import Header from '../Header';
import Form from '../Form';
import { v4 as uuid } from 'uuid';
import { ListContext } from '../../context/list';
import Pagination from './Pagination';
const crypto = require("crypto");
const ToDo = () => {
  const listObject = useContext(ListContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const [buttonColor,setButtonColor] = useState('warning');
 
  function addItem(item) {
    console.log(item);
    item.id = crypto.randomBytes(16).toString("hex");;
    item.complete = 'Pending';
    setList([...list, item]);
    if (item.complete =="Pending") {
      setButtonColor("warning")
    }
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
   
    const items = list.map(item => {
      if (item.id == id) {
        item.complete = 'completed';
        setButtonColor("success")
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
   
       <Pagination buttonColor={buttonColor} toggleComplete={toggleComplete} list = {list}/>: null
    </>
  );
};

export default ToDo;
