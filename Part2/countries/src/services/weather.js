import axios from 'axios'

const KEY = import.meta.env.KEY
const getWeather = async (lat, lon) => {
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`) 
}

export default {getWeather}