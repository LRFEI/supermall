import axios from 'axios'

export function request (config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  //2.axios拦截器，拦截实例
  //2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    //什么时候需要请求拦截
    //1.比如config中的一些信息不符合服务器的要求(比如重新设置headers)

    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标(请求等待图标)

    //3.某些网络请求(比如登录(需要token)),必须携带一些特殊的信息

    //拦截后需要返回config，否则网络请求中将没有config导致失败
    return config
  }, err => {
    console.log(err);
  })

  //2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    //拦截后需要返回res,否则请求接收不到结果
    return res.data
  }, err => {
    console.log(err);
  })

  //3.发送真正的网络请求
  //直接返回实例，因为axios返回的就是promise（.then()或者.catch()）
  return instance(config)
}
