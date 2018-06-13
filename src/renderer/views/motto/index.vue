<script>
import * as request from "../../utils/request";
import uuid from "uuid";

export default {
  data() {
    return {
      name: "",
      motto: "",
      photoUrl: "",
      photoFile: ""
    };
  },
  computed: {},
  methods: {
    snapshot() {
      const { video, canvas } = this.$refs;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      this.photoUrl = canvas.toDataURL("image/png");
      canvas.toBlob(blob => {
        const file = new File([blob], `${uuid.v1()}.png`);
        this.photoFile = file;
      });
    },
    async upload() {
      if (!this.photoFile) {
        return;
      }
      const data = await request.UploadMotto({
        text: this.motto,
        image: this.photoFile,
        authorName: this.name
      });
      const { id, qrcodeUrl } = data;
      if (id) {
        this.$router.push({ name: "mottoDetail", query: { id, qrcodeUrl } });
      }
    }
  },
  mounted() {
    const { video, snapshot, canvas } = this.$refs;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        window.localMediaStream = stream;
        video.srcObject = stream;
      })
      .catch(e => {
        console.log(`navigator.getUserMedia error: ${e}`);
      });
  },
  destroyed() {
    window.localMediaStream.getTracks()[0].stop();
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
        div.motto-preview-photo
          video(autoplay :class='{hidden: photoUrl}' ref="video") 
          canvas(ref="canvas" :class='{hidden: !photoUrl}')              
      div.form(span="12")
        div
          p 我的座右铭
          textarea.input-motto(v-model="motto" )
        div
          p 我的名字
          input.input-name(v-model="name")
        div.actions
          div 我要拍照
          Icon.snapshot(type="camera" @click="snapshot")
          div 我要上传
          Icon.snapshot(type="upload" @click="upload" v-bind:class="{disabled:!photoFile}")
          
    button.button-back(@click="$router.go(-1)") 返回
    img.logo(src="~@/assets/image/sound.png")
</template>

<style lang="stylus" scoped>
.page-motto-index
  height 100vh
  background url('~@/assets//image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.content
  height 73vh
  position relative
  display flex
  align-items center
  white-space pre-line
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
  height 80%
  width 35vw
  font-size 1.5vw
  font-weight 600
  color black
.motto-preview-photo
  width: 17.4vw
  transform: rotate(-7.25deg)
  position: absolute
  left: 33vw
  top: 14vw
  height: 12vw
  object-fit: cover
  overflow: hidden
  video,canvas
    position absolute
    top 0
    left 0
    object-fit cover
    width 100%
    height 100%
  video
    z-index 0
  canvas
    z-index 1
  
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
  width 9vw
.motto-content
  width 53vw
  height 64vh
  background url('~@/assets//image/book.png') no-repeat
  background-size contain
  margin 3vw 3vw 0
.input-motto
  width 100%
  height 15vh
  padding 20px
  border 3px #CCC solid
  box-shadow 0 0.22vw 0.44vw #888
.input-name
  width 100%
  height 8vh
  padding 1vw
  border 3px #CCC solid
  box-shadow 0 0.22vw 0.44vw #888
.actions
  display flex
  align-items center
  font-size 2vw
.snapshot
  height 6vw
  width 6.5vw
  line-height 6vw
  font-size 5vw
  text-align center
  margin 0 2vw 0 1vw
  background #956134
  color white
  border-radius 0.5vw
  box-shadow 0.2vw 0.2vw 0.3vw #333
  &.disabled
    opacity 0.5
.logo
  position absolute
  width 20vw
  left 79vw
  top 1vw
</style>
