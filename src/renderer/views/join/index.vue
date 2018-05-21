<template lang="pug">
  div
    p 已有<span>2135689</span>人次参与
    p 输入你想了解的那一天
    div
      Input(v-model="date.year" size="small" type="text" style="width:100px")
      span 年
      Input(v-model="date.month" size="small" type="text" style="width:100px")      
      span 月
      Input(v-model="date.day" size="small"  type="text" style="width:100px")              
      span 日
    div
      span 日期类型
      Select(v-model="date.type" style="width:200px")
        Option(v-for="item in dateTypes" :value="item.value" :key="item.value" :label="item.label")
      button(@click="join") 立即参与

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
      date: {
        type: "",
        year: "",
        month: "",
        day: ""
      }
    };
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
</style>

