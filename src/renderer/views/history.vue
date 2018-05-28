<script>
export default {
  data() {
    return {
      currentIndex: 0,
      users: []
    };
  },
  mounted() {
    new Array(10).fill(10).forEach((k, i) => {
      this.users.push(
        new Array(10).fill({
          name: `高劲松${i}`,
          addr: `北关村${i}`
        })
      );
    });
  },
  computed: {
    currentUser() {
      return this.users[this.currentIndex];
    }
  },
  methods: {
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    },
    next() {
      if (this.currentIndex < this.users.length - 1) {
        this.currentIndex += 1;
      }
    }
  }
};
</script>

<template lang="pug">
  div.page-history-index
    div.main-title 往期精选
    div.content    
      ul.menu-list
        router-link.button4(to="/video") 红色电影配音
        router-link.button4(to="/audio") 我要对党说..
        router-link.button4(to="/motto") 我的座右铭
      div.user-list
        div.list-item
          div.user-item(v-if="index < 5" v-for="(value,index) in currentUser")
            div
              span.index {{index | dt}}
              span.name {{value.name}}
            //- span.name {{value.addr}}
            
            button >
        div.list-item
          div.user-item(v-if="index >= 5 && index <= 10" v-for="(value,index) in currentUser")
            div
              span.index {{index | dt}}
              span.name {{value.name}}
            //- span.name {{value.addr}}
            
            button >
      div.pagination
        span(@click="prev()") 上一页
        div
          span.count(v-for="(value,index) in users" @click="currentIndex = index") {{ index }}
        span(@click="next()") 下一页
</template>

<style lang="stylus" scoped>
.page-history-index
  height 100vh
  background url('~/static/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.main-title
  color white
  width 10rem
  background rgba(255, 0, 0, 0.5)
  border-bottom 2px solid red
  padding 0.5rem 2rem
  text-align center
  font-size 1rem
.user-list
  display flex
  justify-content center
  .list-item
    width 35vw
    .user-item
      display flex
      justify-content space-between
      margin 0.2rem
      padding 0.5rem
      background rgba(0, 0, 0, 0.1)
.pagination
  margin 0 auto
  display flex
  width 70vw
  justify-content space-between
.menu-list
  width 60vw
  margin 0 auto
  display flex
  justify-content center
  .button4
    margin 0 1rem
.content
  height 80vh
  display flex
  flex-direction column
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
