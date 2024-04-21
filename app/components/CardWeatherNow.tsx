"use client";
import Image from "next/image";
import WeatherIcon from "/public/weatherNowIcon.svg"
import { useWeatherNowContext } from "./contexts/WeatherNowContextProvider";

function CardWeatherNow() {
  const {weatherToday} = useWeatherNowContext();

  return (
    <div className=" h-96 md:flex-1  w-full px-4 sm:px-0">
      {weatherToday ? weatherToday.weatherState.map((weatherNow)=>
        <div
          key={Math.random() *10000}
          id="CardWeatherToday"
          className=" bg-blur flex justify-center items-center p-4"
        >
          <div className="  w-full h-full mx-auto fadeInAnimation">
            <div className=" flex items-center ">
              <div className="flex-1 h-40 flex justify-center items-center">
                <Image
                  width="120"
                  height="120"
                  src={`https://openweathermap.org/img/wn/${weatherNow.weather[0].icon}@4x.png`}
                  alt="Icono del estado del clima"
                />
              </div>
              <div className="flex-1">
                <div className=" px-2">
                  <p className=" text-xs mb-1">
                    Humedad: {weatherNow.main.humidity}%
                  </p>
                  <p className=" text-xs mb-1">
                    Nublado: {weatherNow.clouds.all}%
                  </p>
                  <p className=" text-xs mb-1">
                    Sensación térmica: {Math.ceil(weatherNow.main.feels_like)}{" "}
                    °C
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-5xl font-bold py-2 border-t">
                {Math.round(weatherNow.main.temp)}°C
              </h2>
              <p className=" font-light py-2 border-t">Estado Actual</p>
              <p className=" font-light py-2 border-t uppercase">
                {weatherNow.weather[0].description}
              </p>
            </div>
          </div>
        </div>
      )
    :
    <div className="bg-semitransparent h-full flex justify-center items-center">
<Image src={WeatherIcon} alt="" className=" aspect-square w-20 text-white opacity-50"/>
    </div>
    }
    </div>
  );
}

export default CardWeatherNow;
