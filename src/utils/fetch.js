import axios from 'axios'
import router from '../router'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000 // 请求超时时间
})
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          if (error.response.data.message === 'sessionTimeout') {
            router.push({name: 'login', params: {session: 'timeout'}})
          }
          break
        case 504:
          router.push({name: 'login', params: {session: 'timeout'}})
          break
        case 401:
          router.push({name: 'login', params: {session: 'timeout'}})
          break
      }
    }
  }
)
export default service
