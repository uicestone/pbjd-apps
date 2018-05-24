<template lang="pug">
  div.movie-detail
    div
      p.motto-preview-text {{motto}}    
      img(:src="photoUrl")
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
  },
  computed: {
    motto: {
      get() {
        return this.$store.state.Motto.motto;
      }
    },
    photoUrl: {
      get() {
        return this.$store.state.Motto.photoUrl;
      }
    }
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
.motto-preview-text
  font-size 1.5rem
  font-family Guoxiang
</style>
