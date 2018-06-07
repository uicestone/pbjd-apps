<script>
export default {
  methods:{
    goDetail(){
      this.$router.push({name:"mapDetail"})
    }
  }
};
</script>

<template lang="pug">
  div.page-map-index
    div.buttonGroup
      img(src="~@/assets//image/map_index_button1.png")
      img(@click="goDetail" src="~@/assets//image/map_index_button2.png")
</template>

<style lang="stylus" scoped>
.page-map-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start !important;
  height: 100vh;
  background: url('~@/assets//image/map_index_bg.png') center center no-repeat;
  background-size: cover;
}
.buttonGroup
  position absolute
  left 40%
  bottom 10%
  display flex
  width 30vw
  justify-content space-between
  img 
    cursor pointer
    width 40%
    height 40%
</style>
