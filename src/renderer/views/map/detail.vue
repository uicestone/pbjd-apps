<template lang="pug">
  div.map(v-bind:class="{'map-town':currentLayer}")
    div#map(ref="map")
    div.menu
      li(v-if="!currentLayer && value.label !== undefined" v-for="(value, key) in OptionLayers" @click="setLayer(key,value)")
        div.menu-img(:class="{active: currentOptionLayer == key}")
          img.icon(:src="value.icon")
          span.label {{value.label}}
      .menu-img-detail(v-if="currentLayer" @click="showTownModal")
        span.first {{ config.centerIntroText.substr(0,1) }}
        span {{ config.centerIntroText.substr(1) }}
      li(@click="currentOptionLayer = -1")
        div.menu-img(:class="{active: currentOptionLayer == -1}" style="position: relative")
          img.icon(src="~@/assets/image/icon_road.png")
          span.label 区“四史”学习教育学习路图
          div.road-panel(v-if="currentOptionLayer == -1")
            div.road-item(v-for="(road,index) in roads" :key="index" :style="{background: road.background}" @click="goRoad(road.id)")
              img.img(:src="road.img")


    div(v-if="currentModalData.id")
      Modal.modal1(v-model="modal1" :title="currentModalData.name" @on-visible-change="hideNavQrcode")
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
            div(v-if="currentModalData.liveVideoUrl" @click="playLiveVideo" :class="{glow:connectingLiveVideo}")
              img.modal-icon(src="~@/assets/image/map_icon_1.png")
              span 实时连线
            div.nav-button(@click="showNavQrcode")
              img.modal-icon(src="~@/assets/image/map_icon_2.png")
              span 导航到此地
              canvas.nav-qrcode(ref="navQrcode1" v-show="showingNavQrcode" @click="hideNavQrcode")
    div(v-if="currentModalData.id")
      Modal.modal2(v-model="modal2" :title="currentModalData.name" @on-visible-change="hideNavQrcode")
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
              div(v-if="currentModalData.liveVideoUrl" @click="playLiveVideo" :class="{glow:connectingLiveVideo}")
                img.modal-icon(src="~@/assets/image/map_icon_1.png")
                span 实时连线
              div.nav-button(@click="showNavQrcode")
                img.modal-icon(src="~@/assets/image/map_icon_2.png")
                span 导航到此地
                canvas.nav-qrcode(ref="navQrcode2" v-show="showingNavQrcode" @click="hideNavQrcode")
    img.logo(src="~@/assets/image/map_title.png" v-if="!currentLayer")
    div.town-title(v-if="currentLayer")
      div.town-name {{ currentLayer }}
      div {{ config.spotTypes[1].text }}
    video#live-video(v-show="playingLiveVideo" ref="liveVideoPlayer")
    Icon.live-video-close(type="ios-close-empty" v-if="playingLiveVideo" @click="stopLiveVideo")
    img.back_menu(@click="back" src="~@/assets/image/map_back.png")
    
</template>

