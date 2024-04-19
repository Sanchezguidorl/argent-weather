import Header from "./components/layouts/Header";
import SelectionInputs from "./components/SelectionInputs";
import CardWeatherNow from "./components/CardWeatherNow";
import CardWeatherDay from "./components/layouts/CardWeatherDay";
import WeatherPerHour from "./components/WeatherPerHour";
import ShowLocationSelected from "./components/layouts/ShowLocationSelected";

function Home() {
  return (
    <div id="Home" className=" container mx-auto">
        <Header />
        <SelectionInputs />
        <ShowLocationSelected />
        <div className="h-full flex flex-col md:flex-row justify-between gap-1 mt-10">
          <CardWeatherNow />
          <CardWeatherDay />
        </div>
        <WeatherPerHour />
    </div>
  );
}

export default Home;
