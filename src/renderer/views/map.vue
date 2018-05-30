<template lang="pug">
  div
    Button(type="primary" @click="modal1 = true") Display dialog box
    //- svg(id="map" ref="map" xmlns="http://www.w3.org/2000/svg" width="700" height="800")
    div#map
    li(v-for="(value, key) in layers" @click="currentLayer = key") {{key}}
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
        test1: L.featureGroup([])
      },
      layers: {
        test1: L.layerGroup([]).setZIndex(10),
        test2: L.layerGroup([]).setZIndex(10),
        test3: L.layerGroup([]).setZIndex(10),
        test4: L.layerGroup([]).setZIndex(10)
      },
      currentLayer: "",
      configs: {
        华亭镇: {
          points: [31.413630999999999, 121.24348000000001],
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
  watch: {
    currentLayer(val) {
      const layer = this.layers[val];
      Object.values(this.layers).forEach(layer => {
        this.map.removeLayer(layer);
      });
      this.map.addLayer(layer);
    }
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
    zoomToFeature(e) {
      this.map.fitBounds(e.target.getBounds());
    },
    onEachFeature(feature, layer) {
      // layer.on({
      //   mouseover: this.highlightFeature,
      //   mouseout: this.resetHighlight
      //   // click: this.zoomToFeature
      // });
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
        let layer = L.circle([x, y], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 1,
          radius: 500
        });

        features[Math.floor(Math.random() * features.length)].addLayer(layer);
        layers[Math.floor(Math.random() * layers.length)].addLayer(layer);
      }
    });

    this.map = L.map("map", {
      center: [31.413630999999999, 121.24348000000001],
      zoom: 10
    });
    const getColor = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.geojson = L.geoJSON(this.geo.features, {
      style: () => ({
        color: "white",
        fillColor: getColor(),
        weight: 2,
        opacity: 0.65
      }),
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
    features.forEach(feature => {
      feature.on("click", () => (this.modal1 = true));
    });
    layers.forEach(layer => {
      this.map.addLayer(layer);
    });
  }
};
</script>

<style lang="stylus" scoped>
#map
  height 100vh
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