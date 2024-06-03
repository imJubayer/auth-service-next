import Axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const axios = Axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    baseURL: baseURL,
})

// Function to retrieve the JWT token from cookies
const getJwtToken = () => {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=')
        if (name === 'JWT_TOKEN') {
            return value
        }
    }
    return null
}

// Add an interceptor to set the Authorization header with the JWT token
axios.interceptors.request.use(config => {
    const jwtToken = getJwtToken()
    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`
    }
    return config
})

export const csrf = () => axios.get(baseURL + '/sanctum/csrf-cookie')

export default axios
