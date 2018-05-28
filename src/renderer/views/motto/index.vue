<script>
export default {
  data() {
    return {};
  },
  computed: {
    name: {
      get() {
        return this.$store.state.Motto.name;
      },
      set(val) {
        this.$store.commit("SET_MOTO_STATE", {
          name: val
        });
      }
    },
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

<template lang="pug">
  div.page-motto-index
    div.main-title 我的座右铭  
    Row.content
      Col.motto-content(span="12")
        p.motto-preview-text {{motto}}
        p.motto-preview-name --{{name}}      
        video.motto-preview-photo(autoplay :class='{hidden: photoUrl}' ref="video" width=100 height=100) 
        canvas.motto-preview-photo(ref="canvas" :class='{hidden: !photoUrl}' width=100 height=100)              
      Col.form(span="12")
        div 我的座右铭
        Input(v-model="motto" type="textarea")
        div 我的名字
        Input(v-model="name")
        div.capture
          div 我要拍照
            Button(@click="snapshot" icon="camera" size="large")
          div 我要上传
            Button(@click="upload" icon="camera" size="large")
</template>

<style lang="stylus" scoped>
.page-motto-index
  height 100vh
  background url('~/static/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.content
  height 60vh
  position relative
.hidden
  visibility hidden
.capture
  display flex
  align-items center
.form
  display flex
  flex-direction column
  justify-content space-around
  height 100%
  width 40vw
  flex 0
.motto-preview-photo
  transform rotate(-10deg)
  position absolute
  right 20%
  top 35%
.motto-preview-text
  width 5rem
  font-size 1.5rem
  font-family Guoxiang
  position absolute
  left 20%
  top 30%
.motto-preview-name
  font-size 1rem
  font-family Guoxiang
  position absolute
  left 30%
  bottom 30%
.motto-content
  flex 1
  height 100%
  background url('~/static/image/book.png') no-repeat
  background-size cover
.main-title
  color white
  width 10rem
  background rgba(255, 0, 0, 0.5)
  border-bottom 2px solid red
  padding 0.5rem 2rem
  text-align center
  font-size 1rem
</style>
