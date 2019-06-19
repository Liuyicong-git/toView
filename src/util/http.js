let axios = require('axios');

import Vue from 'vue';

let environment = process.env.NODE_ENV;

let _http = axios.create({
  timeout: 12000, // 超时设置
  responseType: 'json',
});
// //请求拦截
// _http.interceptors.request.use( 
//   config => {
//     //权限校验接口
//     if (oauth.isAuthenticated()) {
//       // 判断是否存在token，如果存在的话，则每个_http header都加上token
//       let authInfo = oauth.getAuthInfo();
//       config.headers.Authorization = authInfo.token_type + ' ' + authInfo.access_token;
//     }
//     if( config.method === 'post' || config.method === 'put' || config.method === 'delete')
//     {
//       //header头设置
//       config.headers['Content-Type'] = 'application/json;charset=UTF-8';
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// let errorFn = ()=>{
//   const toast = Toast.loading({
//     duration: 0,       // 持续展示 toast
//     forbidClick: true, // 禁用背景点击
//     loadingType: 'spinner',
//     message: '网络异常请重试。'
//   });
  
//   let second = 2;
//   const timer = setInterval(() => {
//     second--;
//     if (second) {
//       toast.message = `网络异常请重试。`;
//     } else {
//       clearInterval(timer);
//       Toast.clear();
//     }
//   }, 1000);
// };

// //返回请求处理
// _http.interceptors.response.use(
//   res => {
//     //判断是否为字典中 ，正确的 status code  
//     let isSuccess = statusMap.successCode.find(val => val == res.status || val == res.code) ;
//     if (isSuccess && res.config.responseType === 'json') {
//       return res;
//     }
//     //else if 定制 401等其它错误
//     else if (res.status == "401" ){
//       alert(4);
//       //_http请求成功但status 失败  接口可能出问题 后续操作
//     }else{
//       //if 中没有的条件 则是 res.status 字段不存在
//       alert(2);
//       return "";
//     }


//   },
//   error => {
//     //网络错误
//     //
//     // alert(error.response);
//     errorFn();
//     return Promise.reject(error);
//   }
// );
export function post(url, params, config = {}) {
  return new Promise((resolve, reject) => {
    _http.post(url, params, config)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
  
export function get(url, params, config = {}) {
  let configArry = Object.assign(config, {
    'params': params
  });
  return new Promise((resolve, reject) => {
    _http.get(url, configArry)
      .then(response => {

        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

