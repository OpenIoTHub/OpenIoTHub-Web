<template>
  <div>
    <div id="terminal" ></div>
  </div>
</template>

<script>
  import {Terminal} from 'xterm';

  import * as fit from 'xterm/lib/addons/fit/fit';
  import * as attach from 'xterm/lib/addons/attach/attach';
  import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
  import * as search from 'xterm/lib/addons/search/search';
  import * as webLinks from 'xterm/lib/addons/webLinks/webLinks';
  import * as winptyCompat from 'xterm/lib/addons/winptyCompat/winptyCompat';
  import 'xterm/dist/xterm.css'
  Terminal.applyAddon(fit);
  Terminal.applyAddon(attach)
  Terminal.applyAddon(fullscreen)
  Terminal.applyAddon(search)
  Terminal.applyAddon(webLinks)
  Terminal.applyAddon(winptyCompat)

  export default {
    name: "terminal",
    props: [
      'conn',
    ],
    data () {
      return {
        term: null,
      }
    },
    mounted () {
      this.term = new Terminal()
      let terminalContainer = document.getElementById('terminal')
      this.term.open(terminalContainer)
      if(this.conn){
        this.conn.onopen = this.runRealTerminal
      }
      // attach.attach(this.term, this.conn)
      fit.fit(this.term)
    },
    beforeDestroy () {
      this.conn.close()
    },
    methods: {
      clear () {
        this.term.clear()
      },
      // 
    runRealTerminal() {
      attach.attach(this.term, this.conn)
      this.term._initialized = true;
    },
    },
    watch: {
      conn: function () {
        this.clear()
        if(!this.term._initialized){
          this.runRealTerminal()
        }
      }
    }
  }
</script>

<style scoped>
  .terminal {
    height: 70vh;
  }
</style>
