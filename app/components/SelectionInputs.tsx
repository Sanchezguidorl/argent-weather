
import SelectInputProvider from "./contexts/SelectInputProvider";
import { province } from "./models/models";
import InputSelector from "./layouts/InputSelector";

async function SelectionInputs() {
  const query = await fetch(
    "https://apis.datos.gob.ar/georef/api/provincias"
  );

  const response= await query.json();

  const provinces = await response.provincias.filter(
    (provincia: province) =>
      provincia.nombre !== "Entre Ríos" &&
      provincia.nombre !== "Santiago del Estero" &&
      provincia.nombre !== "Santa Cruz" &&
      provincia.nombre !== "Ciudad Autónoma de Buenos Aires"
  );

  return (
    <form className=" p-3 text-black">
        <InputSelector provinces={provinces} />
    </form>
  );
}

export default SelectionInputs;
