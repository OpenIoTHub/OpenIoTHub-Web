<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
html,
body,
#app,
.wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x:hidden;
}
ul{
    list-style: none;
}
body {
    font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
    font-size: 14px;
}
a {
    text-decoration: none;
    color: rgb(255, 255, 255);
}
</style>
