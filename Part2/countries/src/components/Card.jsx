import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Card = ({country}) => {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const fetchWeatherData = async () => {
            try{
                const response = await weatherService.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
                setWeatherData(response.data)
            } catch(exception){
                console.log(exception)
            }
        }

        fetchWeatherData()
    }, [])

    return(
        <article>
            <h2>{country.name.common}</h2>
            <img src={country.flags.png} alt="country's flag" width='200' />
            <p>Capital : {country.capital}</p>
            <p>area: {country.area} km2</p>
            <h5>languages:</h5>
            <ul>
                {Object.values(country.languages).map( language => <li key={language}>{language}</li>)}
            </ul>
            { weatherData === null ? <div>Fetching weather data...</div> : <div>
                    <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(1)} degrees celsius</p>
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>}
        </article>
    )
}

export default Card