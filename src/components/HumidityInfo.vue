<template>
  <div class="humidity-info">
    <p class="label">Humidity</p>
    <p class="humidity-value">{{ weatherData.current.humidity }}%</p>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>


.humidity-info {
  margin: 20px;
  margin-top: 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: -5px -5px 9px rgba(255, 255, 255, 0.45), 5px 5px 9px rgba(94, 104, 121, 0.3);
  width: 200px; /* Establecer un ancho específico */
  height: 200px; /* Establecer una altura específica */
  display: flex; /* Establecer el contenedor como flexbox */
   flex-direction: column; /* Establecer la dirección del flujo en columna */
  justify-content: center; /* Centrar horizontalmente el contenido */
  align-items: center; /* Centrar verticalmente el contenido */
}

.humidity-info .label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.humidity-value {
  font-size: 24px;
  font-weight: bold;
}
</style>
