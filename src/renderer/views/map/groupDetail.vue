<template lang="pug">
  div.page-map-groupDetail
    img.titleImg(:src="groupDetailData.posterUrl")
    .detailtitle 
      //- img(src="~@/assets//image/bg-department-title.png")
      span {{ groupDetailData.title }}
    .line
    .content
      .left.scroll-bar-hidden(v-html="groupDetail.content")
      .right(v-html="groupDetail.excerpt")
    img.back(src="~@/assets//image/back-dark.png" @click='goBack')
</template>
<script>
import * as request from "../../utils/request";
export default {
  data() {
    return {
      groupDetailData:'',
      groupDetail:''
    }
  },
  mounted() {
    const { query } = this.$route;
    const { item } = query;
    this.groupDetailData = item;
    this.postsDetail();
  },
  methods: {
    goBack() {
      const groupList = window.localStorage.getItem('fromGroupList');
      if(groupList == 1) {
        this.$router.push({ name: "mapGroupList", query: { item:JSON.parse(window.localStorage.getItem('groupListData')) } })
      }
      else {
        this.$router.back(-1);
      }

    },
    postsDetail() {
      const id = this.groupDetailData.id;
      request.postsDetail({id}).then(res => {
        this.groupDetail = res;
      })
    }
  }
}
</script>
<style lang="stylus">
.page-map-groupDetail
  position absolute
  height 100vh
  width 100vw
  overflow hidden
  background url('~@/assets//image/bg-department-detail.png') center center no-repeat
  background-size cover
  padding 5vh 5vw
  // position relative

  .detailtitle
    height 6.5vw
    display flex
    align-items center
    color #fff
    font-size 1.875vw
    position relative
    margin-top 2.25vw
    img
      position absolute
      height 100%
      width 100%
      left 0
    span
      font-family Dasong
      font-size 3.7vw
      z-index 99
      color #fff
      height 100%
      padding-left 3vw
      padding-right 2vw
      background-color #51a5db
      align-items center
      border-radius 1.5vw 1.5vw 0 1.5vw
      min-width 27vw
      line-height 7vw
  .back
    position absolute
    left 50%
    transform translateX(-50%)
    bottom 5vh
    cursor pointer

  .line
    width 77.5vw
    height 0.45vw
    margin-top 0.75vw
    background-color rgb(44,166,224)

  .titleImg
    position absolute
    right 5vw
    top 4.8vh
    width 10vw
    height 10vw
    object-fit contain
    object-position bottom

  .content
    width 90vw
    height 53vh
    display flex
    justify-content space-between
    margin-top 5vh
    div
      width 48%
      height 100%
      overflow-x hidden
      overflow-y auto
      color rgb(89,87,87)
      font-size 1.95vw
      letter-spacing 1px
      white-space pre-line
    
    .left
      // background-color #fff
      border .4vw #fff solid
      img,figure
        width 100% !important
        height auto
        border 0.25vw solid #ccc
      figure>img
        border none
    .right
      font-weight bold

</style>
