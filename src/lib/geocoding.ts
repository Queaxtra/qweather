export interface CityCoordinates {
    latitude: number;
    longitude: number;
    name: string;
    country: string;
}

export async function getCoordinatesForCity(city: string): Promise<CityCoordinates> {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=tr&format=json`);
    
    if (!response.ok) throw new Error('City not found');
      
    const data = await response.json();
      
    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }
      
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      name: data.results[0].name,
      country: data.results[0].country || 'Unknown'
    };
  } catch (err) {
    throw new Error('Could not get city coordinates: ' + (err as Error).message);
  }
}
