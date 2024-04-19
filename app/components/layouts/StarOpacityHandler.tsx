"use client";

import { ReactNode, useEffect, useState } from "react";

function StarOpacityHandler({children}:{children: ReactNode}) {
const [showFullOpacity, setShoesOpacity] =useState<number>(0);


useEffect(()=>{

    const showOpacity=setInterval(()=>{
        setShoesOpacity(Math.round(Math.random()));
    },Math.round(Math.random()*3000)+500);

return ()=>{clearInterval(showOpacity)};

});

  return (
    <div className={` transition-opacity duration-200 ${showFullOpacity===1? "opacity-100": "opacity-55 "}`}>
      {children}
    </div>
  )
}

export default StarOpacityHandler
