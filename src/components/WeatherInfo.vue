<template>
  <div class="weather-info">
    <div class="weather-icon">
      <img :src="weatherData.current.condition.icon" alt="Weather Icon" class="icon">
    </div>
    <div class="weather-details">
      <h2 class="location">{{ weatherData.location.name }}</h2>
      <p class="temperature">{{ weatherData.current.temp_c }}°<sup>c</sup></p>
      <p class="rainfall">Lluvia - {{ weatherData.current.precip_mm }} mm</p>
      <p class="condition">{{ weatherData.current.condition.text }}</p>
      <p class="last-updated">Última actualización: {{ lastUpdatedDateTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object,
      required: true
    },
    lastUpdatedDateTime: {
      type: String,
      required: true
    }
  }
};

</script>

<style scoped>
.weather-info {
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon {
  margin-right: 20px;
}

.weather-icon .icon {
  width: 200px;
  height: 200px;
}

.weather-details {
  text-align: left;
  display: flex;
  flex-direction: column;
}

.location {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
}

.rainfall,
.condition,
.last-updated {
  margin-bottom: 10px;
}
</style>

