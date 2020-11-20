import Axios from 'axios'

const axiosHelper = Axios.create({
  baseURL: '/api',
  headers: {
    Authorization: ' '
  }
})

export default axiosHelper