<script>
import geoJson from "@/assets/json/geo.json";
// import rawJson from "@/assets/json/raw.json";
import L from "leaflet";
import * as request from "../../utils/request";
import Hls from "hls.js";
import QRCode from "qrcode";
import _ from "lodash";

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
      cachedOptionLayer: "",
      currentOptionLayer: "",
      currentHoverLayer: "",
      currentLayer: "",
      roads: [
        { img: require("../../assets/image/road_1_title.png"), background: "#a21e0a", id: "hs" },
        { img: require("../../assets/image/road_2_title.png"), background: "#ac8759", id: "fd" },
        { img: require("../../assets/image/road_3_title.png"), background: "#37569f", id: "qc" }
      ],
      customDatas: {
        华亭镇: {
          hiddenMarkerPoint: [121.302905, 31.497195],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(214,124,90)"
          }
        },
        徐行镇: {
          hiddenMarkerPoint: [121.21434799999999, 31.479182],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(218,161,118)"
          }
        },
        南翔镇: {
          hiddenMarkerPoint: [121.340947, 31.336383],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(190,190,213)"
          }
        },
        真新街道: {
          hiddenMarkerPoint: [121.36162999999999, 31.260224],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(129,131,152)"
          }
        },
        外冈镇: {
          hiddenMarkerPoint: [121.176841, 31.405644000000002],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(246,229,177)"
          }
        },
        江桥镇: {
          hiddenMarkerPoint: [121.251139, 31.294613000000002],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(158,157,175)"
          }
        },
        安亭镇: {
          hiddenMarkerPoint: [121.20115799999999, 31.336383],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(250,203,135)"
          }
        },
        马陆镇: {
          hiddenMarkerPoint: [121.308802, 31.407790000000002],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(233,192,102)"
          }
        },
        新成路街道: {
          hiddenMarkerPoint: [121.27557999999999, 31.402249],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(121,188,112)"
          }
        },
        嘉定镇街道: {
          hiddenMarkerPoint: [121.249546, 31.39321],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(82,161,80)"
          }
        },
        菊园新区: {
          hiddenMarkerPoint: [121.259914, 31.414283],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(235,194,162)"
          }
        },
        嘉定工业区: {
          hiddenMarkerPoint: [121.23277499999999, 31.371815],
          childLayer: L.layerGroup([]).setZIndex(10),
          style: {
            fillColor: "rgb(177,210,165)"
          }
        }
      },
      config: {
        lat: 31.373630999999999,
        lng: 121.14348000000001,
        zoom: 12,
        homeButtons: [],
        spotTypes: []
      },
      svgElements: [],
      modal1: false,
      modal2: false,
      currentModalIndex: 0,
      connectingLiveVideo: false,
      playingLiveVideo: false,
      showingNavQrcode: false
    };
  },
  watch: {
    currentOptionLayer(val, prev) {
      if (val == -1) return;
      this.cachedOptionLayer = prev;
      this.resetLayers(this.OptionLayers);
      if (val) {
        const layer = this.OptionLayers[val].layer;
        this.map.addLayer(layer);
      }
    },
    currentHoverLayer(_val) {
      if (_val) {
        for (let [key, val] of Object.entries(this.customDatas)) {
          if (key != _val) {
            // this.map.removeLayer(val.childLayer);
            // this.map.removeLayer(val.layer);
            val.hiddenMarker.closePopup();
          } else {
            // console.log(val)
            // this.map.addLayer(val.childLayer);
            // console.log(val.hiddenMarker)
            val.hiddenMarker.openPopup();
          }
        }
      } else {
        Object.values(this.customDatas).forEach(val => {
          val.hiddenMarker.closePopup();
        });
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
    },
    OptionLayers() {
      const optionLayers = {};
      this.config.spotTypes.forEach((type, index) => {
        if (index >= 2) return;
        optionLayers[type.text] = {
          label: type.text,
          icon: type.icon,
          type: "type1",
          buttonIndex: type.buttonIndex,
          layer: L.layerGroup([]).setZIndex(10)
        };
        if (index === 0) {
          optionLayers[type.text].children = {};
        }
      });
      return optionLayers;
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
    playLiveVideo() {
      this.connectingLiveVideo = true;
      const { liveVideoPlayer } = this.$refs;
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(this.currentModalData.liveVideoUrl);
        hls.attachMedia(liveVideoPlayer);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.playingLiveVideo = true;
          liveVideoPlayer.play();
          liveVideoPlayer.addEventListener("timeupdate", () => {
            document.dispatchEvent(new Event("videotimeupdate"));
          });
        });
      }
    },
    stopLiveVideo() {
      this.connectingLiveVideo = false;
      this.playingLiveVideo = false;
    },
    showNavQrcode() {
      if (this.showingNavQrcode) {
        this.hideNavQrcode();
        return;
      }
      const { navQrcode1, navQrcode2 } = this.$refs;
      QRCode.toCanvas(navQrcode1, `http://uri.amap.com/marker?position=${this.currentModalData.longitude},${this.currentModalData.latitude}`);
      QRCode.toCanvas(navQrcode2, `http://uri.amap.com/marker?position=${this.currentModalData.longitude},${this.currentModalData.latitude}`);
      this.showingNavQrcode = true;
    },
    hideNavQrcode() {
      this.showingNavQrcode = false;
    },
    setLayer(key) {
      this.resetMap();
      this.currentOptionLayer = key;
    },
    parseSVG(s) {
      var div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
      var frag = document.createDocumentFragment();
      while (div.firstChild.firstChild) frag.appendChild(div.firstChild.firstChild);
      return frag;
    },
    highlightFeature(e, { Name }) {
      let layer = e.target;
      this.currentHoverLayer = Name;
      // layer.setStyle({
      //   weight: 3,
      //   color: "#c44328",
      //   dashArray: "",
      //   fillOpacity: 1
      // });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    resetHighlight(e) {
      this.geojson.resetStyle(e.target);
    },
    zoomToFeature(e, { Name }) {
      this.map.fitBounds(e.target.getBounds(), { paddingTopLeft: [400, 0] });
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
          contextmenu: e => {
            this.highlightFeature(e, { Name });
          },
          // mouseout: e => {
          //   console.log(`Mouseout ${Name}.`)
          //   this.highlightFeature(e, {Name: ''});
          //   this.resetHighlight(e);
          // },
          click: e => {
            if (this.currentOptionLayer === this.config.spotTypes[1].text) this.zoomToFeature(e, { Name });
          }
        });
        // }
      }
    },
    getSpotConfig() {
      request.spotsConfig().then(res => {
        this.spotTyeps = res.spotTyeps;
      });
    },
    goRoad(id) {
      this.$router.push({
        name: "roadIndex",
        query: {
          id
        }
      });
    }
  },
  async mounted() {
    let layers = Object.values(this.OptionLayers);
    let features = Object.values(this.features);
    const defaultIcon = L.icon({
      iconUrl: "static/images/map_marker.png",
      iconSize: [35, 50],
      iconAnchor: [17, 45]
    });

    const cameraIcon = L.icon({
      iconUrl: "static/images/map_marker_video.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const mapConfig = await request.getMapConfig();

    Object.assign(this.config, mapConfig);

    this.cachedOptionLayer = this.config.spotTypes[0].text;

    this.map = L.map("map", {
      center: [this.config.lat, this.config.lng],
      zoom: this.config.zoom,
      zoomControl: false,
      attributionControl: false,
      doubleClickZoom: false,
      dragging: false
    });

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
          weight: 3,
          fillOpacity: 0.7
        };
      },
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    this.features.type1.on("click", () => (this.modal1 = true));
    this.setLayer(this.cachedOptionLayer);

    let _spots;
    _spots = await request.getSpots();
    _spots.forEach(spot => {
      const { id, town, type, latitude, longitude, name, images, live, liveVideoUrl } = spot;
      this.spots[id] = spot;
      const icon = liveVideoUrl ? cameraIcon : defaultIcon;

      let marker = L.marker([latitude, longitude], { icon });
      marker.on("click", () => {
        this.showModal(id);
      });
      if (type == "服务中心" && !town) {
        _.find(this.OptionLayers, { buttonIndex: 1 }).layer.addLayer(marker);
      } else if (type == "服务中心" && town) {
        let customData = this.customDatas[town];
        customData.spotId = id;

        _.find(this.OptionLayers, { buttonIndex: 2 }).layer.addLayer(marker);
      } else if (this.OptionLayers[type]) {
        this.OptionLayers[type].layer.addLayer(marker);
      } else {
        let customData = this.customDatas[town];
        if (customData) {
          customData.childLayer.addLayer(marker);
        }
      }
    });

    for (let [key, val] of Object.entries(this.customDatas)) {
      const { hiddenMarkerPoint } = val;
      const [a, b] = hiddenMarkerPoint;

      let hiddenMarker = L.circle([b, a], {
        color: "transparent",
        fillColor: "transparent",
        fillOpacity: 0.1,
        radius: 1
      }).addTo(this.map);
      hiddenMarker.bindPopup(key, {
        closeButton: false
      });
      hiddenMarker.addTo(this.map);
      val.hiddenMarker = hiddenMarker;
    }

    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `<filter id="shadow" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="50" dy="30" />
      <feColorMatrix result="matrixOut" in="offOut" type="matrix"
      values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>`;
    document.querySelector(".leaflet-zoom-animated").prepend(defs);

    // for (let [key, val] of Object.entries(this.customDatas)) {
    //   this.map.addLayer(val.childLayer);
    // }
    // L.circle([this.config.lat, this.config.lng], {
    //   color: "red",
    //   fillColor: "#f03",
    //   fillOpacity: 0.5,
    //   radius: 100
    // }).addTo(this.map);
    //  L.marker([this.config.lat, this.config.lng], { icon }).addTo(this.map);

    this.getSpotConfig();
  }
};
</script>

