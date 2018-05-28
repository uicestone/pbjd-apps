<template lang="pug">
  div.page-movie-detail
    div.main-title 我要对党说
    div.content
      div
        video(controls ref="video" :src="currentVideo.url" width=480 heigh=320)    
        //- audio(controls ref="audio" :src="audioUrl") 
      div.qrcode-group
        img.qrcode-image(src="http://via.placeholder.com/100x50")
        p.qrcode-text 收藏到<br/>我的微官网
      
</template>


<script>
export default {
  data() {
    return {};
  },
  computed: {
    videos: {
      get() {
        return this.$store.state.Speak.videos;
      },
      set(currentIndex) {
        this.$store.commit("SET_MOVIE_STATE", {
          currentIndex
        });
      }
    },
    currentIndex: {
      get() {
        return this.$store.state.Speak.currentIndex;
      },
      set(currentIndex) {
        this.$store.commit("SET_MOVIE_STATE", {
          currentIndex
        });
      }
    },
    currentVideo() {
      return this.videos.find(i => i.value === this.currentIndex) || {};
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
.main-title
  color white
  width 10rem
  background rgba(255, 0, 0, 0.5)
  border-bottom 2px solid red
  padding 0.5rem 2rem
  text-align center
  font-size 1rem
.qrcode-group
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
</style>
