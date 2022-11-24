import React from 'react'

export default function DailyWeather(props){
    const {currentWeather, city, weatherData} = props;

    const convertDate =(linuxDate)=>{
        let date = new Date(linuxDate*1000).toLocaleString('default', {weekday: 'long'});
        return date;
    }
    const convertFulldate = (linuxDate)=>{
        let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .format(linuxDate)
        return date;
    }
        return(
            <>
            {
                weatherData.length>0 & city.length>0 && 
                <>
                <p><b>{convertDate(currentWeather.dt)}</b></p>
                <p><b>{convertFulldate(currentWeather.dt)}</b></p>
                <p><b>{currentWeather.name} - {currentWeather.sys.country}</b></p>
                <img 
                            height={70}
                            width={100}
                            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                            alt="icon" 
                            style={{alignContent:'center'}}
                        />
                <p><b>{`${Math.floor(currentWeather.main.temp -273.15)}°C`}</b></p>
                <p><b>Feels Like: {`${Math.floor(currentWeather.main.feels_like -273.15)}°C`}</b></p>
                <p><b>{currentWeather.weather.main}</b></p>

                </>
            }
            </>
        )
    
}