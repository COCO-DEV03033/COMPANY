// axios
import axios from 'axios'

const baseURL = 'http://localhost:5050'

export default axios.create({
  baseURL
  // You can add your headers here
})
