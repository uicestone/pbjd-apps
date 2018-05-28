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
  background url('~/static/image/sound_bg_home.png') no-repeat center center fixed
  background-size cover
  .menu-list
    position absolute
    top 10vh
    right 10vw
    display flex
    flex-direction column
    .button5
      margin 0.5rem 0
.button5
  color white
  width 100%
  height 100%
  padding 0.2rem 0.8rem
  background url('~/static/image/button_blue_5.png') no-repeat
  background-size cover
  font-size 1rem
  text-align center
.button4
  color white
  width 50%
  height 50%
  padding 0.2rem
  background url('~/static/image/button_blue_4.png') no-repeat
  background-size cover
  font-size 0.8rem
  text-align center
</style>
