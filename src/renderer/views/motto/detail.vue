<template lang="pug">
  div.page-movie-detail
    div.main-title 我的座右铭
    div.content
      div.motto-content(span="12")
        p.motto-preview-text {{text}}
        p.motto-preview-name --{{authorName}}      
        img.motto-preview-photo(:src="imageUrl")           
      div.form(span="12")
        div.qrcode-group(v-if="qrcodeUrl")
          img.qrcode-image(src="qrcodeUrl")
          p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
    
</template>


<script>
import * as request from "../../utils/request";

export default {
  data() {
    return {
      authorName: "",
      text: "",
      imageUrl: "",
      qrcodeUrl: ""
    };
  },
  computed: {},
  async mounted() {
    const { query } = this.$route;
    const { id } = query;
    let data = await request.getMotto({ id });
    console.log(data);
    const { imageUrl, authorName, text } = data;

    this.imageUrl = imageUrl;
    this.text = text;
    this.authorName = authorName;
  }
};
</script>


<style lang="stylus" scoped>
.page-movie-detail
  height 100vh
  background url('~@/assets//image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.qrcode-group
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
.motto-preview-photo
  width 16vw
  height 16vh
  transform rotate(-8deg)
  position absolute
  left 30vw
  top 15vw
.qrcode-text
  font-weight 600
  font-size 1.8vw
  color black
.motto-preview-text
  width 15vw
  font-size 2vw
  font-family Guoxiang
  position absolute
  left 10vw
  top 22vh
  word-wrap break-word
  color #604C3F
.motto-preview-name
  font-size 1.5vw
  font-family Guoxiang
  position absolute
  left 18vw
  top 20vw
.content
  height 70vh
  display flex
  align-items center
  justify-content space-around
.video
  visibility hidden
.capture
  display flex
  align-items center
.form
  display flex
  flex-direction column
  justify-content space-around
  height 100%
  width 40vw
  flex 0
.motto-content
  transform scale(1.2)
  position relative
  width 55vw
  height 100%
  background url('~@/assets//image/book.png') no-repeat
  background-size cover
</style>
