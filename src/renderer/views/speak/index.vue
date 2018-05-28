<script>
export default {
  data() {
    return {
      recorder: null,
      status: {
        isRecord: false
      },
      audioUrl: ""
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
      return this.videos.find(i => i.value === this.currentIndex) || {};
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    record() {
      const isRecord = this.status.isRecord;
      this.status.isRecord = !isRecord;
      if (!isRecord) {
        this.audioUrl = null;
        this.recorder.start();
      }
      if (isRecord) {
        this.recorder.stop();
      }
    },
    play() {
      const { audio, video } = this.$refs;
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
            Option(v-for="item in videos" :value="item.value" :key="item.value" :label="item.label")
        video(controls ref="video" :src="currentVideo.url")
      div.button-group
        //- audio(controls ref="audio" :src="audioUrl")    
        Button.record(@click="record" shape="circle" icon="mic-a" size="large")
        Button.play(@click="play" shape="circle" icon="play" size="large")   
      div.upload   
        Button(@click="upload" size="large") 我要上传
</template>


<style lang="stylus" scoped>
.page-speak-index
  height 100vh
  background url('~/static/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.content
  display flex
  align-content center
  justify-content space-around
  padding 1rem 0
.main-title
  color white
  width 10rem
  background rgba(255, 0, 0, 0.5)
  border-bottom 2px solid red
  padding 0.5rem 2rem
  text-align center
  font-size 1rem
.audio
  overflow hidden
.button-group
  display flex
  justify-content center
  flex-direction column
.upload
  display flex
  align-items center
</style>
