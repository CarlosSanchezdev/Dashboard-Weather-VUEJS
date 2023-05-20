<template>
  <div class="search-container">
    <input type="text" v-model="city" placeholder="Ingresa una ubicación" class="search-input" @keyup.enter="create">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="create" >
      <path d="M22.48 20.94L17.61 16.07C16.19 17.31 14.38 18 12.5 18C8.91 18 6 15.09 6 11.5C6 7.91 8.91 5 12.5 5C16.09 5 19 7.91 19 11.5C19 13.38 18.31 15.19 17.07 16.61L21.94 21.48C22.11 21.66 22.11 21.93 21.94 22.11C21.76 22.28 21.49 22.28 21.32 22.11L22.48 20.95C22.66 20.78 22.66 20.51 22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34L22.48 20.34Z"/>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: '',
    };
  },
  methods: {
    create() {
      this.$emit('search', this.city);
      this.city = '';
    },
  },
};
</script>

<style scoped>
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
</style>
