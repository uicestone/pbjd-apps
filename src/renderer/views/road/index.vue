<template lang="pug">
.road(:style="{ background: road.background }")
  .left
    img.img.title(:src="road.title_img")
    img.img.subTitle(:src="road.subTitle_img", :style="{ height: road.subTitle_img_height }")
    .content(v-if="road.content.content", v-html="road.content.content")
  .right(:style="{ color: road.background }")
    img.img.road-image(:src="road.img", :style="{ height: road.img_height }")
    .list
      .item(v-for="(item, index) in road.list", :key="index", @click="showModal(index)")
        div 
          span {{ index > 8 ? index + 1 : `0${index + 1}` }}
          span(style="margin-left: 20px") {{ item.title }}
  .back(@click="$router.go(-1)")
    img(src="~@/assets/image/road_arrow.png")
  div(v-if="currentModalData.id")
    Modal.modal3(v-model="modal3", :title="currentModalData.title")
      .modal3-content
        .modal3-content-left
          Carousel(indicator-position="outside", autoplay, v-if="modal3", :height="720")
            CarouselItem(v-for="item in currentModalData.images.slice(0, -1)", v-if="modal3")
              img.img(:src="item")
        .modal3-content-right
          .desc-container
            .desc(v-html="currentModalData.content") 
            img.img(:src="currentModalData.posterUrl", style="width: 100%")
      .modal-footer(slot="footer")
        .modal-footer-left
        .modal-footer-right
</template>

<script>
import axios from "axios";
import QRCode from "qrcode";

export default {
  data() {
    return {
      id: "hs",
      currentModalIndex: 0,
      modal3: false,
      roads: {
        hs: {
          title_img: require("../../assets/image/road_1_title.png"),
          subTitle_img: require("../../assets/image/road_1_subtitle.png"),
          img: require("../../assets/image/road_1_img.png"),
          img_height: "450px",
          subTitle_img_height: "131px",
          background: "#a21e0a",
          contentAPI: "http://jddj.hbird.com.cn/wp-json/jddj/v1/posts/route-hs",
          listAPI: "http://jddj.hbird.com.cn/wp-json/jddj/v1/posts?category=route-hs&limit=-1&standaloneContentImages=1",
          content: {},
          list: []
        },
        fd: {
          title_img: require("../../assets/image/road_2_title.png"),
          subTitle_img: require("../../assets/image/road_2_subtitle.png"),
          img: require("../../assets/image/road_2_img.png"),
          img_height: "600px",
          subTitle_img_height: "131px",
          background: "#ac8759",
          contentAPI: "http://jddj.hbird.com.cn/wp-json/jddj/v1/posts/route-fd",
          listAPI: "http://jddj.hbird.com.cn/wp-json/jddj/v1/posts?category=route-fd&limit=-1&standaloneContentImages=1",
          content: {},
          list: []
        },
        qc: {
          title_img: require("../../assets/image/road_3_title.png"),
          subTitle_img: require("../../assets/image/road_3_subtitle.png"),
          img: require("../../assets/image/road_3_img.png"),
          img_height: "600px",
          subTitle_img_height: "66px",
          background: "#37569f",
          contentAPI: "http://jddj.hbird.com.cn/wp-json/jddj/v1/posts/route-qc",
          listAPI: "http://jddj.hbird.com.cn/wp-json/jddj/v1/posts?category=route-qc&limit=-1&standaloneContentImages=1",
          content: {},
          list: []
        }
      }
    };
  },
  mounted() {
    const { query } = this.$route;
    const { id } = query;
    this.id = id;
    this.getData();
  },
  computed: {
    road() {
      return this.roads[this.id];
    },
    currentModalData() {
      return this.road.list[this.currentModalIndex] || {};
    }
  },
  methods: {
    showModal(index) {
      this.currentModalIndex = index;
      this.modal3 = true;
    },
    async getData() {
      const [contentRes, roadRes] = await Promise.all([axios.get(this.road.contentAPI), axios.get(this.road.listAPI)]);
      if (contentRes.data) {
        this.road.content = contentRes.data;
      }
      if (roadRes.data) {
        this.road.list = roadRes.data;
      }
    }
  }
};
</script>

