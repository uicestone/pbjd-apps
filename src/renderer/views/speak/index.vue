<script>
import * as request from "../../utils/request";
import uuid from "uuid";
import staticGen from "../../static-gen.js";
import MicRecorder from "mic-recorder-to-mp3";

export default {
  data() {
    return {
      playing: false,
      rec: new MicRecorder({
        bitRate: 128
      }),
      isRecord: false,
      RecordSuccess: false,
      audioUrl: "",
      audioFile: "",
      videos: staticGen.talk,
      currentIndex: ""
    };
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
  mounted() {
    const firstVideo = Object.keys(this.videos)[0];
    this.currentIndex = firstVideo;
    // this.rec.open();
    // global.rec = this.rec;
  },
  methods: {
    record() {
      const { video } = this.$refs;
      const isRecord = this.isRecord;
      video.currentTime = 0;
      this.RecordSuccess = false;
      this.isRecord = !isRecord;
      if (!isRecord) {
        this.audioUrl = null;
        this.rec.start();
        video.play();
      }
      if (isRecord) {
        this.rec
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            this.audioUrl = URL.createObjectURL(blob);
            let file = new File([blob], `${uuid.v1()}.mp3`);
            this.audioFile = file;
          });
        video.pause();
        this.RecordSuccess = true;
      }
    },
    play() {
      if (!this.RecordSuccess || this.isRecord) return;
      this.playing = true;
      const { audio, video } = this.$refs;
      video.currentTime = 0;
      video.play();
      audio.play();
    },
    async upload() {
      const data = await request.UploadSpeechTalk({
        type: "talk",
        bgid: this.currentVideo.label,
        audio: this.audioFile
      });
      const { id, qrcodeUrl } = data;
      if (id) {
        this.$router.push({ name: "speakDetail", query: { id, qrcodeUrl } });
      }
    }
  }
};
</script>

<template lang="pug">
  div.page-speak-index
    div.main-title 我要对党说  
    div.content
      div
        div.selectGrop 选择背景音乐
          select.select(v-model="currentIndex")
            option.option(v-for="item in videos"  :value="item.label" :label="item.label" :key="item.label" ) {{item.label}}
        div.video-container
          video.video(:poster="poster" ref="video" :src="currentVideo.url")
      div.button-group
        audio.hidden(controls ref="audio" :src="audioUrl")    
        Icon.record(type="mic-a" @click="record")
        Icon.play(type="play" @click="play")
        //- Button.record(@click="record" shape="circle" icon="mic-a" size="large")
        //- Button.play(:disabled= "!RecordSuccess || isRecord" @click="play" shape="circle" icon="play" size="large")   
      div.upload   
        button.button4(@click="upload") 我要上传
    button.button-back(@click="$router.go(-1)") 返回    
    img.logo(src="~@/assets/image/sound.png") 
</template>


<style lang="stylus" scoped>
.page-speak-index
  height 100vh
  background url('~@/assets//image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.content
  height 73vh
  display flex
  align-content center
  justify-content space-between
  width 83.28vw
  margin auto
.video-container
  position relative
.video
  width 43.36vw
.hidden
  display none
.button-group
  display flex
  justify-content center
  flex-direction column
  margin-top 5vw
.selectGrop
  font-size 2vw
  font-weight 600
  color #000
  display flex
  justify-content space-between
  align-items center
  margin 2vw 0 5vw
  .select
    flex 1
    text-align center
    margin 0 0 0 20px
    padding 0 0 0 15px
    font-weight 600
    font-size inherit
    border none
    height 6vh
    background url('~@/assets//image/select.png') center center no-repeat
    background-size contain
.upload
  display flex
  align-items center
  margin-top 5vw
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
.logo
  position absolute
  width 20vw
  right 10px
  top 10px
.record, .play
  margin 2vw 0
  width 10vw
  height 10vw
  font-size 8vw
  text-align center
  line-height 10vw
  color white
  border-radius 5vw
.record
  background #b3292c
.play
  background #717171
  padding-left 1vw
  font-size 7vw
</style>
