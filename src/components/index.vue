<template>
  <div class="hello">
    <el-row :gutter="20">
      <el-col :span="8"><div>&nbsp;</div></el-col>
      <el-col :span="8">
        <el-form :inline="true">
        <el-input
          placeholder="请输入访问token："
          v-model="token"
          class="input"
          clearable>
        </el-input>
        <el-input
          placeholder="请输入备注："
          v-model="description"
          style="margin-top: 60px;"
          clearable>
        </el-input>
        <el-button type="primary" @click="onSubmit" style="  margin-top: 20px;">立即连接</el-button>
        </el-form>
      </el-col>
      <el-col :span="8"><div>&nbsp;</div></el-col>
    </el-row>

  </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
  data () {
    return {
      token: '',
      description: '',
    }
  },
  created (){
    console.log("created!")
    axios({
      // baseURL: 'http://127.0.0.1:8010',
      method: 'get',
      url: '/loginStatus'
    })
    .then(response=> {
      console.log(response)
      // if(response.data.message=='online'){
      //   this.login=true
      //   this.$router.push({ path: '/TCP' })
      // }
      console.log(response.data.message);
    })
  },
  methods: {
    onSubmit(){
      if(this.token == ''){
        return
      }
      axios({
        // baseURL: 'http://127.0.0.1:8010',
        method: 'get',
        url: '/login?token='+this.token+'&description='+this.description,
      })
      .then(response=> {
        console.log(response);
        Message.success({
          showClose: true,
          message: '登录成功！'
          })
        this.$router.push({ path: '/TCP' })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #5442b9;
}
.input {
  margin-top: 160px;
}
</style>
