import React from 'react';
import { Button, FormGroup, InputGroup, Card, Elevation } from "@blueprintjs/core";
import '../components/scss/slider.css'
function todoForm(props) {

    return (
        <div>
            <Card className="bp3-card .modifier" interactive={true} elevation={Elevation.TWO}>
                <h2>Add To Do Item</h2>
                <form onSubmit={props.handleSubmit}>


                    <FormGroup
                        helperText="Add To Do Item"
                        label="Item Details"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup name="text" onChange={props.handleChange} id="text-input" placeholder="Item Details" />
                    </FormGroup>
                    <FormGroup
                        helperText="Assigned To"
                        label="Assigned To"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup onChange={props.handleChange} id="text-input" placeholder="Assignee Name" name="assignee" />
                    </FormGroup>


                    <label>
                        <span style={{ marginRight: "10px" }}>Difficulty</span>
                        <input onChange={props.handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
                    </label>

                    <Button style={{ marginLeft: "30px" }} type="submit" rightIcon="arrow-right" intent="success" text="Add item" />


                </form>
            </Card>

        </div>
    );
}

export default todoForm;