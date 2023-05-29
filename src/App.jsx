import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import getApiKey from './utils/getApiKey'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'

function App() {

  //************* PETICIONES ANIDADAS FIN***************/
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  useEffect(() => {
    const success = pos => { 
      const obj = { // Guardo el objeto.
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
      navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect (() => {
    if(coords) { // El bloque 24 al 27 se ejecuta cuando "coords" sea distinto a "underfine". No se renderiza en el primer render, lo ara en el siguiente cuando obtenga la info y deje de ser "underfine"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${getApiKey()}`
  axios.get(url) // Hacemos la peticion.
  .then(res => {
    setWeather(res.data) // Se guarda pa peticion pedida y la guardamos en el ("estado weather" const [weather, setWeather] = useState())
    const objtemp = {
      celsius: +(res.data.main.temp - 273.15).toFixed(1),
      farenheit: +((res.data.main.temp -273.15) * 9/5 + 32).toFixed(1)
    }
    setTemp(objtemp)
  })
  .catch(err => console.log(err))
    }
  }, [coords])
  console.log(temp)

  return (
    // Enviamos a weatherCard una "prop" con la info de "weather"
    <div className='App'>
      {
      weather
      ? <WeatherCard
        weather={weather} 
        temp={temp}/> 
      : <Loading />
      }
    </div>
  )
  }
  //************* PETICIONES ANIDADAS FIN***************/
export default App
