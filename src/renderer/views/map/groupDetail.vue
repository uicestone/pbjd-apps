<template lang="pug">
    div.page-map-groupDetail
        img.titleImg(:src="groupDetailData.posterUrl")
        .title 
            img(src="~@/assets//image/bg-department-title.png")
            span {{ groupDetailData.title }}
        .line
        .content
            .left(v-html="groupDetail.content")
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
        console.log(item);
        this.groupDetailData = item;
        this.postsDetail();
    },
    methods: {
        goBack() {
            this.$router.back(-1);
        },
        postsDetail() {
            const id = this.groupDetailData.id;
            request.postsDetail({id}).then(res => {
                console.log(res,'potsDetail')
                this.groupDetail = res;
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.page-map-groupDetail {
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('~@/assets//image/bg-floor-detail.png') center center no-repeat;
  background-size: cover;
  padding: 5vh 5vw;
  position relative;
}

.title {
    width 20vw;
    height 8vh;
    display flex;
    align-items center;
    padding-left 2vw;
    color #fff;
    font-size 25px;
    position relative;
    margin-top 30px;
    img {
        position absolute;
        height 100%;
        width auto;
        left 0;
    }
    span {
        z-index 99;
        color #fff;
    }
}
.back {
    position absolute;
    left 50%;
    transform translateX(-50%);
    bottom 5vh;
    cursor pointer;
}

.line {
    width 75vw;
    height 6px;
    margin-top 10px;
    background-color rgb(44,166,224);
} 

.titleImg {
    position absolute;
    right 5vw;
    top 4vh;
    width 10vw;
}

.content {
    width 100%;
    height 58vh;
    display flex;
    justify-content space-between;
    margin-top 5vh;
    div {
        width 48%;
        height 100%;
        overflow-x hidden;
        overflow-y auto;
        color rgb(89,87,87);
        font-size 26px;
        letter-spacing 1px;
        white-space: pre-line;
    }

    .left {
        background-color #fff;
    }
}


</style>


