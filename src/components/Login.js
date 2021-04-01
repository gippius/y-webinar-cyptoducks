import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Login.css';

const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userData)
    .catch(err => setMessage(err.message || 'Что-то пошло не так'));
  }
  return (
    <div onSubmit={handleSubmit} className="login">
      <Logo title={'CryptoDucks'} />
      <p className="login__welcome">
        Это приложение содержит конфиденциальную информацию.
        Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
        </p>
      <p className="login__error">
        {message}
      </p>
      <form className="login__form">
        <label htmlFor="username">
          Логин:
          </label>
        <input id="username" required name="username" type="text" value={userData.username} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
          </label>
        <input id="password" required name="password" type="password" value={userData.password} onChange={handleChange} />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Login;