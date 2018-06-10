<script>
import moment from "moment";
import * as request from "../../utils/request";

export default {
  data() {
    return {
      date: {
        type: "",
        year: "",
        month: "",
        day: ""
      },
      request: {
        count: 1,
        percentage: 1,
        content: "",
        id: 0,
        slug: "",
        title: ""
      },
      text: {
        birth: "生日",
        enroll: "入党日期",
        memo: "纪念日"
      }
    };
  },
  computed: {
    partyDate() {
      const { year, month, day } = this.date;
      const before = moment(`${year}.${month}.${day}`, "YYYY.MM.DD");
      const now = moment();
      const diff = moment.duration(now.diff(before));
      return {
        year: diff.years(),
        month: diff.months(),
        day: diff.days(),
        hour: diff.hours(),
        minute: diff.minutes(),
        second: diff.seconds()
      };
    }
  },
  async mounted() {
    const { query } = this.$route;
    const { type, year, month, day } = query;
    this.date = { type, year, month, day };
    this.request = Object.assign(
      this.request,
      await request.getUserCount({ type, day, month }),
      await request.getCpcReview({ type, day, month })
    );
  }
};
</script>

<template lang="pug">
  div.page-join-detail
    div.left
      img.title(src="~@/assets/image/title.png")              
      div.content
        div.content-header
          span 您的{{text[date.type]}}为 <span class="highlight">{{date.year}}</span> 年 <span class="highlight">{{date.month  }}</span> 月<span class="highlight">{{date.day }}</span> 日
        div.content-footer3(v-if="date.type=='enroll'")
          p 截止到参加活动时
          p 您已经入党了<span class="highlight">{{partyDate.year}}</span>年<span class="highlight"> {{partyDate.month}}</span>月 <span class="highlight">{{partyDate.day}}</span>天<span class="highlight">{{partyDate.hour}}</span>时 <span class="highlight">{{partyDate.minute}}</span>分 <span class="highlight">{{partyDate.second}}</span>秒
        div.content-footer(v-if="date.type=='birth'")
          p 党史上的这一天发生了不少事情，一起来看看吧。
        div.content-footer3(v-if="date.type=='memo'")
          p 这一天对你来说非常重要,
          p 党史上的这一天也同样重要，一起来看看吧。
      div.desc
        span 共有 <span class="highlight">{{request.count}}</span>人次在这一天入党,占活动总人数的<span class="highlight">{{request.percentage}}%</span>
      //- div
      //-   span 分享到朋友圈，让您的党员朋友一起来参加
    div.right
      div.date 
        p.month {{date.month }}月
        p.day {{date.day }}日
      img.post-title(src="~@/assets/image/post-title.png")
      p.post-content(v-html="request.content")
    div.button-back-custom(@click="$router.go(-1)") 返回    
    img.logo(src="~@/assets/image/logo_cpc.png")              

</template>

<style lang="stylus">
.page-join-detail
  padding 8vw 6vw
  display flex
  height 100vh
  background url('~@/assets//image/history_bg.png') no-repeat center center fixed
  background-size cover
  justify-content space-around
  .left
    width 35vw
  .right
    width 35vw
    box-sizing border-box
    display flex
    flex-direction column
    margin-left 4rem
    border 4px solid rgb(195, 13, 35)
    background white
    border-radius 12px
    padding 1vw
    position relative
  .post-title
    object-fit contain
    height 100px
    margin 40px 0 40px 0
  .post-content
    overflow-y scroll
    padding 0 0 0 20px
    color black
    &::-webkit-scrollbar
      display none
    h2
      font-size 1.4vw
      margin 0 0 1vw 0
    p
      margin 0 0 3vw 0
      line-height 1.5vw
      font-size 1vw
      font-weight 600
  .date
    position absolute
    border solid 1px black
    border-radius 6px
    left -2vw
    top -2vw
    font-size 2rem
    font-weight 600
    .month
      background rgb(234, 84, 19)
      color white
      padding 0.2vw 1.2vw
      border-radius 6px 6px 0 0
    .day
      background white
      color black
      padding 0.2vw 1.2vw
      border-radius 0 0 6px 6px
  .title
    width 100%
  .logo
    position absolute
    width 80px
    height auto
    right 20px
    top 20px
  .content-header
    background rgba(245, 170, 134, 0.9)
    color black
    padding 1.5vw
    font-size 1.5vw
    font-weight bold
    border-radius 1rem 1rem 0 0
    display flex
    justify-content center
  .content-footer
    font-size 1.5vw
    font-weight bold
    background rgba(250, 213, 159, 0.9)
    color black
    padding 1.5vw
    border-radius 0 0 1rem 1rem
    display flex
    justify-content center
  .content-footer3
    font-size 1.5vw
    font-weight bold
    background rgba(250, 213, 159, 0.9)
    color black
    padding 1.5vw
    border-radius 0 0 1rem 1rem
    display flex
    flex-direction column
    justify-content center
    align-items center
  .button-back-custom
    position absolute
    top 3vw
    right 8vw
    border none
    z-index 10000
    color white
    padding 0.25vw 0.6vw
    background url('~@/assets//image/button_blue_2.png') center center no-repeat
    background-size cover
    font-size 1vw
    display flex
    letter-spacing 10px
    text-indent 10px
    text-align center
  .desc
    margin 2vw 0
    letter-spacing 2px
    font-size 1.2vw
    font-weight bold
    color black
  .highlight
    color rgb(195, 13, 35)
    font-size 2vw
</style>


