<template>
  <div>
    <el-row>
      <el-button type="primary" @click="createOne()">添加</el-button>
      <el-button type="danger" @click="deleteSelection()">删除所选</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </el-row>
    <el-row>
      <el-card>
        <template>
          <el-table
            ref="multipleTable"
            :data="sessionTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="RunId"
              width="210">
              <template slot-scope="scope">{{ scope.row.RunId }}</template>
            </el-table-column>
            <el-table-column
              label="连接状态"
              width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.StatusToClient ? 'success' : 'danger'"
                disable-transitions>{{scope.row.StatusToClient?'在线':'离线'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="P2P状态"
              width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.StatusP2PAsClient || scope.row.StatusP2PAsServer ? 'success' : 'danger'"
                disable-transitions>{{scope.row.StatusP2PAsClient || scope.row.StatusP2PAsServer?'在线':'离线'}}</el-tag> 
              </template>
            </el-table-column>
            <el-table-column
              prop="Description"
              label="描述"
              width="150">
            </el-table-column>
            <el-table-column
              prop="Token"
              label="Token"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="网桥"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch
                  v-model="vpnFlag"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="switchVpn(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </el-row>
    <el-row>
      <i class="el-icon-info"></i>使用网桥功能需要以管理员身份（root）运行软件，windows系统都需要安装openvpn的Tap驱动:https://tap-windows.updatestar.com/
    </el-row>
    <el-row>
      <i class="el-icon-info"></i>网桥成功之后，本地ip为192.168.69.2，远程内网端的为：192.168.69.1
    </el-row>
    <v-form :dialogFormVisible='dialogVisible' @close='closeForm'></v-form>
  </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
import vForm from './form.vue'
export default {
  data () {
    return {
      vpnFlag:false,
      intervalId:'',
      intervalFlag: false,
      dialogVisible: false,
      sessionTableData: [
      //   {
      //   RunId: 'XtLQwO6A5ZKNsyyAuVQHraOKy',
      //   Description: '我的Rock64开发板',
      //   Token: 'eyJpZCI6Ilh0TFF3TzZBNVpLTnN5eUF1VlFIcmFPS3kiLCJoIjoidGVuY2VudC1zaGFuZ2hhaS12MS5ob3N0Lm5hdC1jbG91ZC5jb20iLCJ0cCI6NzAwMCwia3AiOjcwMDAsInRscCI6NzAwMSwicG0iOjIsInQiOjE1NTIyMjkyOTIsImUiOjIwMDAwMDAsInMiOiIxMTViODYyZmNmMTIxNzZiYzYxYzRlM2NmMmY3YWE5ZiJ9'
      // }
      ],
      multipleSelection: []
    }
  },
  components: {
    vForm,
  },
  created (){
    console.log("created!")
    // 间隔刷新
    this.getTableData()
    this.startInterval()
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  methods: {
    switchVpn(row){
      console.log(this.vpnFlag)
      if(this.vpnFlag){
        this.$service.createOneVPN(row.RunId).then(
          (res)=>{
            if (res.data.code==0){
              Message.success('创建成功！')
            }else{
              Message.error('创建失败！原因：'+res.data.message)
            }
          }
        )
      }else{
        this.$service.deleteOneVPN()
      }
    },
    startInterval () {
      if (!this.intervalFlag){
        this.intervalFlag = true
        this.intervalId = setInterval(this.getTableData, 10000);
      }
    },
    getTableData(){
      this.$service.fetchAllSessions().then(
      (res)=>{
        console.log(res)
        if(res){
          this.sessionTableData = Object.values(res.data)          
        }else{
          this.sessionTableData = []
        }
      }
    )
    },
    createOne(){
      this.dialogVisible = true
    },
    closeForm(){
      this.dialogVisible = false
      this.getTableData()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteSelection(){
      // console.log(this.multipleSelection)
      this.multipleSelection.forEach((val,index)=>{
        console.log('delete:',val.RunId)
        this.$service.deleteOneSession (val.RunId)
      })
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
