<template lang="pug">
    div.page-map-groupList
        div.title
            img(:src="groupListData.posterUrl")
            span.shoushu {{ groupListData.title }}
        ul
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
<style lang="stylus" scoped>
.page-map-groupList {
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
  position relative;
}

ul {
    width 90vw;
    height 60vh;
    overflow auto;
    li {
        width 39vw;
        margin-right 5vw;
        float left;
        height 6vh;
        line-height 6vh;
        margin-bottom 4vh;
        background-color rgb(161,0,5);
        border-radius 10px;
        padding-left 5vw;
        font-size 30px;
        color #fff;
        cursor pointer
    }
}
.back {
    position absolute;
    left 50%;
    transform translateX(-50%);
    bottom 5vh;
    cursor pointer;
}

.title {
    width 100vw;
    height 25vh;
    display flex;
    align-items center;
    justify-content center;
    img {
        margin-right 20px;
        width 80px;
    }
}
.shoushu {
    font-family:shoushu;
    color:#fff;
    font-size:60px;
}

</style>

