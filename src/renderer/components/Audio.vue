<template lang="pug">
  div
    audio(v-if="url.currentBlob" controls :src="url.currentBlob")
    button( @click="record") {{ status.isRecord ? "停止" : "录音" }}
    button(v-if="url.currentBlob" @click="upload") 上传
</template>

<script>
export default {
  name: "EAudio",
  data() {
    return {
      status: {
        isRecord: false
      },
      url: {
        currentBlob: null
      }
    };
  },
  methods: {
    record() {
      const isRecord = this.status.isRecord;
      this.status.isRecord = !isRecord;
      if (!isRecord) {
        this.url.currentBlob = null;
        this.recorder.start();
      }
      if (isRecord) {
        this.recorder.stop();
      }
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
              this.url.currentBlob = url;
            }
          };
          this.recorder = recorder;
        })
        .catch(e => {
          console.log(`navigator.getUserMedia error: ${e}`);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="stylus" scoped>
*
  box-sizing border-box
  margin 0
  padding 0
body
  font-family 'Source Sans Pro', sans-serif
</style>
