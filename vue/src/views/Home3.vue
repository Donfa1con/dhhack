<template>
  <div class="home">
    <svg>
      <defs>
        <clipPath id="clipper">
          <rect x="0" y="0" width="960" height="500" />
        </clipPath>
      </defs>
      <g id="drawing-area">
        <g id="cell-container"></g>
        <g id="site-container"></g>
      </g>
    </svg>
    <div class="text">
      на словах он Лев Толстой
    </div>
    <div id="map"></div>
    <div class="text" style="top: 640px;">
      а на деле Лев Толстой
    </div>
    <!-- <img :src="'танцы'+'.png'" alt=""> -->
  </div>
</template>

<script>
/* eslint-disable */
// import points_cloud from '@/assets/points_cloud (1).json';
import points_cloud from '@/assets/points_cloud_9.json';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color+'80';
}


var duration = 250;
var _2PI = 2*Math.PI;

//begin: layout conf.
var totalHeight = 500,
    controlsHeight = 30,
    svgRadius = (totalHeight-controlsHeight)/2,
    svgbw = 1, //svg border width
    svgHeight = 2*svgRadius,
    svgWidth = 2*svgRadius,
    radius = svgRadius-svgbw,
    width = 2*svgRadius,
    height = 2*svgRadius,
    halfRadius = radius/2,
    halfWidth = halfRadius,
    halfHeight = halfRadius,
    quarterRadius = radius/4,
    quarterWidth = quarterRadius,
    quarterHeight = quarterRadius;
//end: layout conf.

//begin: voronoi stuff definitions
var siteCount = 120,
    quarterSiteCount = siteCount/4;
var blueSites = [],
    greenSites = [];
var baseWeight = 10000,
    x, y;


const ymaps = window.ymaps

export default {
  name: 'home',
  data: () => ({
    map: {},
    objectManager: {},
    polygons: [],
  }),
  created() {
    var colors = []
    for (var i = 0; i < 20; i++) {
      colors.push(getRandomColor())
    }

    ymaps.ready(() => {
      this.map = new ymaps.Map('map', {
        center: [59.925863, 30.297596],
        zoom: 9,
      });

      this.objectManager = new ymaps.ObjectManager({
          // Чтобы метки начали кластеризоваться, выставляем опцию.
          clusterize: true,
          // ObjectManager принимает те же опции, что и кластеризатор.
          gridSize: 32,
          clusterDisableClickZoom: true
      });

      // Чтобы задать опции одиночным объектам и кластерам,
      // обратимся к дочерним коллекциям ObjectManager.
      this.objectManager.objects.options.set('preset', 'default#image');
      this.objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
      this.map.geoObjects.add(this.objectManager);

      const polygons = points_cloud
      console.log(points_cloud[0]);

      var	sites = []
      for (let i = 0; i < polygons.length; i++) {
        sites.push({index: i, group: polygons[i].class, x: polygons[i].xy[0], y: polygons[i].xy[1], weight: 1, desc: polygons[i].desc, imgName: polygons[i].name}); //Math.random() % 4 + 4});
      }

      var clippingPolygon = [[59.8917573454663, 29.864562988281236],[59.84480004673633, 29.870056152343725],[59.8060793547058, 30.11724853515623],
      [59.75622922018841, 30.24359130859373],[59.64518338979969, 30.271057128906232],[59.66464309536815, 30.551208496093736],
      [59.76177181429037, 30.70501708984374],[59.877953280934555, 30.54022216796873],[60.037727092930474, 30.584167480468732],
      [60.12006574277216, 30.309509277343746],[60.06245035086033, 29.96343994140623],[59.946916096152094, 30.216125488281246],
      [59.8834755971344, 30.183166503906225],[59.8917573454663, 29.864562988281236]]
      // var clippingPolygon = [[0,0], [0,height], [width,height], [width,0]];
      var weightedVoronoi = d3.weightedVoronoi().clip(clippingPolygon);
      // var cells = sites.map(function(s){ return []; });	// stores, for each site, each cell's verteces


      var objForObjMan = {
        type: "FeatureCollection",
        features: []
      }


      var cells = weightedVoronoi(sites);
      var polyArr = []
      for (var i = 0; i < cells.length; i++) {
        polyArr.push(new ymaps.Polygon([cells[i]], {
            balloonContent: cells[i].site.originalObject ? cells[i].site.originalObject.desc : i,
          }, {
            // Фоновое изображение.
            fillColor: colors[cells[i].site.originalObject.group],
            // fillImageHref: 'https://uznayvse.ru/images/celebs/2019/7/lev-tolstoy_big.jpg',
            // Тип заливки фоном.
            fillMethod: 'clip',
            // Убираем видимость обводки.
            stroke: false,
          })
        )
        // polyArr.push(new ymaps.Placemark([cells[i].site.x, cells[i].site.y], {
        //     balloonContent: cells[i].site.originalObject.desc
        // }, {
        //     preset: 'islands#icon',
        //     iconColor: '#0095b6'
        // }))

        objForObjMan.features.push(
          {
            type: "Feature",
            id: i,
            geometry: {
              type: "Point",
              coordinates: [cells[i].site.x, cells[i].site.y]
            },
            properties: {
              balloonContent: cells[i].site.originalObject.desc,
              iconLayout: 'default#image',
              iconImageHref: `${cells[i].site.originalObject.imgName}.png`,
              iconImageSize: [42, 42],
              iconImageOffset: [0, 0]
            }
          })
        }


        this.objectManager.add(objForObjMan)


        console.log(cells[1]);
        this.polygons = polyArr
        // console.log(polyArr);
      })

  },
  watch: {
    polygons(newVal, oldVal) {
      // delete old
      // try {
      //   this.map.geoObjects.removeAll()
      // } catch (e) {
      //
      // }
      // for (let i = 0; i < oldVal.length; i++) {
      //   this.map.geoObjects.remove(oldVal[i])
      // }


      // add new
      for (let i = 0; i < newVal.length; i++) {
        this.map.geoObjects.add(newVal[i])
      }
    },
  },
};
</script>

<style lang="scss">
#map {
  width: 800px;
  height: 500px;
  display: block;
  position: absolute;
  left: calc(50% - 400px);
  top: calc(360px - 250px);
  filter: hue-rotate(45deg);
  opacity: 0;
  animation: wait 1s 0s forwards;

  @media (max-width: 400px) {
    height: 440px;
    top: 160px;
    left: 10vw;
    width: 80vw;
  }
}

.text {
  position: absolute;
  left: 0;
  width: 100vw;
  font-size: 6vw;
  color: white;
  font-weight: 900;
  text-shadow: 2px 0px 2px black,
    0px 2px 2px black,
    0px -2px 2px black,
    -2px -0px 2px black;

  @media (max-width: 400px) {
    font-size: 12.5vw;
  }
}


svg {
  position: absolute;
  top: 25px;
  left: 15px;
  margin: 1px;
  border-radius: 1000px;
  box-shadow: 2px 2px 6px grey;
}


#site-container {
  clip-path: url("#clipper");
}
.seed {
  fill: steelblue;
}
.seed.group-green {
  fill: lightgreen;
}
.seed.hide {
  display: none;
}


.cell {
  fill-opacity: 0.1;
  fill: lightsteelBlue;
  stroke: lightsteelBlue;
}
.cell.group-green {
  fill: lightgreen;
  stroke: lightgreen;
}

@keyframes wait {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
