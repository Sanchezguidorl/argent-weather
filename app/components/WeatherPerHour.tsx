"use client";

import Image from "next/image";
import WeatherIcon from "/public/weatherHourIcon.svg";
import { useWeatherContext } from "./contexts/WeatherContextProvider";
import { getDateByUnix } from "./models/utils";
import LinesChart from "./layouts/LinesChart";

function WeatherPerHour() {
  const { weatherListStatudDay } = useWeatherContext();

  return (
    <div
      className={` transition-all duration-1000 overflow-y-auto min-h-96  h-fit w-full mt-2 flex flex-col-reverse md:flex-row flex-wrap items-center justify-between mb-10`}
    >

      {
        weatherListStatudDay &&          <h3 className="order-1 md:-order-none w-full text-center text-2xl sm:text-3xl uppercase mb-6 h-12 flex items-center justify-center">
        {weatherListStatudDay?.daySelected}
      </h3>
      }
      {weatherListStatudDay ? (
        <><div
          className={` ${
            weatherListStatudDay ? "flex-1 max-h-[500px] h-auto" : "max-h-0 h-0"
          } flex justify-center items-center gap-2 pt-6 sm:pt-12 p-1 flex-wrap`}
        >
          {weatherListStatudDay.wheatherDaySelectedList.map((status) => (
            <div
              key={status.dt}
              className="p-2 bg-blur rounded-lg w-20 h-32 flex justify-center items-center cursor-pointer relative hover:scale-110 transition-transform duration-200 fadeInAnimation"
            >
              <div className=" text-center">
                <h3 className=" mb-1 font-semibold capitalize">
                  {getDateByUnix(status.dt).getHours()}:00hs
                </h3>
                <div className="w-full h-12 flex justify-center items-center">
                  <Image
                    className=""
                    width={48}
                    height={48}
                    src={`https://openweathermap.org/img/wn/${
                      String(status.weather[0].icon) !== "01n"
                        ? status.weather[0].icon
                        : "01d"
                    }@4x.png`}
                    alt=""
                  />
                </div>
                <p className="mt-2 text-xs">{Math.round(status.main.temp)}°C</p>
              </div>
            </div>
          ))}
        </div>
              <div className="flex-1 w-full">
              <LinesChart weatherData={weatherListStatudDay} />
            </div>
            </>
      ) : (
        <div className=" bg-semitransparent w-full h-80 flex justify-center items-center">
          <Image
            src={WeatherIcon}
            alt=""
            className=" aspect-square w-20 text-white opacity-50"
          />
        </div>
      )}
    </div>
  );
}

export default WeatherPerHour;
