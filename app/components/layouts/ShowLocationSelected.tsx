"use client";

import { useSelectionInputContext } from "../contexts/SelectInputProvider";


function ShowLocationSelected() {
const {locationSelected}= useSelectionInputContext();

  return (
    <div className=" w-full text-white flex text-center h-20 items-center">
    {locationSelected&&
    <>
     <h1 className="sm:hidden text-4xl w-full fadeInAnimation">{locationSelected.length>17? locationSelected.slice(0,16)+"...":locationSelected}</h1>
     <h1 className="hidden sm:block text-4xl w-full fadeInAnimation">{locationSelected}</h1>
     </>
      }
    </div>
  )
}

export default ShowLocationSelected
