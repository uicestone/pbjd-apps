<template lang="pug">
  div.page-movie-detail
    div.main-title 我要对党说
    div.content
      div.video-container
        video.video(:poster="poster"  :src="currentVideo.url" ref="video" @click="stopPlay" width=480 heigh=320)   
        img.button-play(v-if="!playing" @click="play" src="~@/assets/image/button_replay.png")                 
        audio.hidden(ref="audio" :src="audioUrl") 
      div.qrcode-group(v-if="qrcodeUrl")
        img.qrcode-image( src="qrcodeUrl")
        p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
    img.logo(src="~@/assets/image/sound.png") 
    
</template>


<script>
import * as request from "../../utils/request";
import staticGen from "../../static-gen.js";

export default {
  data() {
    return {
      playing: false,
      videos: staticGen.talk,
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
    },
    stopPlay() {
      const { video, audio } = this.$refs;
      this.playing = false;
      video.pause();
      audio.pause();
      video.currentTime = 0;
      audio.currentTime = 0;
    }
  },
  computed: {
    poster() {
      return this.playing
        ? "static/images/music_bg_play.png"
        : "static/images/music_bg.png";
    },
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

    this.qrcodeUrl = qrcodeUrl;
    this.currentIndex = bgid;
    this.audioUrl = audioUrl;
  }
};
</script>


<style lang="stylus" scoped>
.page-movie-detail
  height 100vh
  background url('~@/assets//image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.content
  display flex
  align-content center
  justify-content space-around
  padding 5vh 0
  height 73vh
.video-container
  position relative
.hidden
  display none
.button-play
  position absolute
  left 50%
  top 30vh
  margin -102px 0 0 -102px
.video
  width 60vw
  height 64vh
.qrcode-group
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
.qrcode-text
  font-size 1.8vw
  font-weight 600
  color black
.logo
  position absolute
  width 20vw
  left 79vw
  top 1vw
</style>
