import axios from "axios";


const axiosC = axios.create({
    baseURL: 'https://todo.api.devcode.gethired.id'
})

export default axiosC