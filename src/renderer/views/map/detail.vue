<template lang="pug">
  div.map
    //- svg(id="map" ref="map" xmlns="http://www.w3.org/2000/svg" width="700" height="800")  
    div#map
    div.menu
      li(v-if="!currentLayer && value.label !== undefined" v-for="(value, key) in OptionLayers" @click="setLayer(key,value)")
        img.menu-img(:src="currentOptionLayer == key ? value.images.select : value.images.unselect")       
      img.menu-img-detail(v-if="currentLayer " @click="modal1 = true" src="static/images/map_button_5.png")
    div(v-if="currentData.type==0")
      Modal.modal1(v-model="modal1" :title="currentData.title" )
        p.modal1-content {{currentData.content}}    
        div.modal-footer(slot="footer")
          div.modal-footer-left
          div.modal-footer-right
            div 
              img.modal-icon(src="~@/assets/image/map_icon_1.png")
              span 实时连线
            div
              img.modal-icon(src="~@/assets/image/map_icon_2.png")
              span 导航到此地
    div(v-if="currentData.type==1")
      Modal.modal2(v-model="modal1" :title="currentData.title")
        div.modal2-content
          img.modal2-content-left(:src="currentData.img")
          div.modal2-content-right
            p.modal2-content {{currentData.content}}    
            div.modal2-footer-right
              div 
                img.modal-icon(src="~@/assets/image/map_icon_1.png")
                span 实时连线
              div
                img.modal-icon(src="~@/assets/image/map_icon_2.png")
                span 导航到此地
    img.logo(src="~@/assets/image/map_title.png")
    img.back_menu(@click="back" src="~@/assets/image/map_back.png")
    
</template>


<script>
import geoJson from "@/assets/json/geo.json";
import rawJson from "@/assets/json/raw.json";
import L from "leaflet";
global.L = L;
import { EventEmitter } from "events";

