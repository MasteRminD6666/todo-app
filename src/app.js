import React, { useContext } from 'react';
import ListContext from './context/list';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ToDo from './components/todo/todo';
import Header from './components/header/Header';
import LogIn from './components/login/Login';
import Setting from './components/setting/Setting';
import { If, Else, Then } from 'react-if';
import { AuthContext } from './context/auth';
import { ThemeContext } from './context/Theme';
import './App.scss'


export default function App() {
  const { loggedIn } = useContext(AuthContext);
  const [theme, isDark, toggleTheme] = useContext(ThemeContext);
  console.log("theme", theme);

  return (
    <>
      <div className="app" style={{ backgroundColor: theme.backgroundColor, color: theme.color }} >
        <ListContext>
          <BrowserRouter>
            <Header />
            <If condition={!loggedIn}>
              <Then>
                <LogIn />
              </Then>
              <Else>
                <Switch>
                  <Route exact path="/">
                    <ToDo />
                  </Route>
                  <Route exact path="/setting">
                  <Setting />
                </Route>
                  <Route exact path="/todo">
                  <ToDo />
                  </Route>
                </Switch>
              </Else>
            </If>
          </BrowserRouter>
        </ListContext>
      </div>
    </>
  );
}
