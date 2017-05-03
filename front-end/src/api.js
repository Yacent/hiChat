import axios from 'axios'

export const login = (username, password) => {
  return axios.post('/api', {
    username,
    password
  })
}

export const register = (username, password, nickname) => {
  return axios.post('/api/register', {
    username,
    password,
    nickname
  })
}

export const home = () => {
  return axios.get('/api/home')
}

export const contacts = () => {
  return axios.get('/api/contacts')
}

export const addUser = () => {
  return axios.get('/api/addUser')
}

export const userInfo = (username) => {
  return axios.get('/api/userInfo/' + username)
}

export const pushMsg = (roomNum, payload) => {
  return axios.post('/api/updateMsg/' + roomNum, payload)
}

export const getInitMsg = (roomNum) => {
  return axios.get('api/getInitmsg/' + roomNum)
}

export const createRoom = (payload) => {
  return axios.post('/api/createRoom', {
    room: payload.roomNum,
    userlist: payload.userlist
  })
}

export const updateUnRead = (payload) => {
  return axios.post('/api/updateUnread', payload)
}
