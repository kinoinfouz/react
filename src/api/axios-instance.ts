import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  withCredentials: false,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Ki-App-Os": "web",
    "Ki-App-Type": "site"
  }
})

export default axiosInstance