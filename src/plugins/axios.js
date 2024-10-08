import axios from 'axios'

const $axios = axios.create({
    baseURL: 'http://localhost:3001/api/v1.1', // Укажите свой базовый URL
    headers: {
        'Content-Type': 'application/json',
    },
})

export { $axios }
