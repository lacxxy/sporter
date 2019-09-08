<template>
  <div id="app">
      <div class="headbar">
        <img>

      </div>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{

  }
}
</script>
<style>
#app{
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  background: url("./assets/1.png");
  background-size: cover;
}
</style>