export default {
  data() {
    return {
      raw: rawJson,
      geo: geoJson,
      geojson: {},
      map: {},
      features: {
        type1: L.featureGroup([]),
        type2: L.featureGroup([])
      },
      OptionLayers: {
        0: {
          label: "党建服务中心",
          images: {
            select: "static/images/map_button_1.png",
            unselect: "static/images/map_button_1a.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10),
          children: {}
        },
        1: {
          label: "街镇社区党建服务中心",
          images: {
            select: "static/images/map_button_2.png",
            unselect: "static/images/map_button_2a.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        },
        2: {
          label: "组织生活现场开放点",
          images: {
            select: "static/images/map_button_3.png",
            unselect: "static/images/map_button_3a.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        },
        3: {
          label: "党性教育基地",
          images: {
            select: "static/images/map_button_4.png",
            unselect: "static/images/map_button_4a.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        }
      },
      cachedOptionLayer: "0",
      currentOptionLayer: "",
      currentLayer: "",
      customDatas: {
        华亭镇: {
          style: {
            fillColor: "rgb(214,124,90)"
          }
        },
        徐行镇: {
          style: {
            fillColor: "rgb(218,161,118)"
          }
        },
        南翔镇: {
          style: {
            fillColor: "rgb(190,190,213)"
          }
        },
        真新街道: {
          style: {
            fillColor: "rgb(129,131,152)"
          }
        },
        外冈镇: {
          style: {
            fillColor: "rgb(246,229,177)"
          }
        },
        江桥镇: {
          style: {
            fillColor: "rgb(158,157,175)"
          }
        },
        安亭镇: {
          style: {
            fillColor: "rgb(250,203,135)"
          }
        },
        马陆镇: {
          style: {
            fillColor: "rgb(233,192,102)"
          }
        },
        新成路街道: {
          style: {
            fillColor: "rgb(121,188,112)"
          }
        },
        嘉定镇街道: {
          style: {
            fillColor: "rgb(82,161,80)"
          }
        },
        菊园新区管委会: {
          style: {
            fillColor: "rgb(235,194,162)"
          }
        },
        嘉定工业区: {
          style: {
            fillColor: "rgb(177,210,165)"
          }
        }
      },
      config: {
        lat: 31.373630999999999,
        lng: 121.14348000000001,
        zoom: 12
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
  watch: {
    currentOptionLayer(val, prev) {
      this.cachedOptionLayer = prev;
      this.resetLayers(this.OptionLayers);
      if (val) {
        const layer = this.OptionLayers[val].layer;
        this.map.addLayer(layer);
      }
    },
    currentLayer(_val) {
      if (_val) {
        for (let [key, val] of Object.entries(this.customDatas)) {
          if (key != _val) {
            this.map.removeLayer(val.layer);
          }
        }
      } else {
        Object.values(this.customDatas).forEach(data => {
          this.map.addLayer(data.layer);
        });
      }
    },
    switchLayer(val, prev) {}
  },
  computed: {
    currentOptionLayerData() {
      return this.OptionLayers[this.currentOptionLayer] || {};
    },
    currentLayerData() {
      return this.customDatas[this.currentLayer] || {};
    },
    currentData() {
      return this.datas[this.currentIndex] || {};
    }
  },
  methods: {
    ok() {},
    cancel() {},
    back() {
      if (this.currentLayer) {
        this.resetMap();
      } else {
        this.$router.go(-1);
      }
    },
    setLayer(key, value) {
      const { type } = value;
      this.resetMap();
      this.currentOptionLayer = key;
    },
    parseSVG(s) {
      var div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
      var frag = document.createDocumentFragment();
      while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
      return frag;
    },
    highlightFeature(e) {
      let layer = e.target;

      layer.setStyle({
        weight: 10,
        color: "#666",
        dashArray: "",
        fillOpacity: 1
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    resetHighlight(e) {
      this.geojson.resetStyle(e.target);
    },
    zoomToFeature(e, { Name }) {
      this.map.fitBounds(e.target.getBounds());
      // this.resetLayers(this.OptionLayers);
      this.currentOptionLayer = "";
      Name && (this.currentLayer = Name);
    },
    resetMap() {
      this.map.setView(
        {
          lat: this.config.lat,
          lng: this.config.lng
        },
        this.config.zoom
      );
      this.currentOptionLayer = this.cachedOptionLayer;
      this.currentLayer = "";
    },
    resetLayers(layers) {
      Object.values(layers).forEach(obj => {
        const { layer } = obj;
        this.map.removeLayer(layer);
      });
    },
    onEachFeature(feature, layer) {
      const { Name } = feature.properties;
      let data = this.customDatas[Name];
      if (data) {
        data.layer = layer;
        const { type } = data || {};
        // if (type == "type2") {
        layer.on({
          // mouseover: this.highlightFeature,
          // mouseout: this.resetHighlight,
          click: e => this.zoomToFeature(e, { Name })
        });
        // }
      }
    }
  },
  mounted() {
    let layers = Object.values(this.OptionLayers);
    let features = Object.values(this.features);

    let icon = L.icon({
      iconUrl: "static/images/map_marker.png",
      iconSize: [35, 50]
    });

    this.map = L.map("map", {
      center: [this.config.lat, this.config.lng],
      zoom: this.config.zoom,
      zoomControl: false,
      attributionControl: false
    });

    this.geo.features.forEach(feature => {
      let coords = feature.geometry.coordinates[0];
      const [y, x] = coords[Math.floor(Math.random() * coords.length)];
      if (!Array.isArray(x) && !Array.isArray(y)) {
        let marker = L.marker([x, y], {
          icon
        });

        this.features.type1.addLayer(marker);
        layers[Math.floor(Math.random() * layers.length)].layer.addLayer(
          marker
        );
      }
    });

    this.map.doubleClickZoom.disable();
    const getColor = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.geojson = L.geoJSON(this.geo.features, {
      style: feature => {
        let fillColor = "";
        const { Name } = feature.properties;
        let data = this.customDatas[Name];
        if (data) {
          fillColor = data.style.fillColor;
        }
        return {
          color: "white",
          fillColor,
          weight: 6,
          fillOpacity: 1,
          boxShadow: "-5px -5px 5px #888",
          className: "map-shadow"
        };
      },
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    this.features.type1.on("click", () => (this.modal1 = true));
    this.setLayer(
      this.cachedOptionLayer,
      this.OptionLayers[this.cachedOptionLayer]
    );
  }
};
</script>

<style lang="stylus">
.map
  height 100vh
  background url('~@/assets//image/map_bg.png') center center no-repeat
  background-size cover
#map
  width 100vw
  height 100vh
  background transparent
.map-shadow
  box-shadow -5px -5px 5px #888
.menu
  position absolute
  top 40vh
  left 10vw
  z-index 1000
.menu-img
  width 25vw
  margin 10px 0
.modal1
  z-index 10001
  .ivu-modal-header-inner
    font-size 1.5vw
    color rgb(211, 5, 32)
    height 20px
    display flex
    align-items center
    padding 0 0 0 10px
  .ivu-modal
    width 55vw !important
  .ivu-modal-header
    background white
    border-radius 10px 10px 0 0
  .ivu-modal-body
    background white
    border 1px solid rgba(255, 0, 0, 0.7)
  .ivu-modal-footer
    border 1px solid rgba(255, 0, 0, 0.7)
    background rgb(247, 231, 230)
    border-radius 0 0 10px 10px
  .ivu-modal-content
    background transparent
    box-shadow 0 0px 20px rgba(255, 0, 0, 0.5)
  .ivu-icon-ios-close-empty
    color red
    border-radius 2px
    border 1px solid red
    padding 0 8px
    top 0
    font-size 45px
    line-height 30px
  .modal1-content
    height 600px
    padding 3vw
    font-size 1vw
  .modal-footer
    display flex
    justify-content space-between
    align-items center
  .modal-footer-left
    width 6rem
    display flex
    justify-content space-between
  .modal-footer-right
    font-size 1vw
    display flex
    justify-content space-between
    div
      display flex
      align-items center
      padding 0 20px
.menu-img-detail
  width 15vw
.modal2
  z-index 10001
  .ivu-modal-header-inner
    font-size 1.5vw
    color rgb(211, 5, 32)
    height 20px
    display flex
    align-items center
    padding 0 0 0 10px
  .ivu-modal-header
    border 1px solid rgba(255, 0, 0, 0.7)
    background white
    border-radius 10px 10px 0 0
  .ivu-modal-body
    background white
    border-radius 0 0 10px 10px
  .ivu-modal
    width 90vw !important
    height 90vh
  .modal2-content
    height 75vh
    padding 2vw
    display flex
    justify-content space-between
    font-size 1vw
  .ivu-modal-content
    background transparent
    box-shadow 0 0px 20px rgba(255, 0, 0, 0.5)
  .modal2-content-left
    width 60%
  .modal2-content-right
    width 35%
    display flex
    flex-direction column
  .modal2-footer-right
    font-size 1.2vw
    display flex
    justify-content flex-start
    div
      padding 0 20px
      display flex
      align-items center
  .ivu-icon-ios-close-empty
    color red
    border-radius 2px
    border 1px solid red
    padding 0 8px
    top 0
    font-size 45px
    line-height 30px
  .ivu-modal-footer
    display none
.logo
  position absolute
  top 50px
  left 50px
  width 25vw
.back_menu
  position absolute
  bottom 50px
  right 50px
  width 150px
  z-index 10000
.modal-icon
  width 45px
  margin 0 10px
</style>