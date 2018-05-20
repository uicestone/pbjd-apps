<template lang="pug">
  div
    ul.menu-list
      router-link(to="/video") 红色电影配音
      router-link(to="/audio") 我要对党说..
      router-link(to="/motto") 我的座右铭
      router-link(to="/history") 往期精选            
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.menu-list {
  display: flex;
  flex-direction: column;
}
</style>
