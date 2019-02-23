<template lang="pug">
     div.page-floor-index
        .contanier
            .left 洪德楼位于上海市嘉定区洪德路50号，建筑面积近3000平方米，是嘉定建党中心、嘉定区群团服务中心的主要办公场所和活动阵地。
            .right
                .floor-guide(@click="goGuide") 楼层指引
                img(src="~@/assets//image/back-dark.png" @click="goBack")
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        goBack() {
            this.$router.push('/map/index');
        },
        goGuide() {
            this.$router.push('guide');
        }
    }
}
</script>
<style lang="stylus" scoped>
.page-floor-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start !important;
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('~@/assets//image/build-intro.png') center center no-repeat;
  background-size: cover;
}
.contanier {
    width 70vw;
    height 30vh;
    position absolute;
    right 0;
    bottom 0;
    display flex;
    .left {
        flex 2;
        overflow-y auto;
        padding-top:3vh;
        font-size 30px;
        color #000;
        line-height 8vh;
    }
    .right {
        flex 1;
        position relative;
        .floor-guide {
            position absolute;
            width 14vw;
            height 10vh;
            background-color rgb(195,13,35);
            border-radius 8px;
            box-shadow 0 10px 10px rgb(218,108,122);
            top 4vh;
            display flex;
            justify-content center;
            align-items center;
            color #fff;
            font-size 40px;
            // font-weight bold;
            cursor pointer;
            left 50%;
            transform translateX(-50%);

        }

        img {
            position absolute;
            bottom 5vh;
            left 50%;
            transform translateX(-50%);
            width 7vw;
            cursor pointer;
        }
    }
}
</style>


