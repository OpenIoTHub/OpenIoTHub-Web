<template>
  <div>
    <el-dialog title="添加一个HTTP代理" :visible.sync="dialogFormVisible" @close='closeForm'>
      <el-form :model="form">
        <el-form-item label="远程内网:">
          <el-select filterable v-model="form.RunId" placeholder="请选择内网" style="width: 86%;">
            <el-option
              v-for="item in netList"
              :key="item.RunId"
              :label="item.Description"
              :value="item.RunId" />
          </el-select>
        </el-form-item>
        <el-form-item label="域名" :label-width="formLabelWidth">
          <el-input v-model="form.Domain" autocomplete="off" placeholder="eg：abc.domain.com"></el-input>
        </el-form-item>
        <el-form-item label="远程Ip" :label-width="formLabelWidth">
          <el-input v-model="form.RemoteIP" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="远程端口" :label-width="formLabelWidth">
          <el-input v-model="form.RemotePort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.UserName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.Password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="在内网已经是https://访问" prop="delivery">
          <el-switch v-model="form.IfHttps"></el-switch>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.Description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="createByForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
  props: {
    dialogFormVisible: {
        type: Boolean,
        default: false
    },    
  },
  data () {
    return {
      // dialogVisible: dialogFormVisible,
      netList:[],
      form: {
        Description: "",
        Domain: "",
        IfHttps: false,
        Password: "",
        RemoteIP: "127.0.0.1",
        RemotePort: 80,
        RunId: "",
        UserName: ""
      },
      formLabelWidth: '70px'
    }
  },
  created (){
    this.fetchAllNet()
  },
  methods: {
    fetchAllNet(){
      this.$service.fetchAllSessions().then(
      (res)=>{
        console.log(res)
        if(res){
          this.netList = Object.values(res.data)
          this.form.RunId=this.netList[0].RunId       
        }else{
          this.netList = []
        }
      }
    )
    },
    createByForm(){
      this.$emit('close')
      console.log(this.form)
      this.form.Domain = this.form.Domain.replace(/https:\/\//g, "").replace(/http:\/\//g, "")
      this.$service.createOneHttp(this.form).then(
      (res)=>{
        console.log(res)
        if(res.data.code==0){
          Message.success('添加Http成功！')
        }else{
          Message.error('添加失败！原因：'+res.data.message)
        }
      }
    )
    },
    closeForm(){
      this.$emit('close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
