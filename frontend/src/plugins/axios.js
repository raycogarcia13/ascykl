import axios from 'axios'

let config ={
  baseURL: '/api/v1'
}

let axiosO = axios.create(config);

axiosO.defaults.withCredentials = true;

export default axiosO;
