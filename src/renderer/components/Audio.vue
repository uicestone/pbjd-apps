<template lang="pug">
  div
    audio(v-if="url.currentBlobUrl" controls ref="audio" :src="url.currentBlobUrl")
    button(ref="record" @click="record") {{ status.isRecord ? "停止" : "录音" }}
</template>

<script>
export default {
  name: "audio",
  data() {
    return {
      status: {
        isRecord: false
      },
      recorderOptions: {},
      url: {
        currentBlobUrl: null
      }
    };
  },
  methods: {
    record() {
      const isRecord = this.status.isRecord;
      this.status.isRecord = !isRecord;
      if (!isRecord) {
        this.recorder.start();
      }

      if (isRecord) {
        this.recorder.stop();
      }
    },
    init() {
      if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        this.recorderOptions = { mimeType: "video/webm; codecs=vp9" };
      } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
        this.recorderOptions = { mimeType: "video/webm; codecs=vp8" };
      } else {
        // ...
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          this.stream = stream;
          const chunks = [];
          const recorder = new MediaRecorder(stream, this.options);
          recorder.ondataavailable = e => {
            console.log(chunks);
            chunks.push(e.data);
            if (recorder.state == "inactive") {
              const blob = new Blob(chunks, { type: "audio/webm" });
              const url = URL.createObjectURL(blob);
              this.url.currentBlobUrl = url;
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
