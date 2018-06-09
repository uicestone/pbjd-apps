<script>
import * as request from "../../utils/request";

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
    async upload() {
      const data = await request.UploadMotto({
        text: this.motto,
        image: this.photoUrl,
        name: this.name
      });
      // this.$router.push({ name: "mottoDetail" });
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
    div.content
      div.motto-content(span="12")
        p.motto-preview-text {{motto}}
        p(v-if="name!==''").motto-preview-name --{{name}}      
        video.motto-preview-photo(autoplay :class='{hidden: photoUrl}' ref="video") 
        canvas.motto-preview-photo(ref="canvas" :class='{hidden: !photoUrl}')              
      div.form(span="12")
        div
          p 我的座右铭
          textarea.input-motto(v-model="motto" )
        div
          p 我的名字
          input.input-name(v-model="name")
        div.actions
          div 我要拍照
          img.snapshot(@click="snapshot" src="~@/assets/image/camera.png")
          div 我要上传
          img.snapshot(@click="upload" src="~@/assets/image/camera.png")
          
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
  display flex
  align-items center
.content p
  margin-bottom 10px
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
  width 35vw
  font-size 1.5vw
  font-weight 600
  color black
.motto-preview-photo
  width 16vw
  height 16vh
  transform rotate(-8deg)
  position absolute
  left 30vw
  top 15vw
.motto-preview-text
  width 15vw
  font-size 2vw
  font-family Guoxiang
  position absolute
  left 10vw
  top 22vh
  word-wrap break-word
  color #604C3F
.motto-preview-name
  font-size 1.5vw
  font-family Guoxiang
  position absolute
  left 18vw
  top 20vw
.motto-content
  width 55vw
  height 100%
  background url('~@/assets//image/book.png') no-repeat
  background-size cover
.input-motto
  width 100%
  height 15vh
  padding 20px
.input-name
  width 100%
  height 8vh
  padding 20px
.actions
  display flex
  align-items center
.snapshot
  height 100%
</style>
