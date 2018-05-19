<template lang="pug">
  div
    audio(autoplay controls ref="audio")
    button(ref="record" @click="record") 录音
    button(ref="record-play" @click="record-play") 播放    
</template>

<script>
export default {
  name: "audio",
  data() {
    return {
      stream: null,
      mediaRecorder: null,
      audioData: null
    };
  },
  methods: {
    record() {
      const { audio } = this.$refs;
      const recordBlobs = [];
    }
  },
  mounted() {
    const { audio, record } = this.$refs;
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(stream => {
        this.stream = stream;
        audio.srcObject = stream;
      })
      .catch(e => {
        console.log(`navigator.getUserMedia error: ${e}`);
      });
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
