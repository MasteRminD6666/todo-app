import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
import axios from 'axios';
const API = process.env.REACT_APP_URL;
export const AuthContext = React.createContext();
export default function Auth(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState({});
  const [token, setToken] = useState(null);
  const [capabilities, setCapabilities] = useState(null);

  useEffect(() => {
    const token = cookie.load('auth');
    const acl = cookie.load('acl');
    setCapabilities(acl);
    validateToken(token);
  }, []);

  const validateToken = (token) => {
    if (token !== 'undefined' && token !== 'null') {
      const user = jwt.decode(token);
      setLoginState(true, token, user);
    } else {
      setLoginState(false, null, {});
    }
  };

  const setLoginState = async (loggedIn, token, user) => {
    cookie.save('auth', token);

    await setToken(token);
    await setLoggedIn(loggedIn);
    await setUsername(user);
  };

  const login = async (username, password) => {

    try {
      const response = await superagent
        .post(`${API}/sign-in`)
        .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
      let arrayOfCapabilities = response.body.capabilities
  

      setCapabilities(arrayOfCapabilities);
      cookie.save('Capabilities', arrayOfCapabilities);

      validateToken(response.body.token);
    } catch (error) {
      console.error('LOGIN ERROR', error.message);
    }
  };

  const logout = () => {
    setCapabilities(null);
    setLoginState(false, null, {});
  };

  const signUp = async (email,username, password, role) => {
    const response = await axios.post(`${API}/signup`, { email:email,username: username, password: password, role: role });
    let arrayOfCapabilities = response.body
    console.log('response array',arrayOfCapabilities);
    login(username, password, role)
    validateToken(response.data.token);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, token, capabilities, login, logout, signUp }}>
      {props.children}
    </AuthContext.Provider>
  );
}
