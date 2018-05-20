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
@import "~iview/src/styles/index.less";

@link-color: #000000;
</style>
