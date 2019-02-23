<template lang="pug">
    div.page-map-groupDetail
        .floorNum(:class='bgClass') {{ floorTitle }}
        .floorTitle(:class='colorClass') {{ floorData.title }}
        .content
            .left.scroll-bar-hidden(v-html="floorData.content")
            .right(v-html="floorData.hint")
        img.back(src="~@/assets//image/back-dark.png" @click='goBack')
</template>
<script>
export default {
  data() {
    return {
      floorData: "",
      floorTitle: ""
    };
  },
  mounted() {
    const { query } = this.$route;
    const { item } = query;
    console.log(item);
    this.floorData = item;
    const val = item.floor;
    if (val == 1) {
      this.floorTitle = "一楼";
    }
    if (val == 2) {
      this.floorTitle = "二楼";
    }
    if (val == 3) {
      this.floorTitle = "三楼";
    }
    if (val == 4) {
      this.floorTitle = "四楼";
    }

    this.colorClass = "color" + val;
    this.bgClass = "bgColor" + val;
  },
  methods: {
    goBack() {
      this.$router.push("guide");
    }
  }
};
</script>
<style lang="stylus" scoped>
.page-map-groupDetail {
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('~@/assets//image/bg-floor-detail.png') center center no-repeat;
  background-size: cover;
  position: relative;
}

.back {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5vh;
  cursor: pointer;
}

.floorNum {
  position: absolute;
  width: 12vw;
  height: 8vh;
  border-radius: 0 5vh 5vh 0;
  font-size: 40px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5vh;
  left: 0;
  letter-spacing: 4px;
}

.floorTitle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10vh;
  font-size: 60px;
  font-weight: bold;
}

.content {
  width: 100%;
  height: 58vh;
  display: flex;
  justify-content: space-between;
  margin-top: 5vh;
  padding: 0 5vw;
  position: absolute;
  bottom: 20vh;

  div {
    width: 48%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    color: #000;
    font-size: 30px;
    letter-spacing: 1px;
    white-space: pre-line;
    letter-spacing: 2px;
  }

  .left {
    background-color: #fff;
  }
}

.color1 {
  color: rgb(229, 0, 18);
  border-color: transparent transparent transparent rgb(229, 0, 18); /* 透明 透明 透明 黄 */
}

.bgColor1 {
  background-color: rgb(229, 0, 18);
}

.bgColor2 {
  background-color: rgb(3, 110, 183);
}

.bgColor3 {
  background-color: rgb(164, 11, 94);
}

.bgColor4 {
  background-color: rgb(0, 145, 58);
}

.color2 {
  color: rgb(3, 110, 183);
  border-color: transparent transparent transparent rgb(3, 110, 183); /* 透明 透明 透明 黄 */
}

.color3 {
  color: rgb(164, 11, 94);
  border-color: transparent transparent transparent rgb(164, 11, 94); /* 透明 透明 透明 黄 */
}

.color4 {
  color: rgb(0, 145, 58);
  border-color: transparent transparent transparent rgb(0, 145, 58); /* 透明 透明 透明 黄 */
}
</style>


