"use client";
import Image from "next/image";
import WeatherIcon from "/public/weatherWeekIcon.svg"
import { useWeatherContext } from "../contexts/WeatherContextProvider";
import {
  getDateByUnix,
} from "../models/utils";

function CardWeatherDay() {
  const { dataDaysWeatherWeek, weatherWeek,selectWeatherDay } = useWeatherContext();

  const getDateFormatted = (date: number): string => {
    const day = getDateByUnix(date).getDate();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      timeZone: "UTC",
    };
    const dayName = getDateByUnix(date).toLocaleDateString("es-ES", options);
    return `${dayName} ${day}`;
  };

  return (
    <div id={`${weatherWeek&&'WeatherContainer'}`} className=" px-4 mt-8 sm:mt-0  md:flex-1 h-96 overflow-y-auto relative">
      { weatherWeek && dataDaysWeatherWeek ? (
        <>
        <div className="py-4 flex gap-2 flex-wrap justify-center">
          {dataDaysWeatherWeek.map((dayData) => (
            <div
              key={dayData.dt}
              className="p-2 bg-blur rounded-lg w-32 h-40 flex justify-center items-center cursor-pointer relative hover:scale-110 transition-all duration-200 fadeInAnimation hover:brightness-125"
              onClick={()=>selectWeatherDay(dayData.dt)}
            >
              <div className=" text-center">
                <h3 className=" mb-2 font-semibold capitalize">
                  {getDateFormatted(dayData.dt)}
                </h3>
                <div className="w-full h-16 flex justify-center items-center">
                  <Image
                    className=""
                    width={60}
                    height={60}
                    src={`https://openweathermap.org/img/wn/${String(dayData.weather[0].icon)!== "01n"
                    ? dayData.weather[0].icon
                    : "01d"}@4x.png`}
                    alt=""
                  />
                </div>
                <p className="mt-2 text-sm">
                  max {weatherWeek.getMaxTempDiary(dayData.dt)}°C
                </p>
                <p className=" text-sm">
                  min {weatherWeek.getMinTempDiary(dayData.dt)}°C
                </p>
              </div>
            </div>
          ))}
        </div>
          </>
      )
    :
    <div className=" bg-semitransparent w-full h-full flex justify-center items-center">
<Image src={WeatherIcon} alt="" className=" aspect-square w-20 text-white opacity-50"/>
    </div>
    
    }
    </div>
  );
}

export default CardWeatherDay;
