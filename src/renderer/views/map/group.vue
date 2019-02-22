<template lang="pug">
     div.page-map-group
        ul
          li(v-for="item in Organizations" :key="item.id" @click="goGroupList(item)")
            img(src="~@/assets//image/organization-icon.png")
            span.shoushu {{ item.title }}
          
        img.back(src="~@/assets//image/back-light.png" @click='goBack')
</template>
<script>
import * as request from "../../utils/request";
export default {
    data() {
        return {
            Organizations:[]
        }
    },
    mounted() {
        this.getOrganizations();
    },
    methods:{
        goBack() {
            this.$router.push("index")
        },
        getOrganizations() {
            request.organizations().then(res => {
                console.log(res);
                this.Organizations = res;
            })
        },
        goGroupList(item) {
            this.$router.push({ name: "mapGroupList", query: { item:item } });
        }
    }
}
</script>
<style lang="stylus" scoped>
.page-map-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start !important;
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('~@/assets//image/bg-organizations.png') center center no-repeat;
  background-size: cover;
  padding: 0 5vw;
  position relative;
}

ul {
    width: 90vw;
    height: 90vh;
    overflow : auto;
    li {
        float left;
        width : 28vw;
        height : 30vh;
        display :flex;
        align-items center;
        img {
            margin-right:20px;
        }
        cursor pointer
    }
}

.back {
    position absolute;
    left 50%;
    transform translateX(-50%);
    bottom 5vh;
    cursor pointer;
}
.shoushu {
    font-family:shoushu;
    color:#fff;
    font-size:60px;
}


</style>


