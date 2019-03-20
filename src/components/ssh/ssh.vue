<template>
  <div>
    <el-row>
      <el-button type="primary" @click="createOne()">打开一个ssh</el-button>
    </el-row>
    <el-row>
      <el-card>
        <terminal :conn="conn"></terminal>
      </el-card>
    </el-row>
    <el-dialog title="添加一个内网" :visible.sync="dialogFormVisible" @close='closeForm'>
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
        <el-form-item label="IP" :label-width="formLabelWidth">
          <el-input v-model="form.IP" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth">
          <el-input v-model="form.Port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.passWord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeForm">取 消</el-button>
        <el-button type="primary" @click="openSSH">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import terminal from './terminal'
  import {WsConnectionFactory as wsFactory} from '@/lib/websocket/websocket'

  export default {
    name: "shell",
    components: {terminal},
    computed: {
    },
    data () {
      return {
        netList:[],
        dialogFormVisible:false,
        form:{},
        wsFactory: null,
        conn: null,
        formLabelWidth: '70px',
      }
    },
    created () {
      this.fetchAllNet()
      this.wsFactory = new wsFactory('ws://127.0.0.1:81')
      // this.conn = this.wsFactory.create('XtLQwO6A5ZKNsyyAuVQHraOKy','127.0.0.1','22','root','root')
      // socketURL = 'ws://127.0.0.1:81/proxy/ws/connect/ssh?runId=XtLQwO6A5ZKNsyyAuVQHraOKy&remoteIp=127.0.0.1&remotePort=22&userName=root&passWord=root';
      // thsi.conn = new WebSocket(socketURL);
    },
    beforeDestroy () {
      // this.conn.close()
    },
    methods: {
      //切换容器
      createOne () {
        // this.conn.close()
        this.dialogFormVisible=true
      },
      openSSH(){
        this.conn = this.wsFactory.create(this.form.RunId,this.form.IP,this.form.Port,this.form.userName,this.form.passWord)
        this.dialogFormVisible=false
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
