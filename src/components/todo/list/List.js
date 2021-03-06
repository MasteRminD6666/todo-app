import React, { useContext, useState, useEffect } from 'react';
import './list.scss';
import { ListContext } from '../../../context/list';
import { Button, Card, Elevation, Switch } from '@blueprintjs/core';
import Form from 'react-bootstrap/Form';
import Auth from '../../Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function List() {
  const { list, toggleComplete, number, showIncomplete, handleNumber, handleIncomplete, deleteItem } =
    useContext(ListContext);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(null);

  useEffect(() => {
    setStart(0);
    setEnd(number);
    const pages = [];
    for (let i = 1; i <= Math.ceil(filter.length / number); i++) {
      pages[i] = i;
    }
    setPage(pages);
  }, [number]);

  useEffect(() => {
    setFilter(list);
  }, [list]);

  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(filter.length / number); i++) {
      pages[i] = i;
    }
    setPage(pages);
  }, [filter]);

  useEffect(() => {
    if (showIncomplete) setFilter(() => filter.filter((item) => item.complete != true));
    else setFilter(list);
  }, [showIncomplete]);

  function next(num, length) {
    if (start + Math.abs(num) > length) return;
    setStart(start + num);
    setEnd(end + num);
  }

  function back(num) {
    if (start - Math.abs(num) < 0) return;
    setStart(start + num);
    setEnd(end + num);
  }

  function pagination(pages) {
    setStart((Number(pages) - 1) * number);
    setEnd(Number(pages) * number);
  }

  return (
    <div className="list-container" style={{ marginTop: "1rem" }}>
      <h1>👻</h1>
      <Switch defaultChecked={showIncomplete} onClick={handleIncomplete}>
        Only In-Complete
      </Switch>
      <div className="page-select">
        <Form.Label>Number of Item Displayed</Form.Label>
        <Form.Select onClick={handleNumber} size="sm">
          <option disabled value="">
            Select One
          </option>
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
        </Form.Select>
      </div>

      <ul>
        {filter.slice(start, end).map((item) => {
          const deff = item.difficulty > 3 ? 'hard' : item.difficulty == 3 ? 'medium' : 'easy';
          return (
            <Card key={item.id} interactive={true} elevation={Elevation.ZERO} className="card" style={{ marginTop: "2rem" }}>
              <div className="delete-btn">
                <h5>
                  <span
                    className={
                      item.difficulty > 3
                        ? 'bp3-tag bp3-round bp3-intent-danger'
                        : item.difficulty == 3
                          ? 'bp3-tag bp3-round bp3-intent-warning'
                          : 'bp3-tag bp3-round bp3-intent-success'
                    }
                  >
                    {deff}
                  </span>
                  <span> {item.assignee} </span>
                </h5>
                <Auth capability="delete">
                  <Button className="bp3-small bp3-intent-danger" icon="trash" onClick={() => deleteItem(item.id)} />
                </Auth>
              </div>

              <p>{item.text}</p>
              <Auth capability="update">
                <Button
                  className={
                    item.complete
                      ? 'bp3-small bp3-outlined bp3-intent-success'
                      : 'bp3-small bp3-outlined bp3-intent-danger'
                  }
                  onClick={() => toggleComplete(item.id)}
                >
                  {item.complete ? 'Complete' : 'Incomplete'}
                </Button>
              </Auth>
            </Card>
          );
        })}
      </ul>
      <div className="navigation">
        {start > 0 && <Button icon="arrow-left" intent="success" outlined onClick={() => back(number * -1)} />}
        {page && (
          <div className="nav-page">
            {page.map((pages) => (
              <Button key={`page-${pages}`} id={pages} intent="Primary" outlined onClick={() => pagination(pages)}>
                {pages}
              </Button>
            ))}
          </div>
        )}
        {end < filter.length && (
          <Button icon="arrow-right" intent="success" outlined onClick={() => next(number, filter.length)} />
        )}
      </div>
    </div>
  );
}


