<template lang="pug">
  div#app
    a.button-back(@click="$router.go(-1)") 返回
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
@import "./assets/fonts/Guoxiang.css";

@link-color: #000000;
body {
  font-size: 10px;
}
.button-back {
  position: absolute;
  right: 0;
}
</style>
