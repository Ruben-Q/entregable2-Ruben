import {useState} from "react";
import "./style/weatherCard.css"
const WeatherCard = ({weather, temp}) => { // Guardamos las prop en un objeto y desestruturamos.
    const [isCelsius, setIsCelsius] = useState(true)
    const handleChangeTemp = () => setIsCelsius(!isCelsius)
    
    return (
        <article className="weather">
            <header className="weather-header">
            <h1 className="weather-title">Weather App</h1>
            <h2 className="weather-subtitle">{weather?.name}, {weather?.sys.country}</h2>
            </header>
            <section className="weather-body">
                <div className="weather__img-conteiner">
                <img src={weather ? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png` : " "} alt="" />
                </div>

                <div className="weather-info">
                    <h3 className="weather__info-title">"{weather?.weather[0].description}"</h3>
                    <ul className="weather-list">

                        <li className="weather__list-item">
                            <span className="weather__list-label">Wind Speed</span>
                            <span className="weather__list-value">{weather?.wind.speed}m/s</span>
                        </li>

                        <li className="weather__list-item">
                            <span className="weather__list-label">Clouds</span>
                            <span className="weather__list-value">{weather?.clouds.all}%</span>
                        </li>

                        <li className="weather__list-item">
                            <span className="weather__list-label">Pressure</span>
                            <span className="weather__list-value">{weather?.main.pressure}hPa</span>
                        </li>

                    </ul>
                </div>
            </section>
            <footer className="weather-footer">
                <h2 className="weather-temp">{isCelsius ? `${temp?.celsius} ºC` : `${temp?.farenheit} ºF`}</h2>
                <button className="weather-btn" onClick={handleChangeTemp}>Change to {isCelsius ? "ºF" : "ºC"}</button>
            </footer>
        </article>       
    )
}

export default WeatherCard