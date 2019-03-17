<template>
  <div>
    <el-dialog title="添加一个内网" :visible.sync="dialogFormVisible" @close='closeForm'>
      <el-form :model="form">
        <el-form-item label="内网Token" :label-width="formLabelWidth">
          <el-input v-model="form.Token" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="自定义备注" :label-width="formLabelWidth">
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
      form: {
        Token: '',
        Description: '',
      },
      formLabelWidth: '120px'
    }
  },
  created (){
    
  },
  methods: {
    createByForm(){
      this.$emit('close')
      console.log(this.form)
      this.$service.createOneSession(this.form).then(
      (res)=>{
        console.log(res)
        if(res.data.code==0){
          Message.success('添加内网成功！内网ID：'+res.data.runId)
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
