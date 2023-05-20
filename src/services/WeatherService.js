import axios from 'axios';

const apiKey = 'e909dbaa3eba4454a02101031231905'; // Reemplaza con tu propia apiKey

const WeatherService = {
  
  getWeatherByCity(city) {
    return new Promise((resolve, reject) => {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
      

      axios.get(apiUrl)
        .then(response => {
            console.info(response.data.current.last_updated)
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default WeatherService;
