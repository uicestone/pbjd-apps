<template lang="pug">
  Row
    Col(span="12")
      p {{motto}}
      video.video(autoplay ref="video" width=100 height=100) 
      canvas(ref="canvas" width=100 height=100)                 
    Col(span="12")
      p 我的座右铭
      Input(v-model="motto" type="textarea")
      div.capture
        p 我要拍照
        Button(@click="snapshot" icon="camera" size="large")
</template>

<script>
export default {
  data() {
    return {
      motto: "",
      photo: "",
      photoUrl: ""
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
      this.photoUrl = canvas.toDataURL("image/png");
    }
  },
  mounted() {
    const { video, snapshot, canvas } = this.$refs;
    navigator.mediaDevices
      .getUserMedia({ video: { width: 100, height: 100 }, audio: false })
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
.video
  visibility hidden
.capture
  display flex
  align-items center
</style>
