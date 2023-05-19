<template>
  <div class="weather-app" v-if="weatherData">
    <div class="search-container">
      <input type="text" v-model="city" placeholder="Ingresa una ubicación" class="search-input" @keyup.enter="create">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="create" >
      <path d="M22.48 20.94L17.61 16.07C16.19 17.31 14.38 18 12.5 18C8.91 18 6 15.09 6 11.5C6 7.91 8.91 5 12.5 5C16.09 5 19 7.91 19 11.5C19 13.38 18.31 15.19 17.07 16.61L21.94 21.48C22.11 21.66 22.11 21.93 21.94 22.11C21.76 22.28 21.49 22.28 21.32 22.11L22.48 20.95C22.66 20.78 22.66 20.51 22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34ZM8 11.5C8 14.54 10.46 17 13.5 17C16.54 17 19 14.54 19 11.5C19 8.46 16.54 6 13.5 6C10.46 6 8 8.46 8 11.5Z"/>
    </svg>
    </div>
    <!-- Mostrar los datos obtenidos de la API -->
    <div class="weather-container">
      <img :src="weatherData.current.condition.icon" alt="Weather Icon" class="weather-icon">
      <h2 class="location">{{ weatherData.location.name }}</h2>
      <p class="temperature">{{ weatherData.current.temp_c }}°<sup>c</sup></p>
      <p class="rainfall">Lluvia - {{ weatherData.current.precip_mm }} mm</p>
      <font-awesome-icon icon="fa-light fa-raindrops" /><p class="condition">{{ weatherData.current.condition.text }}</p>
      <p class="last-updated">Última actualización: {{ lastUpdatedDateTime }}</p>
      
      <!-- Otros datos que deseas mostrar -->
    </div>

    <p class="update-time">Tiempo restante hasta la próxima actualización: {{ timeRemaining }}</p>

    <wind-info
        :direction="weatherData.current.wind_dir"
        :speed="weatherData.current.wind_kph"
      ></wind-info>
  </div>
</template>

<script>
import WindInfo from './WindInfo.vue';

export default {
  // ... resto del código ...

  components: {
    WindInfo
  }
};
</script>

<style>
/* Estilos del componente WeatherApp */
</style>