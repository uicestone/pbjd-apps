<template lang="pug">
  div.page-movie-detail
    div.main-title 红色电影配音
    div.content
      div.video-container
        video.video( ref="video" :src="currentVideo.url" @click="stopPlay" x5-playsinline playsinline webkit-playsinline width=480 heigh=320)    
        img.button-play(v-if="!playing" @click="play" src="~@/assets/image/button_replay.png")
        audio.hidden(controls ref="audio" :src="audioUrl") 
      div.qrcode-group(v-if="sharable")
        div(v-if="shared")
          canvas.qrcode-canvas(ref="qrcode")
          p.share-hint 扫描二维码，分享到微信
        div.form(v-if="!shared")
          form(@submit="submitAuthor")
            p 您的姓名
            input.input(v-model="speech.authorName" required)
            p 您所在的街道/镇
            select.input(v-model="speech.authorTown" required)
              option(v-for="town in $parent.$parent.towns") {{ town }}
            button.button4(type="submit" :class="{disabled:!speech.authorTown || !speech.authorName}") 分享
    button.button-back(@click="$router.go(-1)") 返回
      
</template>


<script>
import * as request from "../../utils/request";
import staticGen from "../../static-gen.js";
import QRCode from 'qrcode';

export default {
  data() {
    return {
      playing: false,
      videos: staticGen.movie,
      speech: {},
      audioUrl: "",
      currentIndex: "1",
      qrcodeUrl: "",
      author: {},
      sharable: !!window.process, // hide share form in web
      shared: false,
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
    },
    submitAuthor(e) {
      e.preventDefault();
      request.updateSpeech(this.speech).then(() => {
        this.shared = true;
        setTimeout(() => {
          this.generateQRCode();
        });
      })
    },
    generateQRCode() {
      const { qrcode } = this.$refs;
      QRCode.toCanvas(qrcode, `https://pbjd-apps.hbird.com.cn/#/movie/detail?id=${this.speech.id}`);
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
    this.speech = await request.getSpeechMove({ id });
    const { bgid, audioUrl } = this.speech;

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
  top 21.5vh
  margin 0 0 0 -5vw
  width 10vw
.content
  display flex
  align-content center
  justify-content space-around
  padding 5vh 3vw
  height 73vh  
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
  max-height 100%
.form
  display flex
  flex-direction column
  justify-content center
  height 80%
  width 26vw
  font-size 1.5vw
  font-weight 600
  color black
  p
    font-size 2vw
    color #888
    text-align left
  .input
    width 100%
    height 8vh
    padding 1vw
    border 3px #CCC solid
    box-shadow 0 0.22vw 0.44vw #888
    margin-bottom 5vh
  .button4
    border none
    color white
    background url('~@/assets//image/button_blue_4.png') center center no-repeat
    background-size cover
    font-size 3rem
    text-align center
    font-size 3.1vw
    text-align center
    width 21.19vw
    height 5.87vw
    font-weight bold
    margin 0 auto
    &.disabled
      opacity 0.5
      color #ccc
.qrcode-canvas
  width 26vw !important
  height 26vw !important
  background black
.share-hint
  margin-top 2vh
  font-size 2vw
  color #888
</style>
