'use client';

import { useState, useEffect } from 'react';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

interface WeatherProps {
  lang: 'ru' | 'en';
}

interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  time: string;
}

const locales = {
  ru: {
    loading: 'Загрузка погоды...',
    error: 'Ошибка загрузки погоды',
    celsius: '°C',
    fahrenheit: '°F',
    windSpeed: 'м/с',
    humidity: 'Влажность',
    location: 'Москва'
  },
  en: {
    loading: 'Loading weather...',
    error: 'Error loading weather',
    celsius: '°C',
    fahrenheit: '°F',
    windSpeed: 'mph',
    humidity: 'Humidity',
    location: 'Moscow'
  }
};

const MOSCOW_LAT = 55.7558;
const MOSCOW_LON = 37.6173;

export default function Weather({ lang }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${MOSCOW_LAT}&longitude=${MOSCOW_LON}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`
        );
        
        if (!response.ok) throw new Error('Weather API error');
        
        const data = await response.json();
        setWeather({
          temperature: data.current.temperature_2m,
          windSpeed: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m,
          time: data.current.time
        });
      } catch (err) {
        setError(locales[lang].error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;

  if (error) return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-zinc-800">
      <div className="text-red-500">{error}</div>
    </div>
  );

  if (!weather) return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-zinc-800">
      <div className="text-zinc-400 animate-pulse">{locales[lang].loading}</div>
    </div>
  );

  const temperature = lang === 'en' ? celsiusToFahrenheit(weather.temperature) : weather.temperature;
  const unit = lang === 'en' ? locales[lang].fahrenheit : locales[lang].celsius;

  return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-zinc-800">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-zinc-400">{locales[lang].location}</span>
            <div className="flex items-center gap-2">
              <FaTemperatureHigh className="text-red-500" />
              <span className="text-3xl font-mono">
                {temperature.toFixed(1)}
                {unit}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-zinc-400">
          <div className="flex items-center gap-2">
            <FaWind className="text-blue-400" />
            <span>{weather.windSpeed} {locales[lang].windSpeed}</span>
          </div>
          <div className="flex items-center gap-2">
            <WiHumidity className="text-2xl text-blue-400" />
            <span>{weather.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
} 