/*
  封装axios，
 */
import axios from 'axios'
import {ElMessage} from "element-plus";
import router from "../router";

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
  })

  //axios的请求拦截器
  instance.interceptors.request.use(config => {

    //如果存在token，请求携带这个token
    if (window.sessionStorage.getItem('tokenStr')) {
      config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
  }, err => {
    console.log(err);
  })

  //响应拦截器
  instance.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status == 200) {
      if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
        ElMessage.error({message: success.data.message, type: 'error'});
        return;
      }
      if (success.data.message) {
        ElMessage.success({message: success.data.message, type: 'success'});

      }
    }
    return success.data;
  }, error => {
    if (error.response.code == 504 || error.response.code == 404) {
      ElMessage.error({message: '服务器被吃了o(╯□╰)o', type: 'error'});
    } else if (error.response.code == 403) {
      ElMessage.error({message: '权限不足，请联系管理员！', type: 'error'});
    } else if (error.response.code == 401) {
      ElMessage.error({message: '尚未登录，请登录', type: 'error'});
      router.replace('/');
    } else {
      if (error.response.data.message) {
        ElMessage.error({message: error.response.data.message, type: 'error'});
      } else {
        ElMessage.error({message: '未知错误！', type: 'error'});
      }
    }
  });

  //3.发送真正的网络请求
  return instance(config);
}
