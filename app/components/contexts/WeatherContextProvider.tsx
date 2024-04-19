"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  WeatherListStatusSelectedDay,
  WeaterDaysMapper,
  weatherModel,
  weatherDayOfWeek,
  WheatherToday,
} from "../models/models";

//Se crea e inicializa el contexto
const CreateWeatherContext = createContext<{
  selectWeatherDay: (date: number, daySelected?: string | null) => void;
  weatherListStatudDay: WeatherListStatusSelectedDay | null;
  getWeatherToday: (lat: number, lon: number) => Promise<void> | null;
  weatherToday: WheatherToday | null;
  getWeatherWeek: (lat: number, lon: number) => Promise<void> | null;
  weatherWeek: WeaterDaysMapper | null;
  dataDaysWeatherWeek: weatherDayOfWeek[] | [];
}>({
  getWeatherToday: (lat, lon) => null,
  selectWeatherDay: (date) => {},
  weatherListStatudDay: null,
  weatherWeek: null,
  weatherToday: null,
  getWeatherWeek: () => null,
  dataDaysWeatherWeek: [],
});

//Función que devuelve un useContext con el contexto del clima definido
export const useWeatherContext = () => useContext(CreateWeatherContext);

//Proveedor de contexto
function WeatherContextProvider({ children }: { children: ReactNode }) {
  const [weatherToday, setWeatherToday] = useState<WheatherToday | null>(null);
  const [weatherWeek, setWeatherWeek] = useState<WeaterDaysMapper | null>(null);
  const [dataDaysWeatherWeek, setDataDaysWeatherWeek] = useState<
    weatherDayOfWeek[] | []
  >([]);
  const [weatherListStatudDay, setWeatherListStatusDay] =
    useState<WeatherListStatusSelectedDay | null>(null);

  useEffect(() => {
    if (weatherWeek) {
      setDataDaysWeatherWeek(weatherWeek.getOneStateByDay());
    }
  }, [weatherWeek]);

  useEffect(() => {
    if (dataDaysWeatherWeek) {
      selectWeatherDay(1, weatherListStatudDay?.daySelected || null);
    }
  }, [dataDaysWeatherWeek]);

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

  //Recibe la lon y lat de una locación con los cuales realiza una llamada a una api y asigna los datos recibidos al estado que contiene el estado del clima de la semana
  const getWeatherWeek = async (lat: number, lon: number) => {
    try {
      const result =
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=sp&appid=40b79bfa70d6cfd677102a09225d5dc3
    `);
      const response = await result.json();
      const data = response;
      setDataDaysWeatherWeek([]);
      setWeatherWeek(new WeaterDaysMapper(data.list));
    } catch (error) {}
  };

  //Recibe un datetime mediante el cual crea una instancia de la clase WeatherListStatusSelectedDay y la asigna a el estado que contiene una lista de estados del tiempo a lo largo de un día específico
  const selectWeatherDay = async (
    date: number,
    daySelected?: string | null
  ) => {
    setWeatherListStatusDay(weatherWeek?.selectDay(date, daySelected) || null);
  };

  return (
    <CreateWeatherContext.Provider
      value={{
        getWeatherToday: getWeatherToday,
        weatherToday: weatherToday,
        weatherWeek: weatherWeek,
        dataDaysWeatherWeek: dataDaysWeatherWeek,
        getWeatherWeek: getWeatherWeek,
        selectWeatherDay: selectWeatherDay,
        weatherListStatudDay: weatherListStatudDay,
      }}
    >
      {children}
    </CreateWeatherContext.Provider>
  );
}

export default WeatherContextProvider;
