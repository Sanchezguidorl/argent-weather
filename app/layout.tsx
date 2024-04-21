import type { Metadata } from "next";
import "./styles/main.css";
import SelectInputProvider from "./components/contexts/SelectInputProvider";
import WeatherContextProvider from "./components/contexts/WeatherContextProvider";
import AppContainer from "./components/layouts/AppContainer";
import WeatherNowContextProvider from "./components/contexts/WeatherNowContextProvider";


export const metadata: Metadata = {
  title: "ArgentWeather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
    <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
</head>
      <SelectInputProvider>
      <WeatherNowContextProvider>
        <WeatherContextProvider>
          <AppContainer>{children}</AppContainer>
        </WeatherContextProvider>
        </WeatherNowContextProvider>
      </SelectInputProvider>
    </html>
  );
}
