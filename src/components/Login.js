import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Login.css';

// 3.1 поменять на функциональный
// const Login = () => {
  // 5.1 добавить пропс handleLogin
class Login extends React.Component {
  // 3.1 убрать конструктор
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // 3.2 создать стейты для данных пользователя и сообщения
  // const [data, setData] = useState({
  //   username: '',
  //   password: ''
  // })
  // const message, setMessage = useState('')

  // 3.3 заменить методы класса на на функции
  // удалить handleChange
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    // 3.4 переписать параметры со ссылками на стейт
    if (!this.state.username || !this.state.password) {
      return;
    }
    duckAuth.authorize(this.state.username, this.state.password)
      .then((data) => {
        console.log(data)
        if (!data) {
          return this.setState({
            message: 'Что-то пошло не так!'
          });
        }
        if (data.jwt) {
          // 3.5 проверить успешный логин, поменять setState на новый setData
          this.setState({ email: '', password: '', message: '' }, () => {
            this.props.handleLogin();
            this.props.history.push('/ducks');
            return;
          })
        }
      })
      // 3.6 убрать withRouter - его функцию у нас выполняет history
      // 3.7 проверяем работоспособность, коммитим изменения компонента
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div onSubmit={this.handleSubmit} className="login">
        <Logo title={'CryptoDucks'} />
        <p className="login__welcome">
          Это приложение содержит конфиденциальную информацию.
          Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
        </p>
        <p className="login__error">
          {this.state.message}
        </p>
        <form className="login__form">
          <label htmlFor="username">
            Логин:
          </label>
          <input id="username" required name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label htmlFor="password">
            Пароль:
          </label>
          <input id="password" required name="password" type="password" value={this.state.password} onChange={this.handleChange} />
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
}

export default withRouter(Login);