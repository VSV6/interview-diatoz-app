import axios from 'axios'

const callAPI = (url, method = 'get') => {
    return axios[method](`http://192.168.43.185:3000/${url}`)
}

export default callAPI