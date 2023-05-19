<template>
  <div class="weather-app">
    <div class="search-container">
      <input type="text" v-model="city" placeholder="Ingresa una ubicación" class="search-input" @keyup.enter="create">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="create" >
      <path d="M22.48 20.94L17.61 16.07C16.19 17.31 14.38 18 12.5 18C8.91 18 6 15.09 6 11.5C6 7.91 8.91 5 12.5 5C16.09 5 19 7.91 19 11.5C19 13.38 18.31 15.19 17.07 16.61L21.94 21.48C22.11 21.66 22.11 21.93 21.94 22.11C21.76 22.28 21.49 22.28 21.32 22.11L22.48 20.95C22.66 20.78 22.66 20.51 22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34ZM8 11.5C8 14.54 10.46 17 13.5 17C16.54 17 19 14.54 19 11.5C19 8.46 16.54 6 13.5 6C10.46 6 8 8.46 8 11.5Z"/>
    </svg>
    </div>
    <!-- Mostrar los datos obtenidos de la API -->
    <div v-if="weatherData" class="weather-container">
      <img :src="weatherData.current.condition.icon" alt="Weather Icon" class="weather-icon">
      <h2 class="location">{{ weatherData.location.name }}</h2>
      <p class="temperature">{{ weatherData.current.temp_c }}°<sup>c</sup></p>
      <p class="rainfall">Lluvia - {{ weatherData.current.precip_mm }} mm</p>
      <font-awesome-icon icon="fa-light fa-raindrops" /><p class="condition">{{ weatherData.current.condition.text }}</p>
      <p class="last-updated">Última actualización: {{ lastUpdatedDateTime }}</p>
      
      <!-- Otros datos que deseas mostrar -->
    </div>

    <p class="update-time">Tiempo restante hasta la próxima actualización: {{ timeRemaining }}</p>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: '',
      weatherData: null,
      lastUpdated: '', // Agrega esta propiedad para almacenar el valor de last_updated
      timeRemaining: '' // Agrega esta propiedad para mostrar el tiempo restante
    };
  },
  mounted() {
    this.getLocation();
  },

  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Llamada a la API de Geocodificación inversa para obtener la ubicación basada en la latitud y longitud
          axios.get(`https://api.weatherapi.com/v1/current.json?key=e909dbaa3eba4454a02101031231905&q=${latitude},${longitude}&aqi=no`)
            .then(response => {
              this.weatherData = response.data;
            console.info(response.data.current.last_updated)
          this.lastUpdated = response.data.current.last_updated;

          const now = new Date(); // Obtener la fecha y hora actual
          const nextUpdate = new Date(this.lastUpdated);
          nextUpdate.setMinutes(nextUpdate.getMinutes() + 16); // Próxima actualización 15 minutos después de la última actualización

          // Calcular el tiempo restante hasta la próxima actualización
          const timeDiff = nextUpdate.getTime() - now.getTime();

          console.info(timeDiff)
          const minutesRemaining = Math.floor(timeDiff / 60000); // Convertir a minutos

          // Actualizar la propiedad timeRemaining con el tiempo restante formateado
          this.timeRemaining = `${minutesRemaining % 60} minutos`;

          
        })
        });
      } else {
        console.error('La geolocalización no es compatible en este navegador.');
      }
    },


    


    fetchData() {
      const apiKey = 'e909dbaa3eba4454a02101031231905';
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}&aqi=no`;

      axios.get(apiUrl)
        .then(response => {
          this.weatherData = response.data;
          console.info(response.data.current.last_updated)
          this.lastUpdated = response.data.current.last_updated;

          // Obtén la fecha y hora actual en formato legible
      const date = new Date(this.lastUpdated);
      const dayOfWeek = date.toLocaleString('es-ES', { weekday: 'long' });

      // Asigna la fecha y hora formateadas a la propiedad lastUpdatedDateTime
      this.lastUpdatedDateTime = `${dayOfWeek}, ${date.toLocaleTimeString()}`;

          

          this.scheduleDataUpdate();

        })
        .catch(error => {
          console.info('error')
          console.error(error);
        });
    },

    scheduleDataUpdate() {
    const now = new Date(); // Obtener la fecha y hora actual
    const nextUpdate = new Date(this.lastUpdated);
    nextUpdate.setMinutes(nextUpdate.getMinutes() + 16); // Próxima actualización 15 minutos después de la última actualización

    // Calcular el tiempo restante hasta la próxima actualización
    const timeDiff = nextUpdate.getTime() - now.getTime();

    console.info(timeDiff)
    const minutesRemaining = Math.floor(timeDiff / 60000); // Convertir a minutos

    // Actualizar la propiedad timeRemaining con el tiempo restante formateado
    this.timeRemaining = `${minutesRemaining % 60} minutos`;

    setTimeout(() => {
      console.info(this.city)
      console.info(weatherData.location.name)
      this.city=weatherData.location.name
      this.create(); // Obtener los datos meteorológicos actualizados
    }, timeDiff); // Convierte el tiempo restante a milisegundos
  },


    create() {
      console.info('create')
      this.weatherData = '',
      this.fetchData();
    }

  }
};
</script>

<style>

body{
  background: #dde1e7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);
}

.search-container {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 15px 50px 15px 20px;
  font-size: 18px;
  border-radius: 30px;
  border: none;
  outline: none;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.search-input::placeholder {
  color: #a0a0a0;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  fill: #a0a0a0;
  cursor: pointer;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #2979ff;
  color: #fff;
  cursor: pointer;
}

.weather-container {
  text-align: center;
  margin-bottom: 20px;
}

.location {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
}

.rainfall,
.condition {
  margin-bottom: 10px;
}

.weather-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.update-time {
  text-align: center;
}
</style>


