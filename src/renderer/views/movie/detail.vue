<template lang="pug">
  div.page-movie-detail
    div.main-title 红色电影配音
    div.content
      div.video-container
        video.video( ref="video" :src="currentVideo.url" width=480 heigh=320)    
        img.button-play(v-if="!playing" @click="play" src="~@/assets/image/button_replay.png")
        audio.hidden(controls ref="audio" :src="audioUrl") 
      div.qrcode-group(v-if="qrcodeUrl")
        img.qrcode-image(src="qrcodeUrl")
        p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
      
</template>


<script>
import * as request from "../../utils/request";

export default {
  data() {
    return {
      playing: false,
      videos: {
        "1": {
          value: "1",
          label: "小兵张嘎",
          url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        }
      },
      audioUrl: "",
      currentIndex: "1",
      qrcodeUrl: ""
    };
  },
  methods: {
    play() {
      const { video, audio } = this.$refs;
      this.playing = true;
      video.play();
      audio.play();
    }
  },
  computed: {
    currentVideo() {
      return this.videos[this.currentIndex] || {};
    }
  },
  async mounted() {
    const { query } = this.$route;
    const { id, qrcodeUrl } = query;
    let data = await request.getSpeechMove({ id });
    console.log(data);
    const { bgid, audioUrl } = data;

    this.currentIndex = bgid;
    this.audioUrl = audioUrl;
    this.qrcodeUrl = qrcodeUrl;
  }
};
</script>


<style lang="stylus" scoped>
.page-movie-detail
  height 100vh
  background url('~@/assets/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.video-container
  position relative
.button-play
  position absolute
  left 50%
  top 50%
  margin -102px 0 0 -102px
.content
  display flex
  align-content center
  justify-content space-around
  padding 1rem 0
  margin 2vw 0
.hidden
  display none
.qrcode-group
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
.qrcode-text
  font-weight 600
  font-size 1.8vw
  color black
.video
  width 60vw
</style>
