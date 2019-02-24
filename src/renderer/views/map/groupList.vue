<template lang="pug">
  div.page-map-groupList
    div.title
      img(:src="groupListData.posterUrl")
      span.shoushu {{ groupListData.title }}
    ul.scroll-bar-hidden
      li.ellipse(v-for="item in groupListData.departments" :key="item.id" @click='goGroupDetail(item)') {{ item.title }}
     
    img.back(src="~@/assets//image/back-light.png" @click='goBack')
</template>
<script>
import * as request from "../../utils/request";
export default {
  data() {
    return {
      groupListData:''
    }
  },
  mounted() {
    const { query } = this.$route;
    const { item } = query;
    this.groupListData = item;
    window.localStorage.setItem('groupListData',JSON.stringify(item));
  },
  methods:{
    goBack() {
      this.$router.push("group")
    },
    goGroupDetail(item) {
      window.localStorage.setItem('fromGroupList','1');
       this.$router.push({ name: "mapGroupDetail", query: { item:item } });
    }
  }
}
</script>
<style lang="stylus">
.page-map-groupList
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start !important;
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('~@/assets//image/bg-organizations.png') center center no-repeat;
  background-size: cover;
  padding: 0 5vw;
  // position relative;

  ul
    width 90vw;
    height 60vh;
    overflow auto;
    li
      font-family STZhongSong;
      width 43vw;
      float left;
      height 4vw;
      line-height 4vw;
      margin-bottom 2vw;
      background-color rgba(0, 0, 0, 0.35);
      border-radius 0.75vw;
      padding-left 3vw;
      font-size 1.95vw;
      color #fff;
      cursor pointer
      &:nth-child(2n-1)
        margin-right 3vw
  .back
    position absolute;
    left 50%;
    transform translateX(-50%);
    bottom 5vh;
    cursor pointer;

  .title
    width 100vw;
    height 25vh;
    display flex;
    align-items center;
    justify-content center;
    img
      margin-right 1.5vw;
      width 10vw;
  .shoushu
    font-family:shoushu;
    color:#fff;
    font-size:7vw;

</style>

