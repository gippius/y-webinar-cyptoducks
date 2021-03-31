import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

// 4.1 переписываем компонент на функциональный
// const App = () => {
class App extends React.Component {
  // 4.2 убираем конструктор
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.tokenCheck = this.tokenCheck.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  // 4.3 создаем стейт нового формата
  // const [loggedIn, setLoggedIn] = useState();
  // const [userData, setUserData] = useState({
  //   userName: '',
  //   email: ''
  // })

  componentDidMount() {
    this.tokenCheck();
  };

  // 4.4. добавить useEffect(()=>{
  // tokenCheck()
  // }, [])
  // переписать методы на функции

  // 5.3 useEffect(()=>{
  // if (loggedIn) {
  // history.push('/ducks')
  // }
  // }, [loggedIn])

  handleLogin() {
    // 4.5 комментим логику, здесь будет логика из компонента Login
    this.setState({
      loggedIn: true
    })
  }

  // 6.1 проверка токена при логине: переписать tokenCheck на useEffect сверху
  tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      duckAuth.getContent(jwt).then((res) => {
        if (res) {
          let userData = {
            username: res.username,
            email: res.email
          }
          this.setState({
            loggedIn: true,
            userData
          }, () => {
            this.props.history.push("/ducks");
          });
        }
      });
    }
  }

  // 4.6 убрать tokenCheck из Login, закоммититься

  // 5.1 начать писать функции-обработчики, которые будут передаваться в Login и Register
  // const handleRegister = () => {  
  // 5.2 статускод 200 - редирект на логин, useEffect с loggedIn
  // 5.4 статускод 400 - отображение ошибки в message
  // 5.5 проверить работу регистрации
  // duckAuth.register(username, password, email).then().catch()
  // }

  // 5.5 написать функцию авторизации
  // const handleLogin = (username, password) => {
  //   duckAuth.authorize(username, password).then().catch()
  // }
  // переносим данные из duckAuth.js

  // 6.1 добавляем работу с localStorage

  // 7.1 перенести функцию логаута из NavBar - прокидывать ее туда пропсом
  // 8 избавиться от задержки при начальной загружки приложения можно, задав начальный loggedIn null

  render() {
    return  (
      <Switch>
        <ProtectedRoute path="/ducks" loggedIn={this.state.loggedIn} component={Ducks} />
        <ProtectedRoute path="/my-profile" loggedIn={this.state.loggedIn} userData={this.state.userData} component={MyProfile} />
        <Route path="/login">
          <div className="loginContainer">
            <Login handleLogin={this.handleLogin} tokenCheck={this.tokenCheck} />
          </div>
        </Route>
        <Route path="/register">
          <div className="registerContainer">
            <Register />
          </div>
        </Route>
        <Route>
          {this.state.loggedIn ? <Redirect to="/ducks" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    )
  }
}

export default withRouter(App);
