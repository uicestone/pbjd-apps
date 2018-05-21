<template lang="pug">
  div.joinDetail
    div.left
      div
        div
          span 您的{{text[date.type]}}为 {{date.year}} 年 {{date.month | dt }} 月{{date.day | dt}} 日
        div(v-if="date.type=='partyday'")
          p 截止到参加活动时
          p 您已经入党了{{partyDate.year}}年 {{partyDate.month}}月 {{partyDate.day}}天{{partyDate.hour}}时 {{partyDate.minute}}分 {{partyDate.second}}秒
        div(v-if="date.type=='birthday'")
          p 党史上的这一天发生了不少事情，一起来看看吧。
        div(v-if="date.type=='memorialday'")
          p 这一天对你来说非常重要,
          p 党史上的这一天也同样重要，一起来看看吧。
      div
        span 共有 1822人次在这一天入党,占活动总人数的0.1%
      div
        span 分享到朋友圈，让您的党员朋友一起来参加
    div.right
      div.date 
        p {{date.month | dt }}月
        p {{date.day | dt}}日

      h3 党史上的这一天
      h4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
      p Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      date: {
        type: "",
        year: 0,
        month: 0,
        day: 0
      },
      text: {
        birthday: "生日",
        partyday: "入党日期",
        memorialday: "纪念日"
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
  mounted() {
    const { query } = this.$route;
    const { type, year, month, day } = query;
    this.date = { type, year, month, day };
  }
};
</script>

<style lang="stylus" scoped>
.joinDetail
  padding 2rem 4rem
  display flex
  .left
    flex 1
  .right
    flex 1
    display flex
    flex-direction column
    h3
      text-align center
</style>


