<template lang="pug">
  div.page-join-index
    p.join-count 已有<span>2135689</span>人次参与
    img.title(src="~@/assets/image/title.png")
    p.subtitle 输入你想了解的那一天
    div.form
      select.selectYear(v-model="date.year" placeholder="null")
        option(v-for="item in yearList" :value="item.value" :key="item.value") {{item.value}}
      span 年
      select.selectMonth(v-model="date.month" )
        option(v-for="item in monthList" :value="item.value" :key="item.value") {{item.value}}   
      span 月
      select.selectMonth(v-model="date.day")
        option(v-for="item in dayList" :value="item.value" :key="item.value") {{item.value}} 
        span 日
      span 日期类型
      select.selectType(v-model="date.type")
        option(v-for="item in dateTypes" :value="item.value" ) {{item.label}}
      button.button4(@click="join" :disabled="finish") 立即参与

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
        type: "partyday",
        year: 1980,
        month: 1,
        day: 1
      }
    };
  },
  mounted() {
    // this.date.year = 1980;
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

<style lang="stylus">
.page-join-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start !important;
  height: 100vh;
  background: url('~@/assets//image/history_bg_home.png') center center no-repeat;
  background-size: cover;

  select {
    overflow: hidden !important;
  }

  .title {
    width: 80vw;
  }

  .subtitle {
    color: black;
    font-size: 2vw;
    font-weight: 600;
    margin: 2vw 0 2vw -600px;
  }

  .select {
    unset: all;
  }

  .form {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 2rem;
    font-weight: 600;
    width: 80vw;
  }

  .form-box {
    display: flex;
    align-items: center;
  }

  .join-count {
    position: absolute;
    top: 4vh;
    font-size: 2vw;
    color: black;
    font-weight: 600;

    span {
      font-size: 3vw;
      font-weight: 600;
      color: #E60012;
    }
  }

  .button4 {
    border: none;
    width: 16vw;
    height: 4.4vw;
    text-align-last: center;
    font-size: 2rem;
    background: url('~@/assets//image/button_blue_4.png') center center no-repeat;
    background-size: cover;
    text-align: center;
    color: white;
  }

  .selectYear {
    border: none;
    width: 10vw;
    height: 4.4vw;
    text-align-last: center;
    background: url('~@/assets//image/select_4.png') center center no-repeat;
    background-size: cover;
    font-size: 2rem;
    text-align: center;
  }

  display: flex;
  align-items: center;
  justify-content: center;
}

.selectMonth {
  border: none;
  text-align-last: center;
  width: 4.9vw;
  height: 4.4vw;
  background: url('~@/assets//image/select_2.png') center center no-repeat;
  background-size: cover;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selectType {
  border: none;
  width: 15vw;
  height: 4.4vw;
  text-align-last: center;
  background: url('~@/assets//image/select_arrow.png') center center no-repeat;
  background-size: cover;
  font-size: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

