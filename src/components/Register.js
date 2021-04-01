import React, { Button, useState, useHistory } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Register.css';

const Register = ({onRegister}) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    let { username, confirmPassword, password, email } = userData;
    e.preventDefault();
    console.log({ username, password, email })
    onRegister({ username, password, email }).catch(
      err => setMessage(err.message || 'Что-то пошло не так')
    )
  }
  return (
    <div className="register">
      <Logo title={'CryptoDucks'} />
      <p className="register__welcome">
        Пожалуйста, зарегистрируйтесь.
        </p>
      <p className="register__error">
        {message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="username">
          Логин:
          </label>
        <input id="username" name="username" type="text" value={userData.username} onChange={handleChange} />
        <label htmlFor="email">
          Email:
          </label>
        <input id="email" name="email" type="email" value={userData.email} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
          </label>
        <input id="password" name="password" type="password" value={userData.password} onChange={handleChange} />
        <label htmlFor="confirmPassword">
          Подтвердите пароль:
          </label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={userData.confirmPassword} onChange={handleChange} />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;