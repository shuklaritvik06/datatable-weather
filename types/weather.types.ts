export interface Limit {
  id: number;
  value: number;
}
export interface ICityData {
  data: Data;
}

export interface Data {
  total_count: number;
  results: Result[];
}

export interface Result {
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string[];
  feature_class: string;
  feature_code: string;
  country_code: string;
  cou_name_en: string;
  country_code_2: any;
  admin1_code: string;
  admin2_code: string;
  admin3_code: any;
  admin4_code: any;
  population: number;
  elevation: any;
  dem: number;
  timezone: string;
  modification_date: string;
  label_en: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface IForecastWeatherData {
  data: ForecastWeather;
}

export interface ForecastWeather {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
  rain?: Rain;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Sys {
  pod: string;
}

export interface Rain {
  [key: string]: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ICurrentWeatherData {
  data: CurrentWeather;
}

export interface CurrentWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface CurrentWeather {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: CurrentWeatherMain;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  rain: Rain;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
