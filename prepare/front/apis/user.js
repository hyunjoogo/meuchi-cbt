import axios from 'axios';
import {backUrl} from "../config/config";


axios.defaults.baseURL = backUrl
axios.defaults.withCredentials = true;


// 회원가입
export function signUpAPI(data) {
  return axios.post('/user', data).then((response) => response.data);
}

// 로그인
export function loginAPI(data) {
  return axios.post('/user/login', data).then((response) => response.data);
}

// 로그아웃
export function logOutAPI() {
  return axios.post('/user/logout').then((response) => response.data);
}

// 로그인 되어 있으면 유저 정보 가지고 오기
export function loadMyInfoAPI() {
  return axios.get('/user').then((response) => response.data);
}

