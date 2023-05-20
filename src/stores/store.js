import { createPinia, defineStore } from 'pinia';

export const pinia = createPinia();

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    weatherData: null
  }),
  actions: {
    setWeatherData(weatherData) {
      this.weatherData = weatherData;
    }
  },
  getters: {
    getWeatherData() {
      return this.weatherData;
    }
  }
});


