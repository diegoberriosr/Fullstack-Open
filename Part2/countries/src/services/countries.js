import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const search = async (route) => {
    return await axios.get(`${baseUrl}${route}`)
}



export default {search}