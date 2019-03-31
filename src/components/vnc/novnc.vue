<template>
  <div>
    <button @click="connect">连接</button>
    <button @click="back">返回管理平台</button>
    <div id="view"></div>
  </div>
</template>

<script>
import RFB from '@novnc/novnc/core/rfb';

export default {
  data() {
    return {
      rfb: null,
      url: this.$route.params.url,
      passwd: this.$route.params.passwd,
    };
  },

  methods: {
    connect() {
      console.log(this.url)
      console.log(this.passwd)
      this.rfb.sendCredentials({ password: this.passwd });
    },
    back() {
      this.$router.push({name: 'vnc'})
    },
    disconnect() {
      this.rfb.disconnect();
    }
  },
  beforeDestroy () {
    this.disconnect()
  },
  mounted() {
    this.$nextTick(() => {
      this.rfb = new RFB(this.$el.lastChild, this.url);
      //ws连接上就创建
      //this.rfb.addEventListener("connect",  this.connect());
    });
  }
};
</script>
