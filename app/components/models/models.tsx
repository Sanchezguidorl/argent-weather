import { geWeathersListByDay, getDateByUnix, getDayNameByDate } from "./utils";

//Define los datos que espera un objeto del tipo provincia
export type province = {
  id: string;
  centroide: { lat: number; lon: number };
  nombre: string;
};

//Define los datos que espera un objeto del tipo departamento
export type departament = {
  id: string;
  centroide: { lat: number; lon: number };
  nombre: string;
};

//Define los datos que espera un objeto del tipo ciudad o localidad
export type city = {
  id: string;
  centroide: { lat: number; lon: number };
  nombre: string;
};

//Define los datos que espera un objeto del tipo clima que contendrá las propiedades que conforman el estado del tiempo
export type weatherModel = {
  clouds: {
    all: number;
  };
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: [
    {
      description: string;
      icon: "string";
    }
  ];
};


//Define los datos que tendrá un objeto que contiene el clima por día de la semana identificado por el datetime
export type weatherDayOfWeek = {
  dt: number;
} & weatherModel;

//Define los tipos de datos que contiene un objeto que almacena los estados del tiempo en atributos que definen el nombre del día al que pertenecen los estados almacenados en el array
export type weatherByDayListModel ={
  [day: string]: weatherDayOfWeek[];
}
;



//Define la clase WeaterDaysMapper que se encarga de procesar los datos recibidos a través de la consulta y devolver un diferente formato de datos dependiendo de la consulta realizada a traves de uno de sus métodos
export class WeaterDaysMapper {
  //contiene la id de la entidad
  public entityId: string=Date.now().toString();
  //Contiene los datos obtenidos desde la base de datos en un formato separado por atributos que definen ccada uno un día diferente
  public weatherMapped: weatherByDayListModel | null = null;
  //Contiene todos los estados del tiempo del tiempo de un día en específico
  public wheatherDaySelectedData: weatherDayOfWeek[] | [] = [];
  //Contiene el día seleccionado
  public daySelected: string = "";
  public constructor(atributes: weatherDayOfWeek[]) {
    //Procesa los datos recibidos desde la base de datos en el método de agupación y asigna el resultado a weatherMapped
    this.weatherMapped = this.groupWeatherByDay(atributes);
  }

  //Recibe un array con un conjunto de objetos que contienen el estado del clima por datetime y los agrupa por día en un objeto
  public groupWeatherByDay(
    props: weatherDayOfWeek[]
  ): weatherByDayListModel | null {
    const weatherByDay: weatherByDayListModel = {};
    if (props) {
      for (let weatherObject of props) {
        const dayName = getDayNameByDate(weatherObject.dt);

        if (!weatherByDay[dayName]) {
          weatherByDay[dayName] = [];
        }

        weatherByDay[dayName].push(weatherObject);
      }

      return weatherByDay;
    }

    return null;
  }

  //Recibe el nombre de un día de la semana y lo utiliza como clave para seleccionar un campo en el mapper y devuelve sus valores
  public getWeatherStatesByDay(day: string): weatherDayOfWeek[] {
    return this.weatherMapped?.[day] || [];
  }

  //Recibe un datetime numérico y si es 0 retorna null de lo contrario retorna un array con estados del tiempo de un día específico
  public selectDay(date: number, daySelectedAtc?:string|null): WeatherListStatusSelectedDay | null {
    if(date===1){
      const newWeatherList = new WeatherListStatusSelectedDay(
        this.getAnotherDayOfMapper(daySelectedAtc?daySelectedAtc:"miércoles"),
        this.getWeatherStatesByDay(this.getAnotherDayOfMapper(daySelectedAtc?daySelectedAtc:"miércoles"))
      );

      return newWeatherList;
    }


    const newWeatherList = new WeatherListStatusSelectedDay(
      getDayNameByDate(date),
      this.getWeatherStatesByDay(getDayNameByDate(date))
    );
    if ( newWeatherList instanceof WeatherListStatusSelectedDay) {
      return newWeatherList;
    } else {
      return null;
    }
  }


  public getAnotherDayOfMapper=(day:string):string=>{
const dayNamesList=[];
if(this.weatherMapped){
  for(let dayName in this.weatherMapped){
    dayNamesList.push(dayName);
  }
}
let dayFiltered="";
for (const dayName of dayNamesList) {
  if(dayName.toLowerCase()!=day.toLowerCase()){
    dayFiltered=dayName;
    break;
  }
}
return dayFiltered;
  }

  //Retorna una lista de estados objetos con estado del tiempo pero solo uno por cada día mapeado en lugar de el array de estados de ese día completo
  public getOneStateByDay = (): weatherDayOfWeek[] | [] => {
    const daysOfWeekFiltered: weatherDayOfWeek[] = [];
    if (this.weatherMapped) {
      for (let key in this.weatherMapped) {
        if (this.weatherMapped[key][5] !== undefined) {
          daysOfWeekFiltered.push(this.weatherMapped[key][5]);
        }
      }
      return daysOfWeekFiltered;
    }
    return [];
  };

  public getMinTempDiary = (date: number): number | undefined => {
    if (this.weatherMapped) {
      const minTempArray: number[] =
        geWeathersListByDay(getDayNameByDate(date), this.weatherMapped)?.map(
          (dayWeather:weatherModel) => dayWeather.main.temp_min
        ) || [];

      return Math.round(Math.min(...minTempArray));
    }
  };

  public getMaxTempDiary = (date: number): number | undefined => {
    if (this.weatherMapped) {
      const maxTempArray: number[] =
        geWeathersListByDay(getDayNameByDate(date), this.weatherMapped)?.map(
          (dayWeather:weatherModel) => dayWeather.main.temp_max
        ) || [];
      return Math.round(Math.max(...maxTempArray));
    }
  };
}

export class WeatherListStatusSelectedDay {
  public wheatherDaySelectedList: weatherDayOfWeek[] | [] = [];
  public daySelected: string;
  public constructor(dayName: string, data: weatherDayOfWeek[]) {
    this.daySelected = dayName;
    this.wheatherDaySelectedList = data;
  }

  public getHoursOfDay=()=>{
    const hourdsFromDay:string[]=[];
    if(this.wheatherDaySelectedList){
      for(let day of this.wheatherDaySelectedList){
        hourdsFromDay.push(`${getDateByUnix(day.dt).getHours()}:00`);
      }
    }
    return hourdsFromDay;
  }


  public getTempPerHour=()=>{
    const tempsFromDay:number[]=[];
    if(this.wheatherDaySelectedList){
      for(let day of this.wheatherDaySelectedList){
        tempsFromDay.push(Math.round(day.main.temp));
      }
    }
    console.log(tempsFromDay)
    return tempsFromDay;
  }


}


export class WheatherToday{
public weatherState:weatherModel[]=[];

public constructor(weatherState:weatherModel){
  this.weatherState.push(weatherState);
}


}