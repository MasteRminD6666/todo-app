import React from 'react';
import '../components/scss/List.scss';
import { Card } from "@blueprintjs/core";


function showList(props) {

    return (
        <>
            <Card>
                {props.list.map((item) => (
                    <div key={item.id}>
                        <p>{item.text}</p>
                        <p>
                            <small>Assigned to: {item.assignee}</small>
                        </p>
                        <p>
                            <small>Difficulty: {item.difficulty}</small>
                        </p>
                        <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
                        <hr />
                    </div>
                ))}
            </Card>

        </>
    );
}

export default showList;