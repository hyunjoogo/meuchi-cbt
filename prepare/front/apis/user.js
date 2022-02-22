import axios from 'axios';
import {backUrl} from "../config/config";


axios.defaults.baseURL = backUrl
axios.defaults.withCredentials = true;


// 회원가입
export function signUpAPI(data) {
  return axios.post('/user', data).then((response) => response.data);
}
