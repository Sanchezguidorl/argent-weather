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
  weatherDayOfWeek,
} from "../models/models";

//Se crea e inicializa el contexto
const CreateWeatherContext = createContext<{
  selectWeatherDay: (date: number, daySelected?: string | null) => void;
  weatherListStatudDay: WeatherListStatusSelectedDay | null;
  getWeatherWeek: (lat: number, lon: number) => Promise<void> | null;
  weatherWeek: WeaterDaysMapper | null;
  dataDaysWeatherWeek: weatherDayOfWeek[] | [];
}>({
  selectWeatherDay: (date) => {},
  weatherListStatudDay: null,
  weatherWeek: null,
  getWeatherWeek: () => null,
  dataDaysWeatherWeek: [],
});

//Función que devuelve un useContext con el contexto del clima definido
export const useWeatherContext = () => useContext(CreateWeatherContext);

//Proveedor de contexto
function WeatherContextProvider({ children }: { children: ReactNode }) {
  const [weatherWeek, setWeatherWeek] = useState<WeaterDaysMapper | null>(null);
  const [dataDaysWeatherWeek, setDataDaysWeatherWeek] = useState<
    weatherDayOfWeek[] | []
  >([]);
  const [weatherListStatudDay, setWeatherListStatusDay] =
    useState<WeatherListStatusSelectedDay | null>(null);

  useEffect(() => {
    if (weatherWeek) {
      setDataDaysWeatherWeek(weatherWeek.getOneStateByDay());
        selectWeatherDay(1, weatherListStatudDay?.daySelected || null);

    }
  }, [weatherWeek]);

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