<style lang="stylus">
.road
  width 100vw
  height 100vh
  padding 68px 100px 45px 100px
  display flex
  justify-content space-between
  position relative
  .left
    width 650px
    display flex
    flex-direction column
    align-items center
    .title
      height 129px
      align-self flex-start
    .subTitle
      margin-top 40px
    .content
      overflow-y scroll
      margin-top 63px
      font-size 21px
      font-family SourceHanSansCN-Normal-GBpc-EUC-H
      line-height 42px
      color white
      p
        margin-bottom 60px
  .right
    width 858px
    display flex
    flex-direction column
    .road-image
      width 858px
    .list
      margin 20px 45px 0
      padding-right 20px
      flex 1
      overflow-y scroll
      font-size 27px
      line-height 54px
      .item
        display flex
        align-items center
        padding-left 54px
        background white
        margin-bottom 10px
  .back
    cursor pointer
    position fixed
    left 48px
    bottom 48px
.modal3
  z-index 10001
  .ivu-modal-header-inner
    font-size 2.2vw
    color #c14328
    height auto
    display flex
    align-items center
    padding 0 0 0 10px
    line-height 40px
    font-family Dasong
  .ivu-modal
    width 88vw !important
    // margin-right 5vw
    // margin-top 5vh
  .ivu-modal-close
    top 14px
    z-index 2
  .ivu-modal-header
    border-bottom 3px solid #94251f
    background #fff
    border-radius 10px 10px 0 0
    position relative
    z-index 1
    box-shadow 0 1px 10px rgba(51, 17, 9, 0.7)
  .ivu-modal-body
    background white
    border 1px solid rgba(255, 0, 0, 0.7)
    position relative
    z-index 1
    box-shadow 0 1px 10px rgba(51, 17, 9, 0.7)
  .ivu-modal-footer
    border 1px solid rgba(255, 0, 0, 0.7)
    background rgb(247, 231, 230)
    border-radius 0 0 10px 10px
  .ivu-modal-content
    background transparent
    box-shadow 0 0px 20px rgba(255, 0, 0, 0.5)
    .ivu-carousel-item
      display flex
      justify-content center
      align-items center
  .ivu-icon-ios-close-empty
    color #b80000
    border-radius 2px
    border 1px solid #b80000
    padding 0 8px
    top 0
    font-size 85px
    line-height 50px
    width 50px
    height 50px
    text-align center
  .desc-container
    .desc
      min-height 100px
      font-size 1.5vw
      line-height 1.8
      font-weight 500
      color #515253
      p
        text-indent 2em
        text-align justify
      table
        width 100%
        td
          border 1px #ccc solid
          padding 0.1vw 0.8vw
    .contact
      font-size 1.4vw
      font-weight normal
      line-height 50px
      margin-top 2vh
  .modal3-content
    height 74vh
    padding 2vw
    font-size 1vw
    display flex
    justify-content space-between
    p
      img
        width 100%
        display block
        text-align center
    .modal3-content-left
      width 60%
      .img
        width 100%
        height auto
    .modal3-content-right
      width 35%
      overflow-y scroll
  .modal-footer
    display flex
    justify-content space-between
    align-items center
  .modal-footer-left
    width 6rem
    display flex
    justify-content space-between
  .modal-footer-right
    font-size 1.4vw
    display flex
    justify-content space-between
    div
      display flex
      align-items center
      padding 0 20px
  .swiper
    width 60%
    .img
      width 100%
.menu-img-detail
  width 30vw
  height 13vw
  margin-top 1vw
  margin-left 1vw
  background url('~@/assets//image/map_button_5.png') no-repeat
  background-size contain
  padding-left 4vw
  padding-top 4vw
  font-size 3.3vw
  font-weight bold
  font-family Dasong
  color white
  .first
    margin-right 2.2vw
    color #d43616
.img
  display block
  object-fit contain
::-webkit-scrollbar
  width 8px
  height 5px
  background-color transparent
/* 滚动条的轨道 */
::-webkit-scrollbar-track
  background-color transparent
/* 滚动条的滑块按钮 */
::-webkit-scrollbar-thumb
  border-radius 10px
  height 5px
  background-color white
/* 滚动条的上下两端的按钮 */
::-webkit-scrollbar-button
  height 5px
  background-color transparent
</style>
