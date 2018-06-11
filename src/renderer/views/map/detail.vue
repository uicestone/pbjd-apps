<template lang="pug">
  div.map
    div#map
    div.menu
      li(v-if="!currentLayer && value.label !== undefined" v-for="(value, key) in OptionLayers" @click="setLayer(key,value)")
        img.menu-img(:src="currentOptionLayer == key ? value.images.select : value.images.unselect")       
      img.menu-img-detail(v-if="currentLayer " @click="showTownModal" src="static/images/map_button_5.png")
    div(v-if="currentModalData.id")
      Modal.modal1(v-model="modal1" :title="currentModalData.name" )
        div.modal1-content
          div.desc-container
            div.desc(v-html="currentModalData.desc") 
            div.contact
              p 联系人：{{currentModalData.contact}}
              p 地址：{{currentModalData.address}}
              p 联系电话：{{currentModalData.phone}}
            
            
        div.modal-footer(slot="footer")
          div.modal-footer-left
          div.modal-footer-right
            div 
              img.modal-icon(src="~@/assets/image/map_icon_1.png")
              span 实时连线
            div
              img.modal-icon(src="~@/assets/image/map_icon_2.png")
              span 导航到此地
    div(v-if="currentModalData.id")
      Modal.modal2(v-model="modal2" :title="currentModalData.name")
        div.modal2-content
          img.modal2-content-left(:src="currentModalData.images[0]")
          div.modal2-content-right
            div.desc-container
              div.desc(v-html="currentModalData.desc") 
              div.contact
                p 联系人：{{currentModalData.contact}}
                p 地址：{{currentModalData.address}}
                p 联系电话：{{currentModalData.phone}}  
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
// import rawJson from "@/assets/json/raw.json";
import L from "leaflet";
import * as request from "../../utils/request";
import { TSPropertySignature } from "babel-types";
global.L = L;

