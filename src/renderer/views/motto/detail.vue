<template lang="pug">
  div.page-movie-detail
    div.main-title 我
    Row.content
      Col.motto-content(span="12")
        p.motto-preview-text {{motto}}
        p.motto-preview-name --{{name}}      
        img.motto-preview-photo(:src="photoUrl")           
      Col.form(span="12")
        div.qrcode-group
          img.qrcode-image(src="http://via.placeholder.com/400x500")
          p.qrcode-text 收藏到<br/>我的微官网
    button.button-back(@click="$router.go(-1)") 返回
    
</template>


<script>
export default {
  data() {
    return {
      currentOption: {
        url: null
      }
    };
  },
  computed: {
    motto: {
      get() {
        return this.$store.state.Motto.motto;
      }
    },
    name: {
      get() {
        return this.$store.state.Motto.name;
      }
    },
    photoUrl: {
      get() {
        return this.$store.state.Motto.photoUrl;
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.page-movie-detail {
  height: 100vh;
  background: url('~@/assets//image/sound_bg.png') no-repeat;
  background-size: cover;
  padding: 1rem 0;
}

.qrcode-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.motto-preview-photo {
  width: 16vw;
  height: 16vh;
  transform: rotate(-8deg);
  position: absolute;
  right: 3vw;
  top: 14vw;
}

.qrcode-text {
  font-weight: 600;
  font-size: 1.8vw;
  color: black;
}

.motto-preview-text {
  width: 5rem;
  font-size: 1.5rem;
  font-family: Guoxiang;
  position: absolute;
  left: 20%;
  top: 30%;
}

.motto-preview-name {
  font-size: 1rem;
  font-family: Guoxiang;
  position: absolute;
  left: 30%;
  bottom: 30%;
}

.content {
  height: 60vh;
}

.video {
  visibility: hidden;
}

.capture {
  display: flex;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 40vw;
  flex: 0;
}

.motto-preview-text {
  font-size: 1.5rem;
  font-family: Guoxiang;
}

.motto-content {
  flex: 1;
  height: 100%;
  background: url('~@/assets//image/book.png') no-repeat;
  background-size: cover;
}
</style>
