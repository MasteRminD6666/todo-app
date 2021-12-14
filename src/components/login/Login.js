import React, { useState, useContext } from 'react';
import './login.css';
import { AuthContext } from '../../context/auth';

function LogIn() {
  const [switcher, setSwitcher] = useState(false);
  const { login, signUp, loggedIn } = useContext(AuthContext);

  const [values, setValues] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.role) {
      const res = login(values.username, values.password);
    } else {
      const res = signUp(values.username, values.password, values.role);
    }
  }

  function handleChange(e) {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  }

  function switchBtn(e) {
    setValues({});
    const switcher = e ? true : false;
    setSwitcher(switcher);
  }

  return (
    <>
      {!loggedIn && (
        <div className="login-page">
          <div className="form">
            {switcher && (
              <form onSubmit={handleSubmit} className="login-form">
                <input type="text" onChange={handleChange} name="username" placeholder="username" />
                <input type="password" onChange={handleChange} name="password" placeholder="password" />
                <label for="role">Choose a role:</label>
                <select onClick={handleChange} style={{ width: '10rem', marginBottom: '14px' }} name="role" id="role">
                  <option value="manager">manager</option>
                  <option value="employee">employee</option>
                  <option value="client">client</option>
                </select>
                <button>create</button>
                <p className="message">
                  Already registered?{' '}
                  <a onClick={() => switchBtn(false)} href="#">
                    Sign In
                  </a>
                </p>
              </form>
            )}
            {!switcher && (
              <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name="username" placeholder="username" />
                <input type="password" onChange={handleChange} name="password" placeholder="password" />
                <button>login</button>
                <p className="message">
                  Not registered?{' '}
                  <a onClick={() => switchBtn(true)} href="#">
                    Create an account
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LogIn;
