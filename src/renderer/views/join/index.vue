<template lang="pug">
  div.page-join-index
    p.join-count 已有<span>2135689</span>人次参与
    img.title(src="static/image/title.png")
    p.subtitle 输入你想了解的那一天
    div.form
      div
        //- DatePicker(type="date" v-model="date.date" style="width: 200px")
        Select(v-model="date.year" style="width:100px")
          Option(v-for="item in yearList" :value="item.value" :key="item.value") 
        span 年
        Select(v-model="date.month" style="width:50px")
          Option(v-for="item in monthList" :value="item.value" :key="item.value")   
        span 月
        Select(v-model="date.day" style="width:50px")
          Option(v-for="item in dayList" :value="item.value" :key="item.value")   
          span 日
      div
        span 日期类型
        Select(v-model="date.type" style="width:200px")
          Option(v-for="item in dateTypes" :value="item.value" )
        Button(@click="join" :disabled="finish") 立即参与

</template>


<script>
export default {
  data() {
    return {
      dateTypes: [
        {
          value: "birthday",
          label: "生日"
        },
        {
          value: "memorialday",
          label: "纪念日"
        },
        {
          value: "partyday",
          label: "入党日"
        }
      ],
      yearList: new Array(98).fill(0).map((k, i) => ({ value: i + 1921 })),
      monthList: new Array(12).fill(0).map((k, i) => ({ value: i + 1 })),
      dayList: new Array(30).fill(0).map((k, i) => ({
        value: i + 1
      })),
      date: {
        date: "",
        type: "",
        year: "",
        month: "",
        day: ""
      }
    };
  },
  mounted() {
    this.date.year = 1980;
  },
  computed: {
    finish() {
      const { type, year, month, day } = this.date;
      return type && year && month && day ? false : true;
    }
  },
  methods: {
    join() {
      const { date } = this;
      this.$router.push({ name: "joinDetail", query: { ...date } });
    }
  }
};
</script>

<style lang="stylus" scoped>
.title
  width 40vw
.page-join-index
  display flex
  flex-direction column
  align-items center
  height 100vh
  background url('~/static/image/history_bg_home.png') no-repeat center center fixed
  background-size cover
.form
  display flex
</style>

