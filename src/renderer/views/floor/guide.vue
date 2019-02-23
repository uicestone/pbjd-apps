<template lang="pug">
     div.page-floor-guide
       .floorItem.floorItem1(@click='clickFloor(1)') 一楼
       .floorItem.floorItem2(@click='clickFloor(2)') 二楼
       .floorItem.floorItem3(@click='clickFloor(3)') 三楼
       .floorItem.floorItem4(@click='clickFloor(4)') 四楼
       img.back(src="~@/assets//image/back-dark.png" @click='goBack')
       .dialog-box(v-if="dialogShow" :class='{fade:dialogShow}')
            .floorNum(:class='bgClass') {{ floorTitle }}
            .content
                .left(v-if="leftRooms.length>0")
                    ul
                        li(v-for="item in leftRooms" :key="item.id" @click="goRoomsDetail(item)")
                            span.triangle_border_right(:class='colorClass')
                            span.ellipse(:class='colorClass') {{ item.title }}
                .right(v-if="rightRooms.length>0")
                    ul
                        li(v-for="item in rightRooms" :key="item.id"  @click="goRoomsDetail(item)") 
                            
                            span.triangle_border_right(:class='colorClass')
                            span.ellipse(:class='colorClass') {{ item.number}} {{ item.title }}
            img(src="~@/assets//image/back-dark.png" @click='goBack1')
</template>
<script>
import * as request from "../../utils/request";
export default {
  data() {
    return {
      dialogShow: false,
      rooms: [],
      colorClass: "",
      leftRooms: [],
      rightRooms: []
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    goBack() {
      this.$router.push("index");
    },
    goBack1() {
      this.dialogShow = false;
    },
    getRooms() {
      request.rooms().then(res => {
        console.log(res);
        this.rooms = res;
      });
    },
    clickFloor(val) {
      this.dialogShow = true;
      this.leftRooms = [];
      this.rightRooms = [];
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
      const chooseRooms = [];
      this.rooms.forEach((e, i) => {
        if (e.floor == val) {
          chooseRooms.push(e);
        }
      });
      chooseRooms.forEach((e, i) => {
        if (chooseRooms.length < 12) {
          if (i < 5) {
            this.leftRooms.push(e);
          } else {
            this.rightRooms.push(e);
          }
        } else {
          if (i < chooseRooms.length / 2) {
            this.leftRooms.push(e);
          } else {
            this.rightRooms.push(e);
          }
        }
      });
    },
    goRoomsDetail(item) {
      console.log(item,'sitemm')
       this.$router.push({ name: "floorDetail", query: { item:item } });
    }
  }
};
</script>
<style lang="stylus" scoped>
.page-floor-guide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start !important;
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('~@/assets//image/bg-floors.png') center center no-repeat;
  background-size: cover;
}

.floorItem {
  position: absolute;
  width: 14vw;
  height: 14vw;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
  font-family: STZhongSong;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.3vw;
  cursor: pointer;
}

.floorItem1 {
  background-color: #d32c26;
  top: 20vh;
  left: 29vw;
}

.floorItem2 {
  background-color: rgb(3, 110, 183);
  top: 20vh;
  right: 29vw;
}

.back {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5vh;
  cursor: pointer;
}

.floorItem3 {
  background-color: rgb(164, 11, 94);
  bottom: 20vh;
  left: 29vw;
}

.floorItem4 {
  background-color: rgb(0, 145, 58);
  bottom: 20vh;
  right: 29vw;
}

.dialog-box {
  position: fixed;
  width: 90vw;
  height: 90vh;
  background-color: rgba(255, 255, 255, 0.8);
  top: 5vh;
  left: 5vw;
  border-radius: 5vh;

  img {
    position: absolute;
    bottom: 5vh;
    right: 5vw;
    width: 8vw;
    cursor: pointer;
  }

  .floorNum {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 8vh;
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
    font-weight: bold;
    font-family: STZhongSong;
    color: #fff;
  }

  .content {
    width: 80vw;
    height: 60vh;
    padding-top: 2vw;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5vh;
    display: flex;
    justify-content: center;

    div.left, div.right {
      // width: 50%;
      height: 100%;
        overflow-x hidden;
        overflow-y auto;
      ul {
        width: 100%;
        height: 100%;

        li {
          width: 100%;
          height: 10vh;
          display: flex;
          align-items: center;
          font-size: 2.5vw;
          font-weight: bold;
            cursor pointer;
          .triangle_border_right {
            display: block;
            width: 0;
            height: 0;
            border-width: 1.5vw 0 1.5vw 2.25vw;
            border-style: solid;
            margin-right: 1.5vw;
          }
        }
      }
    }
    
    /deep/ img {
      width: 100%
      height: auto
    }
  }
}

.color1 {
  color: #d32c26;
  border-color: transparent transparent transparent #d32c26; /* 透明 透明 透明 黄 */
}

.bgColor1 {
  background-color: #d32c26;
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

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.fade {
  animation: fade-in 1s;
}

.triangle_border_right {
  width: 4.2vw;
}
</style>


