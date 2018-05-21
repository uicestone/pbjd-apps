<template lang="pug">
  div.voice-page
    div
      div 选择片段
        Select(v-model="videoSelect"  style="width:200px")
          Option(v-for="item in videoOptions" :value="item.value" :key="item.value" :label="item.label")
      video(controls)
    div.button-group
      Button(shape="circle" icon="mic-a" size="large")
      Button(shape="circle" icon="play" size="large")   
    div.upload   
      Button(size="large") 我要上传
</template>


<script>
export default {
  data() {
    return {
      videoOptions: [
        {
          value: "1",
          label: "我爱你中国"
        }
      ],
      videoSelect: ""
    };
  }
};
</script>


<style lang="stylus" scoped>
.voice-page
  display flex
  align-content center
.button-group
  display flex
  justify-content center
  flex-direction column
.upload
  display flex
  align-items center
</style>
