import axios from 'axios';
import {backUrl} from "../config/config";


axios.defaults.baseURL = backUrl
axios.defaults.withCredentials = true;


// 날짜별 섭취칼로리, 체중 입력
export function addDietAPI(data) {
  return axios.post('/diet', data).then((response) => response.data);
}
// 날짜별 섭취칼로리, 체중 가지고 오기
export function loadDietAPI(userId, date) {
  return axios.get(`/diet/${userId}/${date}`).then((response) => response.data);
}

