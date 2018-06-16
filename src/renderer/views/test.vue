<template lang="pug">
  div
    ul.menu-list
      li
        router-link(to="/map/index") 党建地图
      li
        router-link(to="/home") 党建声音
      li
        router-link(to="/join/index") 历史上的那一天
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.menu-list
  display flex
  flex-direction column
  align-items center
  justify-content space-around
  height 50vh
  margin-top 25vh
  li
    font-size 2vw
    background #ce1f1f
    color #0FF
    padding 1vw 2vw
    border-radius 1vw
    a
      color #fff3ae
</style>
