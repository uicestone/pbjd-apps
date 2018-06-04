<template lang="pug">
  div.map
    //- svg(id="map" ref="map" xmlns="http://www.w3.org/2000/svg" width="700" height="800")  
    div#map
    div.menu
      li(v-if="!currentLayerData.menu && value.label !== undefined" v-for="(value, key) in layers" @click="setLayer(key,value)") {{value.label}}  
      li(v-if="currentLayerData.menu " @click="modal1 = true") 中心简介
    div(v-if="currentData.type==0")
      Modal(v-model="modal1" :title="currentData.title")
        p {{currentData.content}}    
        div.modal-footer(slot="footer")
          div.modal-footer-left
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
import geoJson from "@/assets/json/geo.json";
import rawJson from "@/assets/json/raw.json";
import L from "leaflet";
global.L = L;

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
      layers: {
        0: {
          label: "党建服务中心",
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10),
          children: {}
        },
        1: {
          label: "街镇社区党建服务中心",
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        },
        2: {
          label: "组织生活现场开放点",
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        },
        3: {
          label: "党性教育基地",
          type: "type1",
          layer: L.layerGroup([]).setZIndex(10)
        },
        4: {
          type: "type2",
          menu: {
            desc: {}
          },
          layer: L.layerGroup([]).setZIndex(10)
        }
      },
      defaultLayer: 0,
      currentLayer: "",
      customDatas: {
        华亭镇: {
          type: "type2",
          layer: 4
        },
        徐行镇: {
          style: {
            fillColor: "#000"
          }
        },
        南翔镇: {
          style: {
            fillColor: "#000"
          }
        },
        真新街道: {
          style: {
            fillColor: "#000"
          }
        },
        外冈镇: {
          style: {
            fillColor: "#000"
          }
        },
        江桥镇: {
          style: {
            fillColor: "#000"
          }
        },
        安亭镇: {
          style: {
            fillColor: "#000"
          }
        },
        马陆镇: {
          style: {
            fillColor: "#000"
          }
        },
        新成路街道: {
          style: {
            fillColor: "#000"
          }
        },
        嘉定镇街道: {
          style: {
            fillColor: "#000"
          }
        },
        菊园新区管委会: {
          style: {
            fillColor: "#000"
          }
        },
        嘉定工业区: {
          style: {
            fillColor: "#000"
          }
        }
      },
      config: {
        lat: 31.313630999999999,
        lng: 121.24348000000001,
        zoom: 10
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
    currentLayer(val) {
      const layer = this.layers[val].layer;
      this.resetLayers(this.layers);
      this.map.addLayer(layer);
    },
    switchLayer(val, prev) {}
  },
  computed: {
    currentLayerData() {
      return this.layers[this.currentLayer] || {};
    },
    currentData() {
      return this.datas[this.currentIndex] || {};
    }
  },
  methods: {
    ok() {},
    cancel() {},
    setLayer(key, value) {
      const { type } = value;
      this.resetMap();
      this.currentLayer = key;
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
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    resetHighlight(e) {
      this.geojson.resetStyle(e.target);
    },
    zoomToFeature(e, { layer }) {
      this.map.fitBounds(e.target.getBounds());
      // this.resetLayers(this.layers);
      layer && (this.currentLayer = layer);
    },
    resetMap() {
      this.map.setView(
        {
          lat: this.config.lat,
          lng: this.config.lng
        },
        this.config.zoom
      );
      this.currentLayer = 0;
    },
    resetLayers(layers) {
      Object.values(layers).forEach(obj => {
        const { layer } = obj;
        this.map.removeLayer(layer);
      });
    },
    onEachFeature(feature, layer) {
      const { Name } = feature.properties;
      const { type, layer: _layer } = this.customDatas[Name] || {};
      if (type == "type2") {
        layer.on({
          // mouseover: this.highlightFeature,
          // mouseout: this.resetHighlight,
          click: e => this.zoomToFeature(e, { layer: _layer })
        });
      }
    }
  },
  mounted() {
    let layers = Object.values(this.layers);
    let features = Object.values(this.features);
    // let Icon = L.icon({
    //   iconUrl: "a.png",
    //   iconSize: [50, 50]
    // });
    // L.marker([31.413630999999999, 121.24348000000001], {
    //   icon: Icon
    // }).addTo(this.map);
    this.geo.features.forEach(feature => {
      let coords = feature.geometry.coordinates[0];
      const [y, x] = coords[Math.floor(Math.random() * coords.length)];
      if (!Array.isArray(x) && !Array.isArray(y)) {
        let circle = L.circle([x, y], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 1,
          radius: 500
        });
        this.features.type1.addLayer(circle);
        layers[Math.floor(Math.random() * layers.length)].layer.addLayer(
          circle
        );
      }
    });

    this.map = L.map("map", {
      center: [this.config.lat, this.config.lng],
      zoom: this.config.zoom
    });
    const getColor = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.geojson = L.geoJSON(this.geo.features, {
      style: () => ({
        color: "white",
        fillColor: getColor(),
        weight: 2,
        opacity: 1,
        boxShadow: "-5px -5px 5px #888",
        className: "map-shadow"
      }),
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    this.features.type1.on("click", () => (this.modal1 = true));
    this.map.on("dblclick", () => {
      this.resetMap();
    });
    this.setLayer(this.defaultLayer, this.layers[this.defaultLayer]);
  }
};
</script>

<style lang="stylus" scoped>
.map
  height 100vh
  background url('~/static/image/sound_bg.png') no-repeat
  background-size cover
  padding 1rem 0
#map
  width 100vw
  height 100vh
  background transparent
.map-shadow
  box-shadow -5px -5px 5px #888
.menu
  position absolute
  top 50vh
  left 10vw
  z-index 10000
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