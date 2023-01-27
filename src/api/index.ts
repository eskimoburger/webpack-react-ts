import axios from "axios";

const instance = axios.create({
    baseURL:"http://54.255.90.30:2345/"
})

export default instance