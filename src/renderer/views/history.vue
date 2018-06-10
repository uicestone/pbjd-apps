<script>
import * as request from "../utils/request";

let req = {
  movie: request.getSpeechs,
  talk: request.getSpeechs,
  motto: request.getMottoes
};

let routeName = {
  movie: "movieDetail",
  talk: "speakDetail",
  motto: "mottoDetail"
};

export default {
  data() {
    return {
      page: 0,
      type: "",
      isUpdate: false,
      buttons: [
        {
          label: "红色电影配音",
          type: "movie"
        },
        {
          label: "我要对党说",
          type: "talk"
        },
        {
          label: "我的座右铭",
          type: "motto"
        }
      ],
      movie: {},
      talk: {},
      motto: {},
      paginates: new Array(10).fill(0)
    };
  },
  watch: {
    page() {
      this.updatePage();
    },
    type() {
      this.updatePage();
    }
  },
  async mounted() {
    const { query } = this.$route;
    const { page = 0, type = "movie" } = query;
    this.type = type;
    this.page = page;
  },
  computed: {
    currentUser() {
      if (!this[this.type]) {
        return [];
      }
      if (this.isUpdate) {
      }
      return this[this.type][this.page] || [];
    }
  },
  methods: {
    async updatePage() {
      let { type, page } = this;
      if (this.currentUser.length == 0) {
        let data = await req[type]({
          type,
          query: { page: page + 1, limit: 12 }
        });
        this[type][page] = data;
        this.isUpdate = !this.isUpdate;
      }
    },
    switchType(button) {
      this.page = 0;
      this.type = button.type;
    },
    prev() {
      if (this.page > 0) {
        this.page -= 1;
      }
    },
    next() {
      if (this.page < this.paginates.length - 1) {
        this.page += 1;
      }
    },
    clickItem(item) {
      let { type = "motto", id } = item;
      this.$router.push({
        name: routeName[type],
        query: { id }
      });
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
          div.user-item(v-if="index < 5" v-for="(value,index) in currentUser" @click="clickItem(value)")
            div
              span.index {{index | dt}}
              span.name {{value.authorName}}
            img.icon-arrow-blue(src="~@/assets/image/arrow_blue.png")
        div.list-item
          div.user-item(v-if="index >= 5 && index <= 10" v-for="(value,index) in currentUser" @click="clickItem(value)")
            div
              span.index {{index | dt}}
              span.name {{value.authorName}}
            
            img.icon-arrow-blue(src="~@/assets/image/arrow_blue.png")            
      div.pagination
        p(@click="prev()") 
          img.icon-arrow(src="~@/assets/image/arrow_left.png")
          span 上一页
        div
          div.count(v-for="(value,index) in paginates" @click="page = index", :class="{'count-active': index == page }") 
        p(@click="next()") 
          span 下一页         
          img.icon-arrow(src="~@/assets/image/arrow_right.png")
    button.button-back(@click="$router.go(-1)") 返回
    img.logo(src="~@/assets/image/sound.png")             
</template>

<style lang="stylus" scoped>
.page-history-index
  height 100vh
  background url('~@/assets/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
.user-list
  height 50vh
  display flex
  justify-content center
  .list-item
    width 40vw
    .user-item
      font-size: 2vw
      font-weight: 600
      display: flex
      justify-content: space-between
      align-items: center
      margin: 1vh 1vw
      padding: 10px 20px 10px 0
      border-bottom: solid 3px #988234
      background: #e3bc34
      height: 9vh
      .name
        color black
        font-weight 400
        margin-left 20px
      .index
        padding 16px
        color white
        background rgba(203, 172, 56, 1)
.pagination
  margin 30px auto 0
  display flex
  width 80vw
  font-size 2vw
  justify-content space-between
  align-items center
  p
    display flex
    align-items center
.menu-list
  margin 20px auto 10px
  .button5
    margin 0 40px
    width 17.34vw
    height 4.39vw
    font-size 2.19vw
    font-weight bold
.content
  height 71vh
  display flex
  flex-direction column
.button5
  border none
  color white
  width 15vw
  height 3.8vw
  background url('~@/assets//image/button_blue_5.png') no-repeat
  background-size cover
  font-size 1.6vw
  font-weight 400
  text-align center
  line-height 2vw
.count
  font-size 2vw
  background rgba(245, 185, 155, 1)
  width 20px
  height 20px
  margin 0 10px
  display inline-block
  border-radius 10px
.count-active
  background rgba(235, 90, 50, 1)
.icon-arrow
  margin 0 5px
  width 30px
  height 30px
.icon-arrow-blue
  width 30px
  height 30px
.logo
  position absolute
  width 20vw
  right 10px
  top 10px
</style>
