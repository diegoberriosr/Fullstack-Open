import axios from 'axios'

const KEY = 'f9825d9ad0dd0ee82dcf0e0502bd95e9'
const getWeather = async (lat, lon) => {
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`) 
}

export default {getWeather}