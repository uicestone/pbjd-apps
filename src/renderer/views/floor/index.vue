<template lang="pug">
  div.page-floor-index
    .poster
      img(:src="poster")
      img(src="~@/assets//image/floor-logo.png").floor-logo
    .container
      .left.scroll-bar-hidden(v-html="floorContent")
      .right
        .floor-guide(@click="goGuide") 楼层指引
        img(src="~@/assets//image/back-dark.png" @click="goBack")
</template>
<script>
import * as request from "../../utils/request";
export default {
  data() {
    return {
       floorContent: '',
       poster: ''
    }
  },
  mounted() {
    this.getPostsBuilding();
  },
  methods:{
    goBack() {
      this.$router.push('/map/index');
    },
    goGuide() {
      this.$router.push('guide');
    },
    getPostsBuilding() {
      request.postsBuilding().then(res => {
        this.poster = res.posterUrl;
        this.floorContent = res.content;
      })
    }
  }
}
</script>
<style lang="stylus">
.page-floor-index
  display flex
  flex-direction column
  align-items center
  justify-content flex-start !important
  position absolute
  height 100vh
  width 100vw
  overflow hidden
  .floor-logo
    position absolute
    left 5vw
    top 56vh
    border 1vw white solid
  .container
    width 72vw
    height 33vh
    position absolute
    right 0
    bottom 0
    display flex
    .left
      flex 2
      overflow-y auto
      padding-top 3vh
      font-size 2.25vw
      font-weight bold
      color #000
      line-height 8vh
    .right
      flex 1
      position relative
      .floor-guide
        position absolute
        width 17vw
        height 13vh
        background-color rgb(195,13,35)
        border-radius 0.6vw
        box-shadow 0 0.75vw 0.75vw rgb(218,108,122)
        top 4vh
        display flex
        justify-content center
        align-items center
        color #fff
        font-size 3.5vw
        // font-weight bold
        cursor pointer
        left 50%
        transform translateX(-50%)
      
      img
        position absolute
        bottom 3vh
        left 50%
        transform translateX(-50%)
        width 9vw
        cursor pointer
</style>