<style lang="stylus">
.map
  height 100vh
  background url('~@/assets//image/map_bg.png') center center no-repeat
  background-size cover
  &.map-town
    background url('~@/assets//image/map_town_bg.png') center center no-repeat
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
.popup
  color red
.menu-img
  font-family Dasong
  font-weight bold
  width 40vw
  margin 1.2vw 0
  background url('~@/assets//image/map_spot_type_btn_bg.png') no-repeat
  height 5vw
  background-size contain
  &.active
    background url('~@/assets//image/map_spot_type_btn_bg_a.png') no-repeat
    background-size contain
    .label
      color #c44328
    .icon
      filter grayscale(100%) brightness(20)
  .icon
    width 2.5vw
    height 2.5vw
    object-fit contain
    margin-left 1vw
    margin-top 1.1vw
  .label
    color white
    display inline-block
    font-size 1.8vw
    font-weight bold
    margin-left 1.7vw
    position relative
    top -0.5vw
  .road-panel
    position absolute
    background white
    border-radius 2px
    box-shadow 2px 2px 20px 5px #999
    top -7vw
    right -12vw
    padding 0px 10px 10px 10px
    .road-item
      height 5vw
      width 20vw
      display flex
      justify-content flex-end
      align-items center
      padding-right 20px
      margin-top 15px
      .img
        height 4vw
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
    font-family Dasong
  .ivu-modal
    width 55vw !important
    margin-right 5vw
    margin-top 5vh
  .ivu-modal-close
    top 14px
    z-index 2
  .ivu-modal-header
    border-bottom 3px solid #94251f
    background #fff
    border-radius 10px 10px 0 0
    position relative
    z-index 1
    box-shadow 0 1px 10px rgba(51, 17, 9, 0.7)
  .ivu-modal-body
    background white
    border 1px solid rgba(255, 0, 0, 0.7)
    position relative
    z-index 1
    box-shadow 0 1px 10px rgba(51, 17, 9, 0.7)
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
      table
        width 100%
        td
          border 1px #ccc solid
          padding 0.1vw 0.8vw
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
  width 30vw
  height 13vw
  margin-top 1vw
  margin-left 1vw
  background url('~@/assets//image/map_button_5.png') no-repeat
  background-size contain
  padding-left 4vw
  padding-top 4vw
  font-size 3.3vw
  font-weight bold
  font-family Dasong
  color white
  .first
    margin-right 2.2vw
    color #d43616
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
    font-family Dasong
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
    object-fit cover
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
    table
      width 100%
      td
        border 1px #ccc solid
        padding 0.1vw 0.8vw
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
.town-title
  height 163px
  left 0
  top 60px
  position absolute
  background url('~@/assets//image/town_title_bg.png') no-repeat
  background-size contain
  font-size 60px
  font-family Dasong
  color #c44328
  padding-left 70px
  line-height 1.2
  padding-top 10px
  .town-name
    font-weight bold
.modal-icon
  width 55px
  margin 0 10px
.leaflet-popup-tip
  width 10px
.leaflet-popup-content-wrapper
  border-radius 5px
  box-shadow 0.5vw 0.5vw 1vw rgba(127, 0, 0, 0.4)
.leaflet-popup-content
  margin 6px
  text-align center
  color #c44328
  font-weight 600
  width auto !important
  height 1.8vw
  font-size 1.3vw
  white-space nowrap
  padding 0 0.5vw
div.leaflet-overlay-pane svg > g
  filter url('#shadow')
#live-video
  position absolute
  top 0
  left 0
  width 100vw
  height 100vh
  z-index 1010
.live-video-close
  font-size 5vw
  color white
  position absolute
  left 96.5vw
  top 0
  z-index 1011
  text-shadow 0.1vw 0.1vw 0.3vw black
.nav-button
  position relative
  .nav-qrcode
    background black
    width 15vw !important
    height 15vw !important
    position absolute
    bottom 6vh
    box-shadow 0.1vw 0.1vw 1vw grey
    border-radius 1vw
    z-index 1
@keyframes glow
  0%
    opacity 1
  50%
    opacity 0.5
  100%
    opacity 1
.glow
  animation glow 1s ease-in-out infinite
</style>
