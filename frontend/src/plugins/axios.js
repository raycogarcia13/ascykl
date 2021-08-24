import axios from 'axios'

let config ={
  baseURL: 'http://localhost:3000/api/v1'
  // baseURL: '/api/v1'
}

let axiosO = axios.create(config);

axiosO.defaults.withCredentials = true;

export default axiosO;
