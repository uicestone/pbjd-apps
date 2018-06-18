<template lang="pug">
  div#app
    transition(name="fade")
      router-view
    div(v-if="cachingAttachments.length" ref="hidden")
      div.caching-media-indicator 正在缓存媒体资源… 剩余 {{ cachingAttachments.length }} 项
      div.caching-media
        div(v-if="cachingAttachments.length" v-for="(item, index) in cachingAttachments")
          img(v-if="item.type == 'image'" :src="item.url" @load="mediaLoaded(item)")
          audio(v-if="item.type == 'audio'" :src="item.url" preload="auto" @loadeddata="mediaLoaded(item)")
          video(v-if="item.type == 'video'" :src="item.url" preload="auto" @loadeddata="mediaLoaded(item)")


</template>

<script>
import * as request from "./utils/request";

export default {
  name: "app",
  data(){
    return {
      cacheMedia: window.process && window.process.env.NODE_ENV === 'production', // cache media only in production electron version
      cachingAttachments: []
    }
  },
  methods: {
    goHome() {
      const {meta: {homeName}} = this.$route;

      if(homeName){
        this.$router.replace({name: homeName})
      }
    },
    mediaLoaded(attachment) {
      this.cachingAttachments = this.cachingAttachments.filter(a => a.url !== attachment.url);
    }
  },
  async mounted(){
    if (this.cacheMedia) {
      this.cachingAttachments = await request.getAllResources();
    }

    const resetGoHomeTimeout = () => {
      if (this.goHomeTimeout) {
        clearTimeout(this.goHomeTimeout);
      }
      this.goHomeTimeout = setTimeout(() => this.goHome(), 300000);
    };

    resetGoHomeTimeout();

    ['click','touchstart', 'keydown', 'scroll'].forEach(i => {
      document.addEventListener(i, e => {
        resetGoHomeTimeout();
      })
    });

    ['scroll'].forEach(i => {
      document.addEventListener(i, e => {
        resetGoHomeTimeout();
      })
    });
  }
};
</script>

<style lang="less">
@import "~iview/src/styles/index.less";
@import "~leaflet/dist/leaflet.css";
@import "./assets/fonts/Guoxiang.css";

body::-webkit-scrollbar {
  display: none;
}

.fade-enter-active {
  animation: fade-in 1s;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.fade-leave-active {
  animation: fade-in 1s reverse;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@link-color: #000000;
html {
  font-size: 10px;
}
input,
textarea,
select {
  -webkit-appearance: none;
  border: none;
  outline: none;
}
li {
  list-style-type: none;
}
.ivu-select-selection {
  all: unset;
  i {
    display: none !important;
  }
}
.ivu-select {
  all: unset;
}
.ivu-select-dropdown {
  overflow: hidden !important;
}
.main-title {
  color: white;
  height: 13.21vh;
  width: 38.11vw;
  background: #cc3739;
  border-bottom: 4px solid #92232c;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.3vw;
  font-weight: bold;
}
.button-back {
  border: none;
  z-index: 10000;
  color: white;
  padding: 0.5vw 1.2vw;
  background: url("~@/assets/image/button_blue_2.png") center center no-repeat;
  background-size: cover;
  font-size: 0.83vw;
  display: flex;
  letter-spacing: 0.52vw;
  text-indent: 0.52vw;
  text-align: center;
  margin: 1vh auto 0;
}

.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  all: unset;
}
.caching-media {
  display: none;
}
.caching-media-indicator {
  font-size: 1vw;
  color: grey;
  position: absolute;
  left: 1vw;
  top: 97vh;
}
</style>
