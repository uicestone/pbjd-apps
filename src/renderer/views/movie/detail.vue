<template lang="pug">
  div.page-movie-detail
    div.main-title 红色电影配音
    div.content
      div
        video(controls ref="video" :src="currentVideo.url" width=480 heigh=320)    
        audio(controls ref="audio" :src="audioUrl") 
      div.qrcode-group
        img.qrcode-image(src="http://via.placeholder.com/100x50")
        p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
      
</template>


<script>
export default {
  data() {
    return {};
  },
  computed: {
    videos: {
      get() {
        return this.$store.state.Movie.videos;
      }
    },
    audioUrl: {
      get() {
        return this.$store.state.Movie.audioUrl;
      },
      set(audioUrl) {
        this.$store.commit("SET_MOVIE_STATE", {
          audioUrl
        });
      }
    },
    currentIndex: {
      get() {
        return this.$store.state.Movie.currentIndex;
      },
      set(currentIndex) {
        this.$store.commit("SET_MOVIE_STATE", {
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
  background url('~@/assets/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.content
  display flex
  align-content center
  justify-content space-around
  padding 1rem 0
.qrcode-group
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
</style>
