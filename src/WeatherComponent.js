import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DailyWeather from './DailyWeather';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';



export default function Weather() {
    
    const [weatherData, setWeatherData]=useState([]);
    const [currentWeather, setCurrentWeather] = useState([])
    const [city, setCity]=useState("toronto");

    const getWeatherData=(lat, lon)=>{
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=f83b49fff35ff7c1490af44fdb390e1d`)
        .then(res => {
            const weatherData = res.data["list"];
            setWeatherData(weatherData)
            console.log(weatherData);

        })
    }

    const getCurrentWeatherData=()=>{
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f83b49fff35ff7c1490af44fdb390e1d`)
        .then(res => {
            const currentWeather = res.data;
            setCurrentWeather(currentWeather)
            const lat = currentWeather.coord.lat;
            const lon = currentWeather.coord.lon;
            getWeatherData(lat, lon)
            console.log(currentWeather);
        })
    }

    useEffect(()=>{
        getCurrentWeatherData()
    },[])

    const convertDate =(linuxDate)=>{
        let date = new Date(linuxDate*1000).toLocaleString('default', {weekday: 'long'});
        return date;
    }
    

    return(
        <>
        <div style={{width:"70%", height:"35rem" }}>
            <div className="flex-parent-element">
                
                
                <div className="flex-child-element" style={{width:"35rem", height:"35rem" }}>
                    
                        <Container >                      
                    
                        <Card className="justify-content-xs-start" >  
                        <input 
                            placeholder="City" 
                            onChange={(e) => setCity(e.target.value)}/>
                        <button type="submit" onClick={getCurrentWeatherData}>Search</button>  
                        <div className="flex-parent-element">         
                        {weatherData.length>0 & city.length>0 &&                 
                            weatherData.map(w=>(
                                <>     
                                { convertDate(w['dt']) !== convertDate(currentWeather.dt) &&     
                                    <>    
                                    <div className="flex-child-element" style={{width:"6rem"}}>
                                        <img 
                                            height={50}
                                            width={70}
                                            src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}
                                            alt="icon" 
                                        />
                                        <p>{convertDate(w['dt'])}</p>
                                        <p>{`${Math.floor(w.temp.day -273.15)}°C`}</p>
                                    </div> 
                                    </>     
                                }
                                </>  
                            ))                
                        } 
                        </div>
                        </Card> 
                        <Card className="justify-content-xs-start">            
                        {
                            weatherData.length>0 & city.length>0 && 
                            <>
                            <p>Min Temperature: {`${Math.floor(currentWeather.main.temp_min -273.15)}°C`}</p>
                            <p>Max Temperature: {`${Math.floor(currentWeather.main.temp_max -273.15)}°C`}</p>
                            <p>Wind Speed: {currentWeather.wind.speed} km/h</p>
                            <p>Humidity: {currentWeather.main.humidity}%</p>
                            </>
                        }
                        </Card>
                    </Container>
                
            </div>
            <div>
                <div style={{width:"60rem"}} >
                    <Card className="flex-child-element">
                        <DailyWeather currentWeather={currentWeather} city={city} weatherData={weatherData}></DailyWeather>
                    </Card>
                </div>
            </div>
        </div>    
        </div>
        </>
    )

}