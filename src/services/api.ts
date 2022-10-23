import axios from 'axios'

const MYTASKS_BACKEND_HOST = process.env.MYTASKS_BACKEND_HOST
const MYTASKS_BACKEND_PORT = process.env.MYTASKS_BACKEND_PORT

const api = axios.create({
  baseURL: `http://${MYTASKS_BACKEND_HOST}:${MYTASKS_BACKEND_PORT}`
})

export default api