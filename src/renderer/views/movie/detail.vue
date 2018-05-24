<template lang="pug">
  div.movie-detail
    div
      video(controls ref="video" :src="currentOption.url" width=480 heigh=320)    
      audio(controls ref="audio" :src="audioUrl") 
    div.qrcode-group
      img.qrcode-image(src="http://via.placeholder.com/100x50")
      p.qrcode-text 收藏到<br/>我的微官网
      
</template>


<script>
export default {
  data() {
    return {
      currentOption: {
        url: null
      }
    };
  }
};
</script>


<style lang="stylus" scoped>
.movie-detail
  display flex
.qrcode-group
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
</style>
