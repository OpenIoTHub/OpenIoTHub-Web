<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>本管理页面访问用户和密码</span>
      </div>
      <el-tooltip class="item" effect="dark" content="本管理页面的新的访问用户名" placement="top">
        <el-input
          placeholder="用户名"
          v-model="username"
          clearable>
        </el-input>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="本管理页面的新的访问密码" placement="top">
        <el-input
          placeholder="密码"
          v-model="password"
          show-password
          clearable>
        </el-input>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="使用户名密码生效" placement="top">
        <el-button type="primary" @click="saveUserPassConfig()">保存</el-button>
      </el-tooltip>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  data () {
    return {
      username:"",
      password:"",
    }
  },
  components: {

  },
  created (){

  },
  beforeDestroy () {
  
  },
  methods: {
    saveUserPassConfig (){
      console.log("保存用户名密码")
      console.log(this.username,this.password)
      this.$service.createSettingFromList([{key:"explorerWebUser",value:this.username},{key:"explorerWebPass",value:this.password}]).then(
        (res) =>{
          console.log(res)
          if (res.data.code == 0){
            this.$message.success('保存用户名密码成功！'+ res.data.message)
          }else{
            this.$message.error('保存用户名密码失败！' + res.data.message)
          }
        }
      )
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
