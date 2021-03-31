import React, { Button } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Register.css';

// 2.1 заменить на функциональный компонент
// понадобится поменять функции на новый формат (больше не методы классов)
// const Register = ({ handleRegistration }) => {
class Register extends React.Component {
  // 2.2 убрать весь конструктор
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // 2.3 использовать хук useState() для данных пользователя
  // const [ data, setData ] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // })

  // 2.4 использовать хук useState() для работы с сообщением об ошибке
  // const [message , setMessage] = useState();

  // 2.5 создать убрать HOC withRouter и использовать useHistory
  // const history = useHistory()

  // 2.6 заменить this.state в шаблоне на новый data из хука useState

  // 2.7 заменить handleChange
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    if (this.state.password === this.state.confirmPassword) {
      let { username, password, email } = this.state;
      duckAuth.register(username, password, email).then((res) => {
        // 2.7 проверить успешную регистрацию, проверить получение токена и закоммититься
        // console.log(res)
        if (res.statusCode !== 400) {
          this.setState({
            message: ''
          }, () => {
            this.props.history.push('/login');
          })
        } else {
          this.setState({
            message: 'Что-то пошло не так!'
          })
        }
        // 2.8 add catch()
      });
    }
  }
  // 2.9 убрать render
  render() {
    return (
      <div className="register">
        <Logo title={'CryptoDucks'} />
        <p className="register__welcome">
          Пожалуйста, зарегистрируйтесь.
        </p>
        <p className="register__error">
          {this.state.message}
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label htmlFor="username">
            Логин:
          </label>
          <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label htmlFor="email">
            Email:
          </label>
          <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="password">
            Пароль:
          </label>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <label htmlFor="confirmPassword">
            Подтвердите пароль:
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
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
}

export default withRouter(Register);