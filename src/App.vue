<template>
  <v-app id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </v-app>
</template>

<script>
import Navbar from '@/components/layouts/Navbar'
export default {
  name: 'App',
  components :{
    Navbar
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  #demo {
  overflow: hidden;
}

  .slide-leave-active,
  .slide-enter-active {
    transition: 1s;
  }
  .slide-enter {
    transform: translate(100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }

  .img-slider{
    overflow: hidden;
    position: relative;
    height: 200px;
    width: 400px;
  }

  .img-slider img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right:0;
  }
</style>
