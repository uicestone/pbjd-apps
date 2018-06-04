<template lang="pug">
  div.page-movie-detail
    div.main-title 我要对党说
    div.content
      div
        video.video(:poster="images.poster_play" controls ref="video" :src="currentVideo.url" width=480 heigh=320)    
        //- audio(controls ref="audio" :src="audioUrl") 
      div.qrcode-group
        img.qrcode-image(src="http://via.placeholder.com/100x50")
        p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
    img.logo(src="static/image/sound.png") 
    
</template>


<script>
export default {
  data() {
    return {
      images: {
        poster_play: "static/image/music_bg_play.png",
        poster: "static/image/music_bg.png",        
      }
    };
  },
  computed: {
    videos: {
      get() {
        return this.$store.state.Speak.videos;
      },
      set(currentIndex) {
        this.$store.commit("SET_SPEAK_STATE", {
          currentIndex
        });
      }
    },
    audioUrl: {
      get() {
        return this.$store.state.Speak.audioUrl;
      },
      set(audioUrl) {
        this.$store.commit("SET_SPEAK_STATE", {
          audioUrl
        });
      }
    },
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
  background url('~/static/image/sound_bg.png') no-repeat
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
