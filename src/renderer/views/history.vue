<template lang="pug">
  div
    ul.menu-list
      router-link(to="/video") 红色电影配音
      router-link(to="/audio") 我要对党说..
      router-link(to="/motto") 我的座右铭
    div.user-list
      div
        div.user-item(v-if="index < 5" v-for="(value,index) in currentUser")
          span.index {{index | dt}}
          span.name {{value.name}}
          span.name {{value.addr}}
          
          button >
      div
        div.user-item(v-if="index >= 5 && index <= 10" v-for="(value,index) in currentUser")
          span.index {{index | dt}}
          span.name {{value.name}}
          span.name {{value.addr}}
          
          button >
    div.pagination
      span(@click="prev()") 上一页
      div
        span.count(v-for="(value,index) in users" @click="currentIndex = index") {{ index }}
      span(@click="next()") 下一页
</template>

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
      console.log(this.currentIndex);
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

<style lang="stylus" scoped>
.user-list
  display flex
  justify-content space-around
.pagination
  display flex
  justify-content space-between
// .user-item {
// display: flex;
// justify-content: space-between;
// }
.menu-list
  width 60vw
  margin 0 auto
  display flex
  justify-content space-around
</style>