export default {
  data() {
    return {
      // raw: rawJson,
      geo: geoJson,
      geojson: {},
      map: {},
      spots: {},
      features: {
        type1: L.featureGroup([]),
        type2: L.featureGroup([])
      },
      OptionLayers: {
        区党建服务中心: {
          label: "区党建服务中心",
          images: {
            select: "static/images/map_button_1a.png",
            unselect: "static/images/map_button_1.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10),
          children: {}
        },
        街镇社区党建服务中心: {
          label: "街镇社区党建服务中心",
          images: {
            select: "static/images/map_button_2a.png",
            unselect: "static/images/map_button_2.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        },
        组织生活现场开放点: {
          label: "组织生活现场开放点",
          images: {
            select: "static/images/map_button_3a.png",
            unselect: "static/images/map_button_3.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        },
        党性教育基地: {
          label: "党性教育基地",
          images: {
            select: "static/images/map_button_4a.png",
            unselect: "static/images/map_button_4.png"
          },
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        }
      },
      cachedOptionLayer: "区党建服务中心",
      currentOptionLayer: "",
      currentLayer: "",
      customDatas: {
        华亭镇: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(214,124,90)"
          }
        },
        徐行镇: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(218,161,118)"
          }
        },
        南翔镇: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(190,190,213)"
          }
        },
        真新街道: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(129,131,152)"
          }
        },
        外冈镇: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(246,229,177)"
          }
        },
        江桥镇: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(158,157,175)"
          }
        },
        安亭镇: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(250,203,135)"
          }
        },
        马陆镇: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(233,192,102)"
          }
        },
        新成路街道: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(121,188,112)"
          }
        },
        嘉定镇街道: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(82,161,80)"
          }
        },
        菊园新区: {
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(235,194,162)"
          }
        },
        嘉定工业区: {
          childLayer: L.layerGroup([]).setZIndex(10),
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
      modal2: false,
      currentModalIndex: 0
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
            this.map.removeLayer(val.childLayer);
            this.map.removeLayer(val.layer);
          } else {
            this.map.addLayer(val.childLayer);
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
    currentModalData() {
      return this.spots[this.currentModalIndex] || {};
    }
  },
  methods: {
    showTownModal() {
      let customdata = this.customDatas[this.currentLayer];
      const { spotId } = customdata;
      this.showModal(spotId);
    },
    back() {
      if (this.currentLayer) {
        this.resetMap();
      } else {
        this.$router.go(-1);
      }
    },
    showModal(id) {
      this.currentModalIndex = id;
      const spot = this.spots[id];
      const { images } = spot;
      if (images && images.length > 0) {
        this.modal2 = true;
      } else {
        this.modal1 = true;
      }
    },
    setLayer(key) {
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

      for (let [key, val] of Object.entries(this.customDatas)) {
        this.map.removeLayer(val.childLayer);
      }
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
  async mounted() {
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
    this.setLayer(this.cachedOptionLayer);

    let _spots = await request.getSpots();
    if (!Array.isArray(_spots) || _spots.length == 0) {
      _spots = JSON.parse(localStorage.getItem("_spots"));
    } else {
      localStorage.setItem("_spots", JSON.stringify(_spots));
    }

    _spots.forEach(spot => {
      const { id, town, type, latitude, longitude, name, images } = spot;
      this.spots[id] = spot;

      let marker = L.marker([latitude, longitude], { icon });
      marker.on("click", () => {
        this.showModal(id);
      });
      if (type == "服务中心" && !town) {
        this.OptionLayers["区党建服务中心"].layer.addLayer(marker);
      }
      if (type == "服务中心" && town) {
        let customData = this.customDatas[town];
        customData.spotId = id;
        this.OptionLayers["街镇社区党建服务中心"].layer.addLayer(marker);
      }
      if (type == "组织生活现场开放点") {
        this.OptionLayers["组织生活现场开放点"].layer.addLayer(marker);
      }
      if (type == "党性教育基地") {
        this.OptionLayers["党性教育基地"].layer.addLayer(marker);
      }
      if (type == "服务站") {
        let customData = this.customDatas[town];
        if (customData) {
          customData.childLayer.addLayer(marker);
        }
      }
    });

    // for (let [key, val] of Object.entries(this.customDatas)) {
    //   this.map.addLayer(val.childLayer);
    // }
    // L.circle([31.343661, 121.239589], {
    //   color: "red",
    //   fillColor: "#f03",
    //   fillOpacity: 0.5,
    //   radius: 1000
    // }).addTo(this.map);
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
  left 8vw
  z-index 1000
.menu-img
  width 29vw
  margin 10px 0
.modal1
  z-index 10001
  .ivu-modal-header-inner
    font-size 2.2vw
    color #c14328
    height 5vh
    display flex
    align-items center
    padding 0 0 0 10px
    line-height 40px
    font-family STZhongSong
  .ivu-modal
    width 55vw !important
    margin-right 5vw
    margin-top 5vh
  .ivu-modal-close
    top 14px
    z-index 1
  .ivu-modal-header
    border-bottom 3px solid #94251f
    background #fff
    border-radius 10px 10px 0 0
    position relative
    z-index 0
    box-shadow 0 1px 10px rgba(51, 17, 9, 0.7)
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
    color #b80000
    border-radius 2px
    border 1px solid #b80000
    padding 0 8px
    top 0
    font-size 85px
    line-height 50px
    width 50px
    height 50px
    text-align center
  .desc-container
    .desc
      min-height 100px
      font-size 1.5vw
      line-height 1.8
      font-weight 500
      color #515253
      p
        text-indent 2em
    .contact
      font-size 1.4vw
      font-weight normal
      line-height 50px
      margin-top 2vh
  .modal1-content
    height 500px
    padding 2vw
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
    font-size 1.4vw
    display flex
    justify-content space-between
    div
      display flex
      align-items center
      padding 0 20px
.menu-img-detail
  width 24vw
  margin-top 6.8vh
  margin-left 1.2vw
.modal2
  z-index 10001
  .ivu-modal-header-inner
    font-size 2.2vw
    color #c14328
    height 5vh
    display flex
    align-items center
    padding 0 0 0 10px
    line-height 40px
    font-family STZhongSong
  .ivu-modal-close
    top 14px
    z-index 1
  .ivu-modal-header
    border-bottom 3px solid #94251f
    background #fff
    border-radius 10px 10px 0 0
    position relative
    z-index 0
    box-shadow 0 1px 10px rgba(51, 17, 9, 0.7)
  .ivu-modal-body
    background white
    border-radius 0 0 10px 10px
  .ivu-modal
    width 88vw !important
  .modal2-content
    height 74vh
    padding 2vw
    display flex
    justify-content space-between
    font-size 1vw
  .ivu-modal-content
    background transparent
    box-shadow 0 0 15px 3px rgba(183, 25, 25, 0.5)
  .modal2-content-left
    width 60%
  .desc-container
    max-height 61vh
    overflow-y scroll
  .desc
    min-height 100px
    font-size 1.5vw
    line-height 1.8
    font-weight 500
    color #515253
    p
      text-indent 2em
  .contact
    font-size 1.4vw
    font-weight normal
    line-height 50px
    margin-top 2vh
  .modal2-content-right
    width 35%
    display flex
    flex-direction column
    justify-content space-between
  .modal2-footer-right
    font-size 1.4vw
    display flex
    justify-content flex-start
    div
      padding 0 20px 0 0
      display flex
      align-items center
  .ivu-icon-ios-close-empty
    color #b80000
    border-radius 2px
    border 1px solid #b80000
    padding 0 8px
    top 0
    font-size 85px
    line-height 50px
    width 50px
    height 50px
    text-align center
  .ivu-modal-footer
    display none
.logo
  position absolute
  top 2vh
  left 3vw
  width 29vw
.back_menu
  position absolute
  bottom 50px
  right 50px
  width 150px
  z-index 1
.modal-icon
  width 55px
  margin 0 10px
</style>