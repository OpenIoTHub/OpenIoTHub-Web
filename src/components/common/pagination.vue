<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="100"
      prev-text="上一页"
      next-text="下一页"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {type: Number, default: 10},
    pageSizes: { type: Array },
    init: { type: Function, default: function () {} }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  watch: {
    '$store.state.projectId' () {
      this.currentPage = 1
      this.pageSize = 10
    },
    currentPage: function (val) {
      this.$emit('setCurrentPage', val)
    },
    pageSize: function (val) {
      this.$emit('setPageSize', val)
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped>

</style>
