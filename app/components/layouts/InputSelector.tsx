"use client";
import { ChangeEvent, useRef } from "react";
import { city, departament, province } from "../models/models";
import { useSelectionInputContext } from "./../contexts/SelectInputProvider";
import { useWeatherContext } from "../contexts/WeatherContextProvider";

function InputSelector({ provinces }: { provinces: province[] }) {
  const {
    departaments,
    getDepartaments,
    cities,
    getCities,
    setLocationSelected,
  } = useSelectionInputContext();
  const { getWeatherToday, getWeatherWeek, selectWeatherDay } =
    useWeatherContext();
  const departamentRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLSelectElement | null>(null);

  const handleChangeProvince = (event: ChangeEvent<HTMLSelectElement>) => {
    const value: province = JSON.parse(event.target.value);
    getDepartaments(value.id, value.nombre);
    getWeatherToday(value.centroide.lat, value.centroide.lon);
    getWeatherWeek(value.centroide.lat, value.centroide.lon);
    if (departamentRef.current) {
      departamentRef.current.value = "default";
      if (cityRef.current) {
        cityRef.current.value = "default";
      }
    }
  };

  const handleChangeDepartament = (event: ChangeEvent<HTMLSelectElement>) => {
    const value: departament = JSON.parse(event.target.value);
    getCities(value.id, value.nombre);
    if (cityRef.current) {
      cityRef.current.value = "default";
    }
    getWeatherToday(value.centroide.lat, value.centroide.lon);
    getWeatherWeek(value.centroide.lat, value.centroide.lon);
    if (cityRef.current) {
      cityRef.current.value = "default";
    }
  };

  const handleChangeCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const value: city = JSON.parse(event.target.value);
    setLocationSelected(value.nombre);
    getWeatherToday(value.centroide.lat, value.centroide.lon);
    getWeatherWeek(value.centroide.lat, value.centroide.lon);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center text-center gap-3">
      <label className="flex flex-col flex-1 justify-center">
        <select
          defaultValue="default"
          className=""
          onChange={handleChangeProvince}
        >
          <option value="default" disabled>
            --Selecciona una Provincia---
          </option>
          {provinces.map((province: province) => (
            <option value={JSON.stringify(province)} key={province.id}>
              {province.nombre.slice(0, 16)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col flex-1 justify-center">
        <select
          defaultValue="default"
          ref={departamentRef}
          onChange={handleChangeDepartament}
        >
          <option value="default" disabled>
            --Selecciona un Departamento---
          </option>
          {departaments.length > 0 &&
            departaments.map((departament: departament) => (
              <option key={departament.id} value={JSON.stringify(departament)}>
                {departament.nombre}
              </option>
            ))}
        </select>
      </label>
      <label className="flex flex-col flex-1 md:w-[20%] justify-center">
        <select
          defaultValue="default"
          ref={cityRef}
          onChange={handleChangeCity}
          className=""
        >
          <option value="default" disabled>
            --Selecciona una Localidad---
          </option>
          {cities.length > 0 &&
            cities?.map((city: city) => (
              <option key={city.id} value={JSON.stringify(city)}>
                {city.nombre}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
}

export default InputSelector;
