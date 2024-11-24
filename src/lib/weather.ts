import { getCoordinatesForCity } from './geocoding';

export const weatherCodeMap = {
    0: { emoji: 'ri-sun-line', description: 'Clear Sky', severity: 'good' },
    1: { emoji: 'ri-sun-cloudy-line', description: 'Partly Clear', severity: 'good' },
    2: { emoji: 'ri-cloudy-line', description: 'Partly Cloudy', severity: 'good' },
    3: { emoji: 'ri-cloud-line', description: 'Cloudy', severity: 'moderate' },
    45: { emoji: 'ri-mist-line', description: 'Foggy', severity: 'bad' },
    48: { emoji: 'ri-mist-fill', description: 'Heavy Fog', severity: 'bad' },
    51: { emoji: 'ri-drizzle-line', description: 'Light Drizzle', severity: 'moderate' },
    53: { emoji: 'ri-showers-line', description: 'Moderate Rain', severity: 'bad' },
    55: { emoji: 'ri-heavy-showers-line', description: 'Heavy Rain', severity: 'bad' },
    61: { emoji: 'ri-drizzle-line', description: 'Light Rain', severity: 'moderate' },
    63: { emoji: 'ri-showers-line', description: 'Moderate Rain', severity: 'bad' },
    65: { emoji: 'ri-heavy-showers-line', description: 'Heavy Rain', severity: 'bad' },
    71: { emoji: 'ri-snowy-line', description: 'Light Snow', severity: 'moderate' },
    73: { emoji: 'ri-snow-line', description: 'Moderate Snow', severity: 'bad' },
    75: { emoji: 'ri-heavy-showers-line', description: 'Heavy Snow', severity: 'bad' },
    80: { emoji: 'ri-thunderstorms-line', description: 'Rain Showers', severity: 'bad' },
    95: { emoji: 'ri-thunderstorms-fill', description: 'Thunderstorm', severity: 'very bad' }
};

export function getUVRisk(index: number) {
    if (index <= 2) return { risk: 'Low', color: 'text-green-600' };
    if (index <= 5) return { risk: 'Moderate', color: 'text-yellow-600' };
    if (index <= 7) return { risk: 'High', color: 'text-orange-600' };
    return { risk: 'Very High', color: 'text-red-600' };
}

export function getWindDirection(degrees: number) {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    return directions[Math.round(degrees / 45) % 8];
}

export interface CityCoordinates {
    latitude: number;
    longitude: number;
    name: string;
    country: string;
}

export interface WeatherData {
    cityName: string;
    country: string;
    temperature: number;
    feelsLike: number;
    weatherCode: {
        emoji: string;
        description: string;
        severity: string;
    };
    windSpeed: number;
    windDirection: string;
    humidity: number;
    uvIndex: {
        value: number;
        risk: {
        risk: string;
        color: string;
        };
    };
    sunrise: string;
    sunset: string;
    hourlyTemperatures: number[];
    hourlyWeatherCodes: {
        emoji: string;
        description: string;
        severity: string;
    }[];
    precipitationProbability: number[];
}

export async function fetchWeatherData(city: string): Promise<WeatherData> {
    const { latitude, longitude, name, country } = await getCoordinatesForCity(city);
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m,uv_index,relativehumidity_2m,precipitation_probability&daily=sunrise,sunset&timezone=auto&forecast_days=3`);
    
    if (!response.ok) throw new Error('Could not fetch weather data');
    
    const data = await response.json();
    
    const currentWeatherCode = data.current_weather.weathercode;
    const currentWeather = weatherCodeMap[currentWeatherCode] || { emoji: '❓', description: 'Unknown', severity: 'moderate' };
    const uvRisk = getUVRisk(data.hourly.uv_index[0]);

    return {
        cityName: name,
        country: country,
        temperature: Math.round(data.current_weather.temperature),
        feelsLike: Math.round(data.hourly.temperature_2m[0]),
        weatherCode: currentWeather,
        windSpeed: Math.round(data.current_weather.windspeed),
        windDirection: getWindDirection(data.current_weather.winddirection),
        humidity: Math.round(data.hourly.relativehumidity_2m[0]),
        uvIndex: {
        value: Math.round(data.hourly.uv_index[0]),
        risk: uvRisk
        },
        sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        sunset: new Date(data.daily.sunset[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        hourlyTemperatures: data.hourly.temperature_2m.slice(0, 12).map((temp: number) => Math.round(temp)),
        hourlyWeatherCodes: data.hourly.weathercode.slice(0, 12).map((code: number) => 
        weatherCodeMap[code] || { emoji: '❓', description: 'Unknown', severity: 'moderate' }
        ),
        precipitationProbability: data.hourly.precipitation_probability.slice(0, 12)
    };
}