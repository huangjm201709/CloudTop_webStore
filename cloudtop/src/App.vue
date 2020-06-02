<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <headnav/>
      <router-view/>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import head from './components/header/Head.vue'
export default {
  name: 'App',
  components: {
      headnav:head,
    },
}
</script>

<style>

</style>