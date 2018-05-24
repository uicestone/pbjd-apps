<template lang="pug">
  Row
    Col(span="12")
      p.motto-preview-text {{motto}}
      video.video(autoplay ref="video" width=100 height=100) 
      canvas(ref="canvas" width=100 height=100)              
    Col(span="12")
      p 我的座右铭
      Input(v-model="motto" type="textarea")
      div.capture
        div 我要拍照
          Button(@click="snapshot" icon="camera" size="large")
        div 我要上传
          Button(@click="upload" icon="camera" size="large")
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    motto: {
      get() {
        return this.$store.state.Motto.motto;
      },
      set(val) {
        this.$store.commit("SET_MOTO_STATE", {
          motto: val
        });
      }
    },
    photoUrl: {
      get() {
        return this.$store.state.Motto.photoUrl;
      },
      set(val) {
        this.$store.commit("SET_MOTO_STATE", {
          photoUrl: val
        });
      }
    }
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
    },
    upload() {
      this.$router.push({ name: "mottoDetail" });
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
.motto-preview-text
  font-size 1.5rem
  font-family Guoxiang
</style>
