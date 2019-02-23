<template lang="pug">
  div.page-map-index
    img.bg-element.opening(v-if="showingOpening=='image'" src="static/map/opening.jpg" @click="showOpening" @keyup.enter="test")
    video.video(:class="{hidden: !isPlaying}" ref="video" src="static/map/opening.mp4" @ended="videoEnded" @click="closeVideo")
    //- Icon.video-close(type="ios-close-empty" v-if="isPlaying" @click="closeVideo")
    div.slides(v-if="currentSlide")
      .menu-links(v-if="currentSlide=='0'")
        a.section-1(@click="goToSlide(slideSections[0])")
        a.section-2(@click="goToSlide(slideSections[1])")
        a.section-3(@click="goToSlide(slideSections[2])")
        a.section-4(@click="goToSlide(slideSections[3])")
      .back(:class="{'section-cover':slideSections.indexOf(currentSlide)>-1||currentSlide=='0'}" @click="backSlide")
      img.bg-element(:src="'static/images/slides/'+currentSlide+'.jpg'" @click="nextSlide")
      //- Icon.slide-close(type="ios-close-empty" v-if="currentSlide" @click="closeSlides")
    div.buttonGroup
      img.glow(@click="showSlides" :src="homeButtons[0]")
      img.glow.delay-1(@click="goDetail" :src="homeButtons[2]")
      img.glow.delay-2(@click="goGroup" :src="homeButtons[1]")
      img.glow.delay-3(@click="goFloor" :src="homeButtons[3]")
    div.title-circle.fill(@click="showOpening")
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
      slideSections: ['1', '7', '16', '31'],
      lastSlide: '32',
      currentSlide: null,
      showingOpening: null,
      homeButtons:[]
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
    goGroup() {
      this.$router.push({ name: "mapGroup" });
    },
    goFloor() {
      this.$router.push({ name:'floorIndex'});
    },
    showOpening() {
      if (!this.showingOpening) {
        this.showingOpening = 'image';
      } else {
        this.showingOpening = null;
        this.playVideo();
      }
    },
    playVideo() {
      console.log('Play video.')
      this.isPlaying = true;
      this.showingOpening = 'video'; // use video as opening
    },
    videoEnded() {
      console.log('Video ended.');
      const { video } = this.$refs;
      // this.isPlaying = false;
    },
    closeVideo() {
      console.log('Stop video.')
      const { video } = this.$refs;
      this.isPlaying = false;
      this.showingOpening = null; // use video as opening
    },
    showSlides() {
      this.currentSlide = '0';
    },
    nextSlide() {
      if (this.currentSlide === this.lastSlide) {
        this.closeSlides();
      } else {
        this.currentSlide = (Number(this.currentSlide) + 1).toString();
      }
    },
    backSlide() {
      if (this.currentSlide === '0') {
        this.closeSlides();
      } else {
        this.currentSlide = '0';
      }
    },
    goToSlide(name) {
      this.currentSlide = name;
    },
    closeSlides() {
      this.currentSlide = null;
    },
    getSpotConfig() {
      request.spotsConfig().then(res => {
        this.homeButtons = res.homeButtons;
      });
    }
  },
  async mounted() {
    this.slides = await request.getMapSlides();
    window.keyboardListener = (event) => {
      if (event.key !== 'b') {
        return;
      }
      if (this.showingOpening === 'image') {
        this.playVideo();
      } else {
        this.closeVideo();
      }
    };
    window.addEventListener('keyup', window.keyboardListener);
    this.getSpotConfig()
  },
  destroyed() {
    window.removeEventListener('keyup', window.keyboardListener);
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
.opening
  z-index 11
.slides
  img
    z-index 15
.hidden
  visibility hidden
.buttonGroup
  position absolute
  left 12vw
  bottom 5vw
  display flex
  width 48vw
  justify-content space-between
  z-index 10
  img
    cursor pointer
    height 10vw
    width 9vw
    object-position 0 0
    object-fit cover
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
  z-index 1
  &.no-2
    left 28.5vw
  &.no-3
    left 39.8vw
  &.no-4
    left 50.8vw
.slides
  .menu-links
    a
      position absolute
      z-index 20
      &.section-1
        left 15vw
        top 10vh
        width 30vw
        height 15vh
      &.section-2
        left 61vw
        top 20vh
        width 26vw
        height 16vh
      &.section-3
        left 6.25vw
        top 53vh
        width 30vw
        height 13.42vh
      &.section-4
        left 54.7vw
        top 67vh
        width 36.7vw
        height 13.9vh
  .back
    position absolute
    z-index 20
    left 88.5vw
    top 6.7vh
    width 7.66vw
    height 7.03vh
    &.section-cover
      left 46vw
      top 88vh
      width 7.76vw
      height 6.94vh
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
