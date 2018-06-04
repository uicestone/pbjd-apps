<script>
export default {
  data() {
    return {
      currentIndex: 0,
      currentType: "movie",
      buttons: [
        {
          label: "红色电影配音",
          type: "movie"
        },
        {
          label: "我要对党说..",
          type: "speak"
        },
        {
          label: "我的座右铭",
          type: "motto"
        }
      ],
      datas: {
        movie: [],
        speak: [],
        motto: []
      },
      images: {
        arrow_left: "static/image/arrow_left.png",
        arrow_right: "static/image/arrow_right.png",
        arrow_blue: "static/image/arrow_blue.png"
      }
    };
  },
  mounted() {
    new Array(10).fill(10).forEach((k, i) => {
      Object.values(this.datas).forEach(obj => {
        obj.push(
          new Array(10).fill({
            name: `高劲松${i}`,
            addr: `北关村${i}`
          })
        );
      });
    });
  },
  computed: {
    users() {
      return this.datas[this.currentType];
    },
    currentUser() {
      return this.users[this.currentIndex];
    }
  },
  methods: {
    switchType(button) {
      this.currentIndex = 0;
      this.currentType = button.type;
    },
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
        Button.button5(v-for="button in buttons"  @click="switchType(button)") {{button.label}}
      div.user-list
        div.list-item
          div.user-item(v-if="index < 5" v-for="(value,index) in currentUser")
            div
              span.index {{index | dt}}
              span.name {{value.name}}
            //- span.name {{value.addr}}
            img.icon-arrow-blue(:src="images.arrow_blue")
        div.list-item
          div.user-item(v-if="index >= 5 && index <= 10" v-for="(value,index) in currentUser")
            div
              span.index {{index | dt}}
              span.name {{value.name}}
            //- span.name {{value.addr}}
            
            img.icon-arrow-blue(:src="images.arrow_blue")            
      div.pagination
        p(@click="prev()") 
          img.icon-arrow(:src="images.arrow_left")
          span 上一页
        div
          span.count(v-for="(value,index) in users" @click="currentIndex = index", :class="{'count-active': index == currentIndex }") ·
        p(@click="next()") 
          span 下一页         
          img.icon-arrow(:src="images.arrow_right")        
</template>

<style lang="stylus" scoped>
.page-history-index
  height 100vh
  background url('~/static/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.user-list
  display flex
  justify-content center
  .list-item
    width 40vw
    .user-item
      font-size 2vw
      font-weight 600
      display flex
      justify-content space-between
      align-items center
      margin 8px 16px
      padding 10px 20px 10px 0
      border-bottom solid 2px rgba(152, 130, 52, 1)
      background rgba(227, 188, 52, 1)
      .name
        color black
        font-weight 400
        margin-left 20px
      .index
        padding 12px
        color white
        background rgba(203, 172, 56, 1)
.pagination
  margin 0 auto
  display flex
  width 80vw
  font-size 2vw
  justify-content space-between
  align-items center
  p
    display flex
    align-items center
.menu-list
  margin 40px auto 10px
  .button5
    margin 0 40px
.content
  height 80vh
  display flex
  flex-direction column
.button5
  border none
  color white
  padding 0.5vw 3vw
  background url('~/static/image/button_blue_5.png') no-repeat
  background-size cover
  font-size 2rem
  font-weight 600
  text-align center
.count
  font-size 8vw
  color rgba(245, 185, 155, 1)
.count-active
  color rgba(235, 90, 50, 1)
.icon-arrow
  margin 0 5px
  width 15px
  height 15px
.icon-arrow-blue
  width 20px
  height 20px
</style>
