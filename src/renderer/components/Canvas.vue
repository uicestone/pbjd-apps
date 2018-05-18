<template lang="pug">
  div
    video(autoplay ref="video")
    button(ref="snapshot" @click="snapshot") 截屏
    canvas(ref="canvas" width=480 height=360)
</template>

<script>
export default {
  name: "Canvas",
  data() {
    return {
      canvasData: null
    };
  },
  methods: {
    snapshot() {
      const { video, canvas } = this.$refs;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      this.canvasData = canvas.toDataURL("image/png");
    }
  },
  mounted() {
    const { video, snapshot, canvas } = this.$refs;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        video.srcObject = stream;
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
