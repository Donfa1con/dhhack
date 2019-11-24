<template>
  <div class="home">
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
    polygons: [],
  }),
  created() {
    ymaps.ready(() => {
      this.map = new ymaps.Map('map', {
        center: [59.925863, 30.297596],
        zoom: 11,
      });

    // var myPolygon = new ymaps.Polygon([], {}, {
    //   // Курсор в режиме добавления новых вершин.
    //   editorDrawingCursor: "crosshair",
    //   // Максимально допустимое количество вершин.
    //   editorMaxPoints: 15,
    //   // Цвет заливки.
    //   fillColor: '#00FF00',
    //   // Цвет обводки.
    //   strokeColor: '#0000FF',
    //   // Ширина обводки.
    //   strokeWidth: 5
    // });
    // // Добавляем многоугольник на карту.
    // this.map.geoObjects.add(myPolygon);
    //
    // // В режиме добавления новых вершин меняем цвет обводки многоугольника.
    // var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
    // stateMonitor.add("drawing", function (newValue) {
    // myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
    // });
    //
    // // Включаем режим редактирования с возможностью добавления новых вершин.
    // myPolygon.editor.startDrawing();
    // setInterval(() => {
    //   console.log(myPolygon.editor.geometry.getCoordinates());
    // }, 10000);

      var colors = []
      for (var i = 0; i < 20; i++) {
        colors.push(getRandomColor())
      }

      const polygons = points_cloud
      console.log(points_cloud[0]);

      var	sites = []
      for (let i = 0; i < polygons.length; i++) {
        sites.push({index: i, group: polygons[i].class, x: polygons[i].xy[0], y: polygons[i].xy[1], weight: 1, desc: polygons[i].desc, imgName: polygons[i].name}); //Math.random() % 4 + 4});
      }

      // var clippingPolygon = [[59.8917573454663, 29.864562988281236],[59.84480004673633, 29.870056152343725],[59.8060793547058, 30.11724853515623],
      // [59.75622922018841, 30.24359130859373],[59.64518338979969, 30.271057128906232],[59.66464309536815, 30.551208496093736],
      // [59.76177181429037, 30.70501708984374],[59.877953280934555, 30.54022216796873],[60.037727092930474, 30.584167480468732],
      // [60.12006574277216, 30.309509277343746],[60.06245035086033, 29.96343994140623],[59.946916096152094, 30.216125488281246],
      // [59.8834755971344, 30.183166503906225],[59.8917573454663, 29.864562988281236]]

      var clippingPolygon = [[59.981997205577024, 30.23663710044241],[59.973738036434035, 30.209171280129905],
      [59.940336160949975, 30.178272232278342],[59.910004193045665, 30.203678116067415],
      [59.87826374164886, 30.179645523293967],[59.847358240425486, 30.298125527983082],
      [59.856129465935766, 30.432593522653747],[59.92375896318132, 30.438773332224073],
      [59.967850651632816, 30.427787004099066],[60.00067686044638, 30.383079339122347],
      [59.993798259986214, 30.25673656568485],[59.981997205577024, 30.23663710044241]]


      var weightedVoronoi = d3.weightedVoronoi().clip(clippingPolygon);
      // var cells = sites.map(function(s){ return []; });	// stores, for each site, each cell's verteces


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
        polyArr.push(
          new ymaps.Placemark([cells[i].site.x, cells[i].site.y], {
              balloonContent: cells[i].site.originalObject.desc
          },{
              iconLayout: 'default#image',
              // Своё изображение иконки метки.
              iconImageHref: `${cells[i].site.originalObject.imgName}.png`,
              // Размеры метки.
              iconImageSize: [42, 42],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [0, 0]
          })
        )
      }
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
