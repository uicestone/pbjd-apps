<template lang="pug">
  div.page-map-index
    video.video(:class="{hidden: !isPlaying}" ref="video" src="static/map/intro.mp4" @ended="videoEnded")
    Icon.video-close(type="ios-close-empty" v-if="isPlaying" @click="closeVideo")
    div.buttonGroup
      img(@click="playVideo" src="~@/assets//image/map_index_button1.png")
      img(@click="goDetail" src="~@/assets//image/map_index_button2.png")
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false
    };
  },
  watch: {
    isPlaying(val) {
      const { video } = this.$refs;
      if (val) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  },
  methods: {
    goDetail() {
      this.$router.push({ name: "mapDetail" });
    },
    playVideo() {
      console.log('Play video.')
      this.isPlaying = true;
    },
    videoEnded() {
      console.log('Video ended.')
      const { video } = this.$refs;
      this.isPlaying = false;
    },
    closeVideo() {
      console.log('Stop video.')
      const { video } = this.$refs;
      this.isPlaying = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.page-map-index
  display flex
  flex-direction column
  align-items center
  justify-content flex-start !important
  height 100vh
  background url('~@/assets//image/map_index_bg.png') center center no-repeat
  background-size cover
.video
  z-index 20
  height 100%
  width 100%
  object-fit cover
.video-close
  font-size 5vw
  color white
  position absolute
  left 96.5vw
  top 0
  z-index 21
  text-shadow .1vw .1vw .3vw black
.hidden
  visibility hidden
.buttonGroup
  position absolute
  left 40%
  bottom 10%
  display flex
  width 30vw
  justify-content space-between
  img
    cursor pointer
    width 40%
    height 40%
</style>
