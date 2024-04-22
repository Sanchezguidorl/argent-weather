import { weatherByDayListModel } from "./models";

export const getDateByUnix = (date: number) => {
  const dateParsed = new Date(date * 1000);
  return dateParsed;
};

export const getDayNameByDate = (date: number) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    timeZone: "UTC",
  };
  const dayName = getDateByUnix(date).toLocaleDateString("es-ES", options);
  return dayName;
};

export const getWeathersListByDay=(dateName: string, dataList: weatherByDayListModel)=>{
return dataList[dateName];
}
