<template>
  <div>
    <el-row>
      <el-button type="primary" @click="createOne()">打开一个VNC</el-button>
    </el-row>
    <el-row>
      <el-card>
        
      </el-card>
    </el-row>
    <el-dialog title="输入远程VNC信息" :visible.sync="dialogFormVisible" @close='closeForm'>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="远程内网:" prop="RunId" required>
          <el-select filterable v-model="form.RunId" placeholder="请选择内网" style="width: 86%;">
            <el-option
              v-for="item in netList"
              :key="item.RunId"
              :label="item.Description"
              :value="item.RunId" />
          </el-select>
        </el-form-item>
        <el-form-item label="IP" :label-width="formLabelWidth" prop="IP" required>
          <el-input v-model="form.IP" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth" prop="Port" required>
          <el-input v-model="form.Port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VNC密码：" :label-width="formLabelWidth" prop="PassWd" required>
          <el-input v-model="form.PassWd" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="openVNC('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {WsConnectionFactory as wsFactory} from '@/lib/websocket/websocket'

  export default {
    name: "vnc",
    computed: {
    },
    data () {
      return {
        netList:[],
        dialogFormVisible:false,
        form:{
          RunId:'',
          Port:5900
        },
        wsFactory: null,
        formLabelWidth: '70px',
        rules: {
          RunId: [
            { required: true, message: '请选择所属内网', trigger: 'change' },
          ],
          IP: [
            { required: true, message: '请输入内网IP', trigger: 'blur' },
          ],
          Port: [
            {type: 'number', required: true, message: '请输入内网端口', trigger: 'blur' },
          ],
          PassWd: [
            { required: true, message: '请输入VNC密码', trigger: 'blur' },
          ],
        }
      }
    },
    created () {
      this.fetchAllNet()
      this.wsFactory = new wsFactory('ws://'+window.location.host.split(':')[0]+':1081')
    },
    beforeDestroy () {

    },
    methods: {
      createOne () {
        this.dialogFormVisible=true
      },
      openVNC(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.url = this.wsFactory.createWebsockifyUrl(this.form.RunId,this.form.IP,this.form.Port)
            this.dialogFormVisible=false
            this.$router.push({
              name: 'novnc',
              params: {
                url:this.url,
                passwd: this.form.PassWd
              }
            })
          } else {
            this.$message.error('请输入必填参数！')
            return false;
          }
        });

      },
      closeForm(){
        this.dialogFormVisible=false
      },
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row{
  margin-top: 10px;
}
</style>
