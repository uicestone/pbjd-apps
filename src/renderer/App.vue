<template lang="pug">
  div#app
    router-link(to="/") 返回
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

@link-color: #000000;

body {
  font-size: 10px;
}
</style>
