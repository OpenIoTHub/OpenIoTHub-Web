<template>
  <div>
  <el-row>
    <v-head></v-head>
  </el-row>
  <el-row :gutter="26">
    <el-col :span="6" class="side">
      <v-sidebar></v-sidebar>
    </el-col>
    <el-col :span="19">
      <router-view></router-view>
    </el-col>
  </el-row>
  <el-row>
    <v-footer></v-footer>
  </el-row>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import vFooter from './Footer.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    vHead,
    vSidebar,
    vFooter
  },
  watch: {
  },
  computed:{
  }
}
</script>

<style scoped>
.side{
  width: 250px;
  background-color: rgb(84, 92, 100);
  min-height: 86vh;
}

</style>
