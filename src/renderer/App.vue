<template lang="pug">
  div#app
    div
      //- div.button-back(@click="$router.go(-1)") 返回
    router-view
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
// https://github.com/iview/iview/blob/2.0/src/styles/custom.less
@import "~iview/src/styles/index.less";
@import "~leaflet/dist/leaflet.css";
@import "./assets/fonts/Guoxiang.css";

@link-color: #000000;
html {
  font-size: 10px;
}
li {
  list-style-type: none;
}
// .button-back {  
//   position: absolute;
//   right: 0;
//   z-index: 10000;
// }
.ivu-select-selection {
  all: unset;
  i {
    display: none !important;
  }
}
.ivu-select {
  all: unset;
}
.ivu-select-dropdown {
  overflow: hidden !important;
}
.main-title {
  color: white;
  height: 12vh;
  width: 30vw;
  background: #de2230;
  border-bottom: 4px solid rgb(146, 35, 44);
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
}
.button-back{
  border: none;
  z-index: 10000;
  color: white;
  padding: .5vw 1.2vw;
  background: url('~/static/image/button_blue_2.png') center center no-repeat;
  background-size: cover;
  font-size: 1.6rem;
  display: flex;
  letter-spacing: 10px;
  text-indent: 10px;
  text-align: center;
  margin: 3vw auto;

}

.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  all: unset
}
</style>
