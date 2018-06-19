<script>
import * as request from "../../utils/request";
import uuid from "uuid";
import staticGen from "../../static-gen.js";
import MicRecorder from "mic-recorder-to-mp3";

export default {
  data() {
    return {
      rec: new MicRecorder({
        bitRate: 128
      }),
      isRecord: false,
      RecordSuccess: false,
      audioFile: "",
      audioUrl: "",
      videos: staticGen.movie,
      currentIndex: "1",
      recordingSign: false,
      playing: false,
      recordingSignInterval:null
    };
  },
  computed: {
    currentVideo() {
      return this.videos[this.currentIndex] || {};
    }
  },
  mounted() {
    const firstVideo = Object.keys(this.videos)[0];
    this.currentIndex = firstVideo;
  },
  methods: {
    record() {

      if (this.playing) {
        return;
      }

      console.log('Start recording...');

      const { video } = this.$refs;
      const isRecord = this.isRecord;
      video.currentTime = 0;
      this.RecordSuccess = false;
      this.isRecord = !isRecord;
      if (!isRecord) {
        this.audioUrl = null;
        this.rec.start();
        this.recordingSignInterval = setInterval(() => {
          this.recordingSign = !this.recordingSign;
        }, 500);
        video.play();
      }
      if (isRecord) {
        console.log('Stop recording.');
        clearInterval(this.recordingSignInterval);
        video.pause();
        this.recordingSign = false;
        this.RecordSuccess = true;
        return this.rec
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            this.audioUrl = URL.createObjectURL(blob);
            let file = new File([blob], `${uuid.v1()}.mp3`);
            this.audioFile = file;
            console.log('Audio file generated.');
          });
      }
    },
    resetRecorder() {
      this.isRecord = false;
      this.RecordSuccess = false;
      this.audioFile = "";
      this.audioUrl = "";
      this.recordingSign = false;
    },
    async play() {

      const { audio, video } = this.$refs;

      if (this.playing) {
        console.log('Stop playing.');
        video.pause();
        if (audio)
        audio.pause();
        this.playing = false;
        return;
      }

      if (this.isRecord) {
        await this.record();
      }

      console.log('Play.');

      if (this.isRecord) return;

      video.currentTime = 0;
      video.play();

      if (this.RecordSuccess) {
        audio.currentTime = 0;
        audio.play();
      }

      this.playing = true;
    },
    async upload() {
      if (!this.audioFile) {
        return;
      }

      const data = await request.UploadSpeechMovie({
        bgid: this.currentVideo.label,
        audio: this.audioFile
      });
      const { id, qrcodeUrl } = data;
      if (id) {
        this.$router.push({ name: "movieDetail", query: { id, qrcodeUrl } });
      }
    },
    async bgChange() {
      if (this.playing) {
        this.play();
      }
      if (this.isRecord) {
        await this.record();
      }
      this.resetRecorder();
    }
  }
};
</script>

<template lang="pug">
  div.page-speak-index
    div.main-title 红色电影配音
    div.content
      div
        div.selectGrop 选择片段
          select.select(v-model="currentIndex" @change="bgChange")
            option.option(v-for="item in videos" :value="item.label" :key="item.value" :label="item.label") {{item.label}}
        video.video( ref="video" :src="currentVideo.url" x5-playsinline playsinline webkit-playsinline)
      div.button-group
        audio.hidden(controls ref="audio" :src="audioUrl")    
        Icon.record(type="mic-a" @click="record" v-bind:class="{recording:recordingSign,disabled:playing}")
        Icon.play(:type="playing ? 'stop' : 'play'" @click="play" v-bind:class="{recorded:audioFile,playing:playing}")
        
        //- Button.record(@click="record" shape="circle" icon="mic-a" size="large")
        //- Button.play(:disabled= "!RecordSuccess || isRecord" @click="play" shape="circle" icon="play" size="large")   
      div.upload   
        button.button4(@click="upload" v-bind:class="{disabled:!audioFile}") 我要上传
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
.hidden
  display none
.video
  width 43.36vw
  height 45vh
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
    height 6.5vh
    background url('~@/assets//image/select.png') center center no-repeat
    background-size contain
.button-group
  display flex
  justify-content center
  flex-direction column
  margin-top 5vw
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
  &.disabled
    opacity 0.5
    color #ccc
.logo
  position absolute
  width 20vw
  left 79vw
  top 1vw
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
  &.recording
    opacity 0.5
  &.disabled
    background #717171
.play
  background #717171
  &.ivu-icon-play
    padding-left 1vw
    font-size 7vw
  &.ivu-icon-stop
    font-size 5vw
  &.recorded, &.playing
    background #213137
</style>
