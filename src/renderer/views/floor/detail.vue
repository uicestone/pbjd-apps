<template lang="pug">
  div.page-map-floorDetail
    .floorNum(:class='bgClass') {{ floorTitle }}
    .floorTitle(:class='colorClass') {{ floorData.title }}
    .content
      .left.scroll-bar-hidden
        img(:src="floorImage")
      .right(v-html="floorContent")
    img.back(src="~@/assets//image/back-dark.png" @click='goBack')
</template>
<script>
export default {
  data() {
    return {
      floorData: "",
      floorTitle: "",
      bgClass: "",
      colorClass: ""
    };
  },
  mounted() {
    const { query } = this.$route;
    const { item } = query;
    this.floorData = item;
    const val = item.floor;
    if (val == 1) {
      this.floorTitle = "一楼";
    }
    if (val == 2) {
      this.floorTitle = "二楼";
    }
    if (val == 3) {
      this.floorTitle = "三楼";
    }
    if (val == 4) {
      this.floorTitle = "四楼";
    }

    this.colorClass = "color" + val;
    this.bgClass = "bgColor" + val;
  },
  methods: {
    goBack() {
      this.$router.push("guide");
    }
  },
  computed: {
    floorImage() {
      if (!this.floorData || !this.floorData.content) {
        return false;
      }
      const contentImageMatch = this.floorData.content.match(/\<img.*? src="(.*?)"/);
      if (contentImageMatch) {
        return contentImageMatch[1];
      }
      else {
        console.log(this.floorData.thumbnail);
        return this.floorData.thumbnail;
      }
    },
    floorContent() {
      if (!this.floorData || !this.floorData.content) {
        return false;
      }
      return this.floorData.content.replace(/(<p>)?<img.*?\/>(<\/p>)?/g, '');
    }
  }
};
</script>
<style lang="stylus">
.page-map-floorDetail
  position absolute
  height 100vh
  width 100vw
  overflow hidden
  background url('~@/assets//image/bg-floor-detail.png') center center no-repeat
  background-size cover
  position relative

  .back
    position absolute
    left 50%
    transform translateX(-50%)
    bottom 5vh
    cursor pointer

  .floorNum
    position absolute
    width 12vw
    height 8vh
    border-radius 0 5vh 5vh 0
    font-size 3vw
    font-family Dasong
    font-weight bold
    color #fff
    display flex
    align-items center
    justify-content center
    top 5vh
    left 0
    letter-spacing 0.3vw

  .floorTitle
    position absolute
    left 50%
    transform translateX(-50%)
    top 10vh
    font-size 4.5vw
    font-weight bold

  .content
    width 100%
    height 60vh
    display flex
    justify-content space-between
    margin-top 5vh
    padding 0 5vw
    position absolute
    bottom 15vh

    div
      width 48%
      height 100%
      overflow-x hidden
      overflow-y auto
      color #000
      font-size 2.25vw
      letter-spacing 1px
      white-space pre-line
      letter-spacing 0.15vw
      align-items flex-start
      display flex
        
    .left
      // background-color #fff
      
      img,figure
        width 100% !important
        height auto
        border 0.5vw solid #ccc
      figure>img
        border none
    
  .color1
    color rgb(229, 0, 18)
    border-color transparent transparent transparent rgb(229, 0, 18)

  .bgColor1
    background-color rgb(229, 0, 18)

  .bgColor2
    background-color rgb(3, 110, 183)

  .bgColor3
    background-color rgb(164, 11, 94)

  .bgColor4
    background-color rgb(0, 145, 58)

  .color2
    color rgb(3, 110, 183)
    border-color transparent transparent transparent rgb(3, 110, 183)

  .color3
    color rgb(164, 11, 94)
    border-color transparent transparent transparent rgb(164, 11, 94)

  .color4
    color rgb(0, 145, 58)
    border-color transparent transparent transparent rgb(0, 145, 58)
</style>
