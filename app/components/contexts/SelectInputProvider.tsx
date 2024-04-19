"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createContext } from "react";
import { city, departament } from "../models/models";

// Crear el contexto
const CreateSelectionInputsContext = createContext<{
  departaments: departament[];
  cities: city[];
  getCities: (id: string, nameLocation: string) => Promise<void> | null;
  locationSelected: string;
  getDepartaments: (id: string, nameLocation: string) => Promise<void> | null;
  setLocationSelected: Dispatch<SetStateAction<string>>;
}>({
  departaments: [],
  cities: [],
  locationSelected: "",
  getCities: (id, nameLocation) => null,
  getDepartaments: (id, nameLocation) => null,
  setLocationSelected: () => {},
});

// Crear el hook personalizado
export const useSelectionInputContext = () =>
  useContext(CreateSelectionInputsContext);

// Definir el componente SelectInputProvider
function SelectInputProvider({ children }: { children: ReactNode }) {
  const [departaments, setDepartaments] = useState<departament[] | []>([]);
  const [locationSelected, setLocationSelected] = useState<string>("");
  const [cities, setCities] = useState<city[] | []>([]);

  const getDepartaments = async (id: string, nameLocation: string) => {
    try {
      const result = await fetch(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre,centroide&max=2000`
      );
      const response = await result.json();
      const data = response.municipios;
      setDepartaments(data);
      setCities([]);
      setLocationSelected(nameLocation);
    } catch (error) {
      console.error("Error al obtener los departamentos:");
    }
  };

  const getCities = async (id: string, nameLocation: string) => {
    try {
      setLocationSelected(nameLocation);
      const result = await fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?municipio=${id}&campos=id,nombre,centroide&max=1000`,
        {
          cache: "no-store",
          method: "GET",
        }
      );
      const response = await result.json();
      const data = response.localidades;
      setCities(data);
    } catch (error) {
      console.error("Error al obtener los departamentos:");
    }
  };

  return (
    <CreateSelectionInputsContext.Provider
      value={{
        departaments: departaments,
        getDepartaments: getDepartaments,
        cities: cities,
        getCities: getCities,
        locationSelected: locationSelected,
        setLocationSelected: setLocationSelected,
      }}
    >
      {children}
    </CreateSelectionInputsContext.Provider>
  );
}

export default SelectInputProvider;
