<template lang="pug">
  div.page-home
    ul.menu-list
      router-link.button5.glow(to="/movie/index") 红色电影配音
      router-link.button5.glow.delay-1(to="/speak/index") 我要对党说
      router-link.button5.glow.delay-2(to="/motto/index") 我的座右铭
      router-link.button5.glow.delay-3(to="/history") 往期精选            
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
    top 13vh
    right 5vw
    display flex
    flex-direction column
    justify-content space-around
    height 70vh
.button5
  color white
  background url('~@/assets/image/button_blue_5.png') center center no-repeat
  background-size cover
  text-align center
  width 24.1vw
  height 6.11vw
  line-height 5.6vw
  font-weight bold
  font-size 3.04vw
.button4
  color white
  padding 0.2rem
  background url('~@/assets/image/button_blue_4.png') center center no-repeat
  background-size cover
  font-size 0.8rem
  text-align center
@keyframes glow
  0%
    opacity 1
  25%
    opacity 0.5
  50%
    opacity 1
  100%
    opacity 1
.glow
  animation glow 4s ease-in-out infinite
.delay-1
  animation-delay 1s
.delay-2
  animation-delay 2s
.delay-3
  animation-delay 3s
</style>
