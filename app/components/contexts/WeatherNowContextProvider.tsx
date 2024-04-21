"use client";
import { createContext, useContext, useState } from "react";
import { WheatherToday } from "../models/models";

const CreateContextWeather = createContext<{
  weatherToday: WheatherToday | null;
  getWeatherToday:(lat: number, lon: number)=>void;
}>({
  weatherToday: null,
  getWeatherToday:(lat: number, lon: number)=>{}
});

export const useWeatherNowContext = () =>
  useContext(CreateContextWeather);

function WeatherNowContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [weatherToday, setWeatherToday] = useState<WheatherToday | null>(null);

  //Recibe la lon y lat de una locación con los cuales realiza una llamada a una api y asigna los datos recibidos al estado que contiene el estado del clima actual
  const getWeatherToday = async (lat: number, lon: number) => {
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=sp&appid=40b79bfa70d6cfd677102a09225d5dc3
    `,
        {
          cache: "no-store",
          method: "GET",
        }
      );
      const response = await result.json();
      setWeatherToday(new WheatherToday(response));
    } catch (error) {}
  };

  return (
    <CreateContextWeather.Provider value={{ weatherToday: weatherToday, getWeatherToday:getWeatherToday }}>
      {children}
    </CreateContextWeather.Provider>
  );
}

export default WeatherNowContextProvider;
