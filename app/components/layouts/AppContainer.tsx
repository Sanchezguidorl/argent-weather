"use client";
import StarOpacityHandler from './StarOpacityHandler';

function AppContainer({children}:{children:React.ReactNode}) {
 const hour= new Date().getHours();
const isEarly:boolean=hour>6 && hour<18;


  return (
    <body
    className={` ${
      isEarly
        ? "animationBgDay"
        : "animationBgNight"
    }`}
  >
    <div className={`${isEarly && "hidden"} w-full h-full fixed top-0 -z-10 left-0 fadeInAnimation`}>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-1/3 left-60 bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-1/2 left-1/2 bg-white rounded-full"></div>
      </StarOpacityHandler>{" "}
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-2/3 left-80 bg-white rounded-full"></div>
      </StarOpacityHandler>{" "}
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-[380px] left-1/3 bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[40px] left-[600px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[130px] left-[20px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[10px] left-[310px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[50px] left-[500px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[590px] left-[180px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-[60px] left-[200px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-1/3 right-20 bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-1/2 right-340 bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-1/3 right-60 bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-[80px] right-[80px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-1 h-1 absolute top-[400px] right-[500px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[20px] right-[120px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[150px] right-[240px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[590px] right-[160px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[90px] right-[480px] bg-white rounded-full"></div>
      </StarOpacityHandler>
      <StarOpacityHandler>
        <div className="w-[2px] h-[2px] absolute top-[60px] right-[300px] bg-white rounded-full"></div>
      </StarOpacityHandler>
    </div>

      {children}
      </body>
  )
}

export default AppContainer
