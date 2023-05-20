<template>
  <div class="uv-index">
    <p class="label">UV Index</p>
    <div class="uv-value">
      <p>{{ weatherData.current.uv }}</p>
      <div class="uv-bar" :style="{ width: uvBarWidth }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object,
      required: true
    }
  },
  computed: {
    uvBarWidth() {
      if (this.weatherData) {
        const uv = this.weatherData.current.uv;
        return `${(uv / 16) * 100}%`;
      }
      return '0%';
    }
  }
};
</script>

<style scoped>
.uv-index {

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

.uv-index .label {
font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.uv-value {
  display: flex;
  align-items: center;
}

.uv-value p {
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
}

.uv-bar {
  height: 8px;
  background-color: #ff6b6b;
  border-radius: 4px;
}
</style>
