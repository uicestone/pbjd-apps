<template lang="pug">
  Row
    Col(span="12")
      Card(style="width:320px")    
    Col(span="12")
      p 我的座右铭
      Input(type="textarea" )
      div.capture
        p 我要拍照
        Button(icon="camera" size="large")
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.capture 
  display flex
  align-items center

</style>
