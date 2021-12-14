import React, { useEffect, useContext } from 'react';
import Header from '../header/Header';
import Form from './form/Form';
import List from './list/List';
import { ListContext } from '../../context/list';
import { AuthContext } from '../../context/auth';
import Auth from '../Auth';
import './to-do.scss';

const ToDo = () => {
  const { list, incomplete } = useContext(ListContext);
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <div className="form-list">
      <Auth capability="write">
        <Form />
      </Auth>
      <Auth capability="read">
        <List />
      </Auth>
    </div>
  );
};

export default ToDo;
