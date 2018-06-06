<template lang="pug">
  div.page-movie-detail
    div.main-title 我要对党说
    div.content
      div
        video.video(poster="~@/assets/image/music_bg_play.png" controls ref="video" :src="currentVideo.url" width=480 heigh=320)    
        //- audio(controls ref="audio" :src="audioUrl") 
      div.qrcode-group
        img.qrcode-image(src="http://via.placeholder.com/100x50")
        p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
    img.logo(src="~@/assets/image/sound.png") 
    
</template>


<script>
export default {
  data() {
    return {
      videos: {
        "1": {
          value: "1",
          label: "我爱你中国",
          url: "static/media/test.mp3"
        }
      },
      currentIndex: "1"
    };
  },
  computed: {
    currentIndex: {
      get() {
        return this.$store.state.Speak.currentIndex;
      },
      set(currentIndex) {
        this.$store.commit("SET_SPEAK_STATE", {
          currentIndex
        });
      }
    },
    currentVideo() {
      return this.videos[this.currentIndex] || {};
    }
  }
};
</script>


<style lang="stylus" scoped>
.page-movie-detail
  height 100vh
  background url('~@/assets//image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.content
  display flex
  align-content center
  justify-content space-around
  padding 1rem 0
.video
  width 50vw
.qrcode-group
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
.qrcode-text
  font-size 2vw
  font-weight 600
  color black
.logo
  position absolute
  width 20vw
  right 10px
  top 10px
</style>
