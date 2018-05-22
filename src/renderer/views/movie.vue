<template lang="pug">
  div.voice-page
    div
      div 选择片段
        Select(v-model="videoSelect"  style="width:200px")
          Option(v-for="item in videoOptions" :value="item.value" :key="item.value" :label="item.label")
      video(controls ref="video" :src="currentOption.url" width=480 heigh=320)
    div.button-group
      audio(controls ref="audio" :src="audioUrl")    
      Button.record(@click="record" shape="circle" icon="mic-a" size="large")
      Button.play(@click="play" shape="circle" icon="play" size="large")   
    div.upload   
      Button(@click="upload" size="large") 我要上传
</template>


<script>
export default {
  data() {
    return {
      videoOptions: [
        {
          value: "1",
          label: "小兵张嘎",
          url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        }
      ],
      videoSelect: "",
      recorder: null,
      status: {
        isRecord: false
      },
      audioUrl: ""
    };
  },
  computed: {
    currentOption() {
      return this.videoOptions.find(i => i.value === this.videoSelect) || {};
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
    upload() {},
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


<style lang="stylus" scoped>
.audio
  overflow hidden
.voice-page
  display flex
  align-content center
.button-group
  display flex
  justify-content center
  flex-direction column
.upload
  display flex
  align-items center
</style>
