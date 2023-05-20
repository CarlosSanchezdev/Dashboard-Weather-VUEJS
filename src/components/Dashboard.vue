<template>
  <div class="weather-container">
    <div class="weather-app">
      <search-container @search="create"></search-container>

      <WeatherInfo v-if="weatherData" :last-updated-dateTime="lastUpdatedDateTime" :weather-data="weatherData"/>
    </div>

    <div class="weather-details">
      <div class="weather-detail">
        <UVIndex v-if="weatherData" :weather-data="weatherData" />
      </div>
      <div class="weather-detail">
        <WindInfo v-if="weatherData" :weather-data="weatherData" />
      </div>
      <div class="weather-detail">
        <HumidityInfo v-if="weatherData" :weather-data="weatherData" />
      </div>
    </div>
    
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from '../stores/store';
import WeatherService from '../services/WeatherService';
import SearchContainer from './SearchContainer.vue';
import UVIndex from './UVIndex.vue';
import WindInfo from './WindInfo.vue';
import HumidityInfo from './HumidityInfo.vue';
import WeatherInfo from './WeatherInfo.vue';


export default defineComponent({
  data() {
    return {
      searchcity: '',
      lastUpdated: '',
      lastUpdatedDateTime: '',
      timeRemaining: '',
    };
  },

  components: {
    SearchContainer,
    UVIndex,
    WindInfo,
    HumidityInfo,
    WeatherInfo
},

  mounted() {
    this.getLocation();
  },

  methods: {
    

    create(city) {
      this.searchcity = city
    this.fetchData();
    console.info('prueba')
  },
    
    getLocation() {


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.searchcity = `${latitude},${longitude}`
          this.fetchData();
                  });
      } else {
        reject('La geolocalización no es compatible en este navegador.');
      }

      
  },

    fetchData() {
      WeatherService.getWeatherByCity(this.searchcity)
        .then(weatherData => {
          const store = useStore();
          store.setWeatherData(weatherData);
          this.lastUpdated = weatherData.current.last_updated;

          console.info(weatherData)
          
          const date = new Date(this.lastUpdated);
          const dayOfWeek = date.toLocaleString('es-ES', { weekday: 'long' });

      // Asigna la fecha y hora formateadas a la propiedad lastUpdatedDateTime
          this.lastUpdatedDateTime = `${dayOfWeek}, ${date.toLocaleTimeString()}`;

          

           // Convierte el tiempo restante a milisegundos

          
        })
        .catch(error => {
          console.error(error);
        });
    },
    
    

  },
  computed: {
    weatherData() {
      const store = useStore();
      return store.getWeatherData;
    }
  }
});
</script>

<style>

body{
  background: #dde1e7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather-container {
  display: flex;
  justify-content: space-between;
}

.weather-app {
  align-self: flex-start;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);
}
.weather-details {
  display: flex;
}

.weather-detail {
  flex-basis: calc(33.33% - 10px); /* Dividir el espacio en 3 partes iguales y restar el margen */
  margin-right: 10px;
  
}

.weather-detail:last-child {
  margin-right: 0;
}



</style>


