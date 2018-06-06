<template lang="pug">
  div.page-home
    ul.menu-list
      router-link.button5(to="/movie/index") 红色电影配音
      router-link.button5(to="/speak/index") 我要对党说..
      router-link.button5(to="/motto/index") 我的座右铭
      router-link.button5(to="/history") 往期精选            
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.page-home
  height 100vh
  background url('~@/assets/image/sound_bg_home.png') no-repeat center center fixed
  background-size cover
  .menu-list
    position absolute
    top 10vh
    right 5vw
    display flex
    flex-direction column
    justify-content space-around
    height 60vh
.button5
  color white
  padding 0.75vw 3vw
  background url('~@/assets/image/button_blue_5.png') center center no-repeat
  background-size cover
  font-size 2.4rem
  text-align center
.button4
  color white
  padding 0.2rem
  background url('~@/assets/image/button_blue_4.png') center center no-repeat
  background-size cover
  font-size 0.8rem
  text-align center
</style>
