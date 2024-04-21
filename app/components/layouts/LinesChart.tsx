"use client"
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    Chart,
} from 'chart.js';
import { WeatherListStatusSelectedDay } from '../models/models';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function LinesChart({weatherData}:{weatherData:WeatherListStatusSelectedDay}) {
Chart.defaults.color = '#FFF';

let temp:number[]= [];
let days:string[]= [];

if (weatherData){
     temp = weatherData.getTempPerHour();
     days = weatherData.getHoursOfDay();
}
    
    var midata = {
        labels: days,
        datasets: [
            {
                label: 'Temperatura',
                data: temp,
                color:"#666",
                tension: 0.5,
                fill : true,
                borderColor: '#FFFFFF',
                backgroundColor: '#FFCC9955',
                pointRadius: 7,
                pointBorderColor: '#FFF',
                pointBackgroundColor: 'rgb(102,102,255)',
                parsing: {
                    yAxisKey: 'net'
                  }
            }
        ],
    };
    
    var misoptions = {
        scales : {
            y : {
                ticks: { color: '#FFFFFF'}
            },
            x: {
                ticks: { color: '#FFFFFF'}
            }
        }
    };



    return <>
    {weatherData? (
        <Line data={midata} options={misoptions}/>
    ) : (
        <></>
    )}
    </>
}