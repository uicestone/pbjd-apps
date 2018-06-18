<template lang="pug">
  div.page-movie-detail
    div.main-title 我的座右铭
    div.content
      div.motto-content(span="12")
        p.motto-preview-text {{text}}
        p.motto-preview-name --{{authorName}}      
        img.motto-preview-photo(:src="imageUrl")           
      div.qrcode-group
        div
          canvas.qrcode-canvas(ref="qrcode")
          p.share-hint 扫描二维码，分享到微信
    button.button-back(@click="$router.go(-1)") 返回
    img.logo(src="~@/assets/image/sound.png")
</template>


<script>
import * as request from "../../utils/request";
import QRCode from 'qrcode';

export default {
  data() {
    return {
      motto: {},
      authorName: "",
      text: "",
      imageUrl: "",
      qrcodeUrl: "",
      sharable: !!window.process, // hide share form in web
    };
  },
  computed: {},
  methods: {
    generateQRCode() {
      const { qrcode } = this.$refs;
      QRCode.toCanvas(qrcode, `https://pbjd-apps.hbird.com.cn/#/motto/detail?id=${this.motto.id}`);
    }
  },
  async mounted() {
    const { query } = this.$route;
    const { id } = query;
    this.motto = await request.getMotto({ id });
    const { imageUrl, authorName, text } = this.motto;

    this.imageUrl = imageUrl;
    this.text = text;
    this.authorName = authorName;

    this.generateQRCode();

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
  width 19.7vw
  transform rotate(-7.25deg)
  position absolute
  left 34vw
  top 11vw
  object-fit cover
  height 14vw
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
  width 9vw
.content
  padding 5vh 3vw
  height 73vh
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
  position relative
  margin-top 5vh
  height 68vh
  width 60vw
  background url('~@/assets//image/book.png') no-repeat
  background-size cover
.logo
  position absolute
  width 20vw
  left 79vw
  top 1vw
.form
  display flex
  flex-direction column
  justify-content center
  height 80%
  width 26vw
  font-size 1.5vw
  font-weight 600
  color black
  p
    font-size 2vw
    color #888
    text-align left
  .input
    width 100%
    height 8vh
    padding 1vw
    border 3px #CCC solid
    box-shadow 0 0.22vw 0.44vw #888
    margin-bottom 5vh
  .button4
    border none
    color white
    background url('~@/assets//image/button_blue_4.png') center center no-repeat
    background-size cover
    font-size 3rem
    text-align center
    font-size 3.1vw
    text-align center
    width 21.19vw
    height 5.87vw
    font-weight bold
    margin 0 auto
    &.disabled
      opacity 0.5
      color #ccc
.qrcode-canvas
  width 26vw !important
  height 26vw !important
  background black
.share-hint
  margin-top 2vh
  font-size 2vw
  color #888
</style>
