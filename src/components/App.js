import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

const App = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  })
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false
  })
  const history = useHistory();

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/ducks");
    }
  }, [loggedIn])

  const handleLogin = ({ username, password }) => {
    return duckAuth.authorize(username, password)
      .then((data) => {
        if (!data) throw new Error('Неверные имя пользователя или пароль')
        if (data.jwt) {
          setLoggedIn(true)
          localStorage.setItem('jwt', data.jwt)
          history.push('/ducks')
          return;
        }
      })
  }

  const handleRegister = ({ username, password, email }) => {
    console.log({ username, password, email })
    return duckAuth.register({ username, password, email }).then((res) => {
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      return res;
    }).catch()
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      duckAuth.getContent(jwt).then(({ username, email }) => {
        if (username) {
          setLoggedIn(true)
          setUserData({ username, email })
        }
      });
    }
  }
  return (
    <Switch>
      <ProtectedRoute path="/ducks" loggedIn={loggedIn} component={Ducks} />
      <ProtectedRoute path="/my-profile" loggedIn={loggedIn} userData={userData} component={MyProfile} />
      <Route path="/login">
        <div className="loginContainer">
          <Login onLogin={handleLogin} />
        </div>
      </Route>
      <Route path="/register">
        <div className="registerContainer">
          <Register onRegister={handleRegister} />
        </div>
      </Route>
      <Route>
        {loggedIn ? <Redirect to="/ducks" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  )
}

export default App;
