<template lang="pug">
  div
    Button(type="primary" @click="modal1 = true") Display dialog box
    
    div(v-if="currentData.type==0")
      Modal(v-model="modal1" :title="currentData.title")
        p {{currentData.content}}    
        div.modal-footer(slot="footer")
          div.modal-footer-left
            span(@click="prev") < 上一页
            span(@click="next") 下一页 >
          div.modal-footer-right
            Button(type="text") 实时连线
            Button(type="text") 导航到此地
    div(v-if="currentData.type==1")
      Modal(v-model="modal1" :title="currentData.title" width="750")
        div.modal2-content
          img.modal2-content-left(:src="currentData.img")
          div.modal2-content-right
            p {{currentData.content}}    
            div.modal2-footer-right
              Button(type="text") 实时连线
              Button(type="text") 导航到此地
        div.modal-footer(slot="footer")
          
</template>


<script>
export default {
  data() {
    return {
      modal1: false,
      currentIndex: 0,
      datas: new Array(10).fill("").map((k, i) => ({
        type: Math.floor(Math.random() * 2),
        title: `test${i}`,
        img: "http://via.placeholder.com/100x50",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }))
    };
  },
  computed: {
    currentData() {
      return this.datas[this.currentIndex] || {};
    }
  },
  methods: {
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    },
    next() {
      if (this.currentIndex < this.datas.length - 1) {
        this.currentIndex += 1;
      }
    },
    ok() {},
    cancel() {}
  }
};
</script>

<style lang="stylus" scoped>
.modal-footer
  display flex
  justify-content space-between
  align-items center
.modal-footer-left
  width 6rem
  display flex
  justify-content space-between
.modal-footer-right
  display flex
  justify-content space-between
.modal2-content
  display flex
  justify-content space-between
.modal2-content-left
  width 60%
.modal2-content-right
  width 35%
  display flex
  flex-direction column
div.modal2-footer-right
  display flex
  justify-content flex-start
</style>
