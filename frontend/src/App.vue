<template>
  <div id="app">
    <library-form />
  </div>
</template>

<script>
import LibraryForm from './components/LibraryForm.vue'

export default {
  name: 'App',
  components: {
    LibraryForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
