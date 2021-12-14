import React, { useContext } from 'react';
import { ListContext } from '../../../context/list';
import { FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import { ThemeContext } from '../../../context/Theme';
import './form.css';
function Form() {
  const { handleSubmit, handleChange } = useContext(ListContext);
  const [theme, isDark, toggleTheme] = useContext(ThemeContext);


  return (
    <div className="app" style={{ backgroundColor: theme.backgroundColor, color: theme.color, marginTop: '12rem' }} >
      <div className="form1">
        <h1>💀</h1>
        <h1>Add To Do Item</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormGroup label="To-Do Details" labelInfo="(required)" required="true">
              <InputGroup
                onChange={handleChange}
                name="text"
                placeholder="Add item"
                intent={Intent.PRIMARY}
              />
            </FormGroup>
            <FormGroup label="Assignee Name" labelFor="text-input" labelInfo="(required)" required="true">
              <InputGroup onChange={handleChange} name="assignee" placeholder="Assignee Name" intent={Intent.PRIMARY} />
            </FormGroup>
            <FormGroup label="Difficulty" labelFor="range">
              <input
                className="deff"
                onChange={handleChange}
                defaultValue={3}
                type="range"
                min={1}
                max={5}
                name="difficulty"
              />
            </FormGroup>
            <FormGroup>
              <InputGroup type="submit" intent={Intent.DANGER} />
            </FormGroup>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}

export default Form;
