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
        wsFactory: null,
        conn: null,
      }
    },
    created () {
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
        this.conn = this.wsFactory.create('XtLQwO6A5ZKNsyyAuVQHraOKy','127.0.0.1','22','root','root')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row{
  margin-top: 10px;
}
</style>
