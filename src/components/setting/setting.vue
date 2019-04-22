<template>
  <div>
    <el-row>
      &nbsp;
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>配置文件</span>
          </div>
          <el-button type="primary"><a href="/proxy/op/getCurrentConfig.yaml">下载</a></el-button>
          <el-button type="primary" @click="saveConfig()">保存</el-button>
          <el-button type="primary" @click="uploadConfig()">上传</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
    <el-dialog
      title="上传配置文件"
      :visible.sync="dialogVisible"
      width="30%">
        <el-upload
          drag
          auto-upload
          action="/proxy/op/useUploadConfig"
          :on-success="successUp"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  data () {
    return {
      dialogVisible:false
    }
  },
  components: {

  },
  created (){

  },
  beforeDestroy () {
  
  },
  methods: {
    saveConfig (){
      console.log("保存")
      this.$service.saveConfig().then(
        (res) =>{
          console.log(res)
          if (res.data.code == 0){
            this.$message.success('保存成功！', res.message)
          }else{
            this.$message.error('保存失败！', res.message)
          }
        }
      )
    },
    uploadConfig (){
      console.log("上传")
      this.dialogVisible = true
    },
    successUp(response, file, fileList){
      console.log(response)
      if (response.code == 0){
        this.$message.success('导入成功！')
      }else{
        this.$message.error('导入失败！：' + response.message)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
