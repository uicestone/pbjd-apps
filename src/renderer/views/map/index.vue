<template lang="pug">
  div.page-map-index
    //- video.video(:class="{hidden: !isPlaying}" ref="video" src="static/map/intro.mp4" @ended="videoEnded")
    Icon.video-close(type="ios-close-empty" v-if="isPlaying" @click="closeVideo")
    div.slides(v-if="showingSlides")
      img.bg-element(:src="slides[currentSlideIndex].url" @click="nextSlide")
    Icon.slide-close(type="ios-close-empty" v-if="showingSlides" @click="closeSlides")
    div.buttonGroup
      img.glow(@click="showSlides" src="~@/assets//image/map_index_button1.png")
      img.glow.delay-1(@click="goDetail" src="~@/assets//image/map_index_button2.png")
    div.title-circle.fill
    div.title-circle.no-2.fill.delay-1
    div.title-circle.no-3.fill.delay-2
    div.title-circle.no-4.fill.delay-3
    img.bg-element(src="~@/assets//image/stripe_0.png")
    img.bg-element.swipe.delay-1(src="~@/assets//image/stripe_1.png")
    img.bg-element.swipe-reverse.delay-2(src="~@/assets//image/stripe_2.png")
    img.bg-element(src="~@/assets//image/stripe_3.png")
    img.lotus(src="~@/assets//image/lotus_animated.svg")
</template>

<script>
import * as request from "../../utils/request";

export default {
  data() {
    return {
      isPlaying: false,
      slides: [],
      currentSlideIndex: 0,
      showingSlides: false
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
    },
    showSlides() {
      this.showingSlides = true;
    },
    nextSlide() {
      if (this.currentSlideIndex >= this.slides.length - 1) {
        this.closeSlides();
      } else {
        this.currentSlideIndex++;
      }
    },
    closeSlides() {
      this.showingSlides = false;
      this.currentSlideIndex = 0;
    }
  },
  async mounted() {
    this.slides = await request.getMapSlides();
  }
};
</script>

<style lang="stylus" scoped>
.page-map-index
  display flex
  flex-direction column
  align-items center
  justify-content flex-start !important
  position absolute
  height 100vh
  width 100vw
  overflow hidden
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
.slides
  img
    z-index 15
.hidden
  visibility hidden
.buttonGroup
  position absolute
  left 40%
  bottom 10%
  display flex
  width 30vw
  justify-content space-between
  z-index 10
  img
    cursor pointer
    width 40%
    height 40%
img.lotus
  right -6vw
  position absolute
  bottom -3.5vw
  width 37vw
.bg-element
  left 0
  top 0
  position absolute
  width 100vw
  height 100vh
.title-circle
  width 10vw
  height 10vw
  border solid white 0.25vw
  border-radius 5vw
  left 17.2vw
  position absolute
  top 16.5vw
  &.no-2
    left 28.5vw
  &.no-3
    left 39.8vw
  &.no-4
    left 50.8vw
@keyframes swipe
  0%
    top 0
    left 0
  50%
    top 2vh
    left 2vw
  100%
    top 0
    left 0
@keyframes swipe-reverse
  0%
    top 0
    left 0
  50%
    top -2vh
    left -2vw
  100%
    top 0
    left 0
@keyframes fill
  0%
    background rgba(255,255,255,0.5)
  50%
    background rgba(255,255,255,0)
  100%
    background rgba(255,255,255,0.5)
@keyframes glow
  0%
    opacity 1
  50%
    opacity 0.5
  100%
    opacity 1
.swipe
  animation swipe 15s linear infinite
.swipe-reverse
  animation swipe-reverse 10s linear infinite
.fill
  animation fill 3s ease-in-out infinite
.glow
  animation glow 3s ease-in-out infinite
.delay-1
  animation-delay 1s
.delay-2
  animation-delay 2s
.delay-3
  animation-delay 3s
</style>
