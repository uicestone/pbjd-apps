<template lang="pug">
  div.page-map-index
    video.video(:class="{show: isPlaying, hidden: !isPlaying}" ref="video" src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" @ended="videoEnded")
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
      video.play();
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
      console.log('Video ended')
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
  z-index 2
  height 100%
  width 100%
  object-fit cover
.show
  visibility visible
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
