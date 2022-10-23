import axios from 'axios'

const HOST = process.env.REACT_APP_HOST_API_BACKEND
const PORT = process.env.REACT_APP_PORT_API_BACKEND

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}`
})

export default api
