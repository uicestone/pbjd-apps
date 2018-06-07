<template lang="pug">
  div.page-movie-detail
    div.main-title 我要对党说
    div.content
      div.video-container
        video.video(:poster="poster"  :src="currentVideo.url" ref="video" width=480 heigh=320)   
        img.button-play(v-if="!playing" @click="play" src="~@/assets/image/button_replay.png")                 
        audio.hidden(ref="audio" :src="audioUrl") 
      div.qrcode-group
        img.qrcode-image( src="http://via.placeholder.com/400x500")
        p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
    img.logo(src="~@/assets/image/sound.png") 
    
</template>


<script>
export default {
  data() {
    return {
      playing: false,
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
  methods: {
    play() {
      const { video, audio } = this.$refs;
      this.playing = true;
      video.play();
      audio.play();
    }
  },
  computed: {
    poster() {
      return this.playing
        ? "static/images/music_bg_play.png"
        : "static/images/music_bg.png";
    },
    currentVideo() {
      return this.videos[this.currentIndex] || {};
    }
  }
};
</script>


<style lang="stylus" scoped>
.page-movie-detail {
  height: 100vh;
  background: url('~@/assets//image/sound_bg.png') no-repeat;
  background-size: cover;
  padding: 1rem 0;
}

.content {
  display: flex;
  align-content: center;
  justify-content: space-around;
  margin: 2vw 0;
}

.video-container {
  position: relative;
}

.hidden {
  display: none;
}

.button-play {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -102px 0 0 -102px;
}

.video {
  width: 60vw;
}

.qrcode-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.qrcode-text {
  font-size: 1.8vw;
  font-weight: 600;
  color: black;
}

.logo {
  position: absolute;
  width: 20vw;
  right: 10px;
  top: 10px;
}
</style>
