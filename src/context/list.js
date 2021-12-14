import React, { useState, useEffect } from 'react';
export const ListContext = React.createContext();
import { v4 as uuid } from 'uuid';

function list(props) {
  const [list, setList] = useState([]);
  const [values, setValues] = useState({});
  const [incomplete, setIncomplete] = useState([]);
  const [number, setNumber] = useState(3);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [LS, setLS] = useState(0);

  function handleSubmit(event) {
    if (event) event.preventDefault();
    values.id = uuid();
    values.complete = false;
    setList([...list, values]);
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    event.target.reset();
  }

  function handleChange(event) {
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  function handleNumber(e) {
    setNumber(Number(e.target.value));
  }

  function handleIncomplete() {
    setShowIncomplete(!showIncomplete);
  }

  function save(e) {
    e.preventDefault();
    const obj = { number: e.target.pageNumber.value, showIncomplete: e.target.incomplete.value };
    localStorage.setItem('settings', JSON.stringify(obj));
    setLS(LS + 1);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  useEffect(() => {
    let local = localStorage.getItem('settings');
    if (local) {
      let settings = JSON.parse(local);
      setNumber(Number(settings.number));
      if (settings.showIncomplete == 'true') setShowIncomplete(true);
      if (settings.showIncomplete == 'false') setShowIncomplete(false);
    }
  }, [LS]);

  return (
    <ListContext.Provider
      value={{
        list,
        handleSubmit,
        handleChange,
        incomplete,
        toggleComplete,
        number,
        handleNumber,
        showIncomplete,
        handleIncomplete,
        save,
        deleteItem,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}

export default list;
