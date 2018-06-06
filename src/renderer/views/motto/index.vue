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
      // canvas.width = video.videoWidth;
      // canvas.height = video.videoHeight;
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
      .getUserMedia({ video: { width: 150, height: 100 }, audio: false })
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
        video.motto-preview-photo(autoplay :class='{hidden: photoUrl}' ref="video") 
        canvas.motto-preview-photo(ref="canvas" :class='{hidden: !photoUrl}')              
      Col.form(span="12")
        div 我的座右铭
        Input.input-motto(v-model="motto" type="textarea")
        div 我的名字
        Input.input-name(v-model="name")
        div.capture
          div 我要拍照
            Button(@click="snapshot" icon="camera" size="large")
          div 我要上传
            Button(@click="upload" icon="camera" size="large")
    button.button-back(@click="$router.go(-1)") 返回
    
</template>

<style lang="stylus" scoped>
.page-motto-index
  height 100vh
  background url('~@/assets//image/sound_bg.png') no-repeat
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
  width 16vw
  height 16vh
  transform rotate(-8deg)
  position absolute
  left 28vw
  top 13vw
.motto-preview-text
  width 15vw
  font-size 2vw
  font-family Guoxiang
  position absolute
  left 10vw
  top 15vh
  word-wrap break-word
.motto-preview-name
  font-size 1.5vw
  font-family Guoxiang
  position absolute
  left 15vw
  top 20vw
.motto-content
  flex 1
  height 100%
  background url('~@/assets//image/book.png') no-repeat
  background-size cover
.input-motto
  /deep/ textarea
    height 30vh
</style>
