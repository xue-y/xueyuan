import axios from 'axios'


// 配置请求拦截器
axios.interceptors.request.use(config => {
    // config.headers.Authorization='auth token'   //设置认证后或有跨域问题
      // 这是固定写法
     return config
    }
  )
  // 配置响应拦截器
  axios.interceptors.response.use(response => {
    return response
    }
  )

  export default axios