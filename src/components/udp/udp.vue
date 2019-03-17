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
              label="内网Id"
              width="210">
              <template slot-scope="scope">{{ scope.row.RunId }}</template>
            </el-table-column>
            <el-table-column
              label="本地Ip"
              width="120">
              <template slot-scope="scope">{{ scope.row.LocalIP }}</template>
            </el-table-column>
            <el-table-column
              label="本地端口"
              width="70">
              <template slot-scope="scope">{{ scope.row.LocalProt }}</template>
            </el-table-column>
            <el-table-column
              label="远程Ip"
              width="120">
              <template slot-scope="scope">{{ scope.row.RemoteIP }}</template>
            </el-table-column>
            <el-table-column
              label="远程端口"
              width="70">
              <template slot-scope="scope">{{ scope.row.RemotePort }}</template>
            </el-table-column> 
            <el-table-column
              label="远程端口状态"
              width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.RemotePortStatus ? 'success' : 'danger'"
                disable-transitions>{{scope.row.RemotePortStatus?'在线':'离线'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="Description"
              label="描述"
              width="200">
            </el-table-column>
          </el-table>
        </template>
      </el-card>
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
    startInterval () {
      if (!this.intervalFlag){
        this.intervalFlag = true
        this.intervalId = setInterval(this.getTableData, 10000);
      }
    },
    getTableData(){
      this.$service.fetchAllUdp().then(
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
        console.log('delete:',val.LocalProt)
        this.$service.deleteOneUdp (val.LocalProt)
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
