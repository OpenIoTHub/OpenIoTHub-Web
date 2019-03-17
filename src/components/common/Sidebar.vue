<template>
  <div class="sidebar">
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="forward('/session')">
        <i class="el-icon-upload"></i>
        <span slot="title">我的内网</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>端口代理</span>
        </template>
        <el-menu-item index="2-1" @click="forward('/tcp')">TCP</el-menu-item>
        <el-menu-item index="2-2" @click="forward('/udp')">UDP</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" @click="forward('/http')">
        <i class="el-icon-document"></i>
        <span slot="title">HTTP代理</span>
      </el-menu-item>
      <el-menu-item index="5" @click="forward('/setting')">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log("open")
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log("close")
        console.log(key, keyPath);
      },
      forward(path){
        console.log(path)
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
ul {
    border-right: 0px;
}
</style>
