<script>
import * as request from "../../utils/request";
import uuid from "uuid";
import staticGen from "../../static-gen.js";

export default {
  data() {
    return {
      playing: false,
      rec: new Recorder(),
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
    this.rec.open();
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
        this.rec.stop(blob => {
          this.audioUrl = URL.createObjectURL(blob);
          let file = new File([blob], `${uuid.v1()}.mp3`);
          this.audioFile = file;
          this.rec.close();
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
        video.video(:poster="poster" ref="video" :src="currentVideo.url")
      div.button-group
        audio.hidden(controls ref="audio" :src="audioUrl")    
        img.record(@click="record" src="~@/assets/image/button_record.png")
        img.play( @click="play" src="~@/assets/image/button_play.png")
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
  height 65vh
  display flex
  flex 1
  align-content center
  justify-content space-around
  padding 1rem 0
.video
  width 40vw
.hidden
  display none
.button-group
  display flex
  justify-content center
  flex-direction column
.selectGrop
  font-size 1.2vw
  font-weight 600
  color black
  display flex
  justify-content space-between
  align-items center
  margin 2vw 0
  .select
    flex 1
    text-align center
    margin 0 0 0 20px
    padding 0 0 0 15px
    font-weight 600
    font-size 1.4vw
    border none
    height 6vh
    background url('~@/assets//image/select.png') center center no-repeat
    background-size contain
.upload
  display flex
  align-items center
.button4
  border none
  color white
  padding 0.75vw 4.5vw
  background url('~@/assets//image/button_blue_4.png') center center no-repeat
  background-size cover
  font-size 3rem
  text-align center
.logo
  position absolute
  width 20vw
  right 10px
  top 10px
.record, .play
  margin 2vw 0
</style>
