<template>
  <div>
    <el-row>
      &nbsp;
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <config></config>
      </el-col>
      <el-col :span="8">
        <explorerUserPass></explorerUserPass>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import config from './config'
import explorerUserPass from './explorerUserPass'
export default {
  data () {
    return {
      dialogVisible:false
    }
  },
  components: {
    config,
    explorerUserPass
  },
  created (){

  },
  beforeDestroy () {
  
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
