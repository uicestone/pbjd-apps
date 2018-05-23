<template lang="pug">
  div
    ul.menu-list
      router-link(to="/movie") 红色电影配音
      router-link(to="/speak") 我要对党说..
      router-link(to="/motto") 我的座右铭
      router-link(to="/history") 往期精选  
      router-link(to="/join/index") 加入
      router-link(to="/map") 地图                                                      
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.menu-list
  display flex
  flex-direction column
</style>
