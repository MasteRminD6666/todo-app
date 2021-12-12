import React, { useState } from 'react';
export const ListContext = React.createContext();
import { v4 as uuid } from 'uuid';

function list(props) {
    const [list, setList] = useState([]);
    const [values, setValues] = useState({});

    function handleSubmit(event) {
        if (event) event.preventDefault();
        values.id = uuid();
        values.complete = false;
        setList([...list, values]);
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

    return <ListContext.Provider value={{ list, handleSubmit, handleChange, toggleComplete }}>{props.children}</ListContext.Provider>;
}

export default list;