<template>
  <div class="wind-container">
    <p class="wind-direction">Dirección del viento: {{ direction }}</p>
    <p class="wind-speed">Velocidad del viento: {{ speed }} km/h</p>
  </div>
</template>

<script>
export default {
    computed: {
    ...mapState(['weatherData'])
  },
  props: {
    direction: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
.wind-container {
  margin-bottom: 20px;
}

.wind-direction,
.wind-speed {
  margin-bottom: 10px;
}
</style>
