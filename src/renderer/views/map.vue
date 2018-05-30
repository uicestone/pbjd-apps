<template lang="pug">
  div
    Button(type="primary" @click="modal1 = true") Display dialog box
    svg(id="map" ref="map" xmlns="http://www.w3.org/2000/svg" width="700" height="800")
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
import geojson2svg from "geojson2svg";
import reproject from "reproject";
import proj4 from "proj4";
import geoJson from "@/assets/json/geo.json";
import rawJson from "@/assets/json/raw.json";

export default {
  data() {
    return {
      raw: rawJson,
      geo: geoJson,
      configs: {
        华亭镇: {
          style: `stroke:#006600; fill: #F0F8FF; stroke-width:0.5px;`
        },
        徐行镇: {
          style: `stroke:#006600; fill: #233; stroke-width:0.5px;`
        },
        南翔镇: {
          style: `stroke:#006600; fill: #456; stroke-width:0.5px;`
        },
        真新街道: {
          style: `stroke:#006600; fill: #789; stroke-width:0.5px;`
        },
        外冈镇: {
          style: `stroke:#006600; fill: #123; stroke-width:0.5px;`
        },
        江桥镇: {
          style: `stroke:#006600; fill: #987; stroke-width:0.5px;`
        },
        安亭镇: {
          style: `stroke:#006600; fill: #654; stroke-width:0.5px;`
        },
        马陆镇: {
          style: `stroke:#006600; fill: #543; stroke-width:0.5px;`
        },
        新成路街道: {
          style: `stroke:#006600; fill: #321; stroke-width:0.5px;`
        },
        嘉定镇街道: {
          style: `stroke:#006600; fill: #abc; stroke-width:0.5px;`
        },
        菊园新区管委会: {
          style: `stroke:#006600; fill: #ddd; stroke-width:0.5px;`
        },
        嘉定工业区: {
          style: `stroke:#006600; fill: #666; stroke-width:0.5px;`
        }
      },
      svgElements: [],
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
    cancel() {},
    parseSVG(s) {
      var div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + "</svg>";
      var frag = document.createDocumentFragment();
      while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
      return frag;
    }
  },
  mounted() {
    let geo = this.geo;
    geo.features.forEach(g => {
      const config = this.configs[g.properties.Name];
      if (config) {
        g.properties = { ...g.properties, ...config };
      }
    });
    var geojson3857 = reproject.reproject(
      geo,
      "EPSG:4326",
      "EPSG:3857",
      proj4.defs
    );
    var convertor = geojson2svg({
      viewportSize: { width: 800, height: 700 },
      attributes: [
        {
          property: "properties.Name",
          type: "dynamic",
          key: "name"
        },
        {
          property: "properties.style",
          type: "dynamic",
          key: "style"
        },
        {
          property: "vector-effect",
          type: "static",
          value: "non-scaling-stroke"
        }
      ],
      explode: false,
      mapExtent: {
        left: 13481300,
        right: 13508425,
        bottom: 3666700,
        top: 3697700
      }
    });
    const svgElements = convertor.convert(geojson3857);
    svgElements.forEach(svgStr => {
      let svg = this.parseSVG(svgStr);
      this.$refs.map.appendChild(svg);
    });
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
