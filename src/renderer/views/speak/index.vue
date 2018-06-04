<script>
export default {
  data() {
    return {
      recorder: null,
      isRecord: false,
      RecordSuccess: false,
      audioUrl: "",
      images: {
        button_record: "static/image/button_record.png",
        button_play:  "static/image/button_play.png",
        poster_play: "static/image/music_bg_play.png",
        poster: "static/image/music_bg.png",        
      }
    };
  },
  computed: {
    videos: {
      get() {
        return this.$store.state.Speak.videos;
      },
      set(currentIndex) {
        this.$store.commit("SET_SPEAK_STATE", {
          currentIndex
        });
      }
    },
    currentIndex: {
      get() {
        return this.$store.state.Speak.currentIndex;
      },
      set(currentIndex) {
        this.$store.commit("SET_SPEAK_STATE", {
          currentIndex
        });
      }
    },
    currentVideo() {
      return this.videos[this.currentIndex] || {};
    }
  },
  mounted() {
    this.init();
    this.currentIndex = "1";
  },
  methods: {
    record() {
      const { video } = this.$refs;
      const isRecord = this.isRecord;
      video.currentTime = 0;
      this.isRecord = !isRecord;
      this.RecordSuccess = false;
      if (!isRecord) {
        this.audioUrl = null;
        this.recorder.start();
        video.play();
      }
      if (isRecord) {
        this.recorder.stop();
        video.pause();
        this.RecordSuccess = true;
      }
    },
    play() {
      if(!this.RecordSuccess || this.isRecord) return;
      const { audio, video } = this.$refs;
      video.currentTime = 0;
      video.play();
      audio.play();
    },
    upload() {
      this.$router.push({ name: "speakDetail" });
    },
    init() {
      let options = {};
      if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        options = { mimeType: "video/webm; codecs=vp9" };
      } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
        options = { mimeType: "video/webm; codecs=vp8" };
      } else {
        // ...
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          const chunks = [];
          const recorder = new MediaRecorder(stream, options);
          recorder.ondataavailable = e => {
            chunks.push(e.data);
            if (recorder.state == "inactive") {
              const blob = new Blob(chunks, { type: "audio/webm" });
              const url = URL.createObjectURL(blob);
              this.audioUrl = url;
            }
          };
          this.recorder = recorder;
        })
        .catch(e => {
          console.log(`navigator.getUserMedia error: ${e}`);
        });
    }
  }
};
</script>

<template lang="pug">
  div.page-speak-index
    div.main-title 我要对党说  
    div.content
      div
        div 选择背景音乐
          Select(v-model="currentIndex"  style="width:200px")
            Option(v-for="item in videos" :value="item.value" :key="item.value" :label="item.label") {{item.label}}
        video.video(:poster="images.poster_play" controls ref="video" :src="currentVideo.url")
      div.button-group
        audio.hidden(controls ref="audio" :src="audioUrl")    
        img.record(@click="record" :src="images.button_record")
        img.play( @click="play" :src="images.button_play")
        //- Button.record(@click="record" shape="circle" icon="mic-a" size="large")
        //- Button.play(:disabled= "!RecordSuccess || isRecord" @click="play" shape="circle" icon="play" size="large")   
      div.upload   
        button.button4(@click="upload") 我要上传
    button.button-back(@click="$router.go(-1)") 返回    
    img.logo(src="static/image/sound.png") 
</template>


<style lang="stylus" scoped>
.page-speak-index
  height 100vh
  background url('~/static/image/sound_bg.png') no-repeat
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
.upload
  display flex
  align-items center
.button4
  border none
  color white
  padding .75vw 4.5vw
  background url('~/static/image/button_blue_4.png') center center no-repeat
  background-size cover
  font-size 3rem
  text-align center
.logo
  position absolute
  width 20vw
  right 10px
  top 10px
.record,.play
  margin 2vw 0
</style>
