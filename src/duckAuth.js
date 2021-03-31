export const BASE_URL = 'https://api.nomoreparties.co';

export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password, email})
  })
  .then((response) => {
    return response.json();
  })
  // 1. убрать лишний then
  .then((res) => {
    return res;
  })
  // 1. убрать catch - ошибки должны обрабатываться там, где вызывается функция
  .catch((err) => console.log(err));
};
export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({identifier, password})
  })
  .then((response => response.json()))
  // 1. убрать обработку снизу в родительский компонент
  .then((data) => {
    if (data.user){
      localStorage.setItem('jwt', data.jwt);
      return data;
    } else {
      return;
    }
  })
  // 1. убрать catch - ошибки должны обрабатываться там, где вызывается функция
  .catch(err => console.log(err))
};
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  // 1. два then снизу можно заменить на 
  // const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)}
  .then(res => res.json())
  .then(data => data)
}


