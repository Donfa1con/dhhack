<template>
  <div class="home">
    <div class="text">
      на словах он Лев Толстой
    </div>
    <div id="map"></div>
    <div class="text" style="top: 640px;">
      а на деле Лев Толстой
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
const ymaps = window.ymaps

export default {
  name: 'home',
  data: () => ({
    map: {},
    polygons: [],
  }),
  created() {
    // eslint-disable-next-line
    ymaps.ready(() => {
      // eslint-disable-next-line
      this.map = new ymaps.Map('map', {
        center: [59.925863, 30.297596],
        zoom: 9,
      });
      this.polygons = [new ymaps.Polygon([
        // Указываем координаты вершин многоугольника.
        [
          [59.9918981644201, 30.213391151974343], [59.990786978271895, 30.217596855709733],
          [59.98411906873506, 30.22532161767263], [59.97744980033012, 30.22789653832693],
          [59.97505537249033, 30.226866570065202], [59.96949620406973, 30.21313365990895],
          [59.96744334943163, 30.212961998532003], [59.96590362399728, 30.22034343774098],
          [59.96325170493725, 30.218626823971463], [59.961968441206376, 30.212790337155053],
          [59.96094179402215, 30.213476982662866], [59.9600006725024, 30.21055873925465],
          [59.96136956759276, 30.2016323476531], [59.96556145295854, 30.19922908837575],
          [59.96992386592128, 30.20060237939137], [59.971292346312335, 30.202147331783966],
          [59.97257524473589, 30.20060237939137], [59.97334495966222, 30.19734081322926],
          [59.976167092910546, 30.181719627926545], [59.97719326286712, 30.179659691403086],
          [59.97787735830078, 30.174509850094513], [59.981725128740176, 30.171248283932404],
          [59.98198163068699, 30.168158379147237], [59.98300761837183, 30.169531670162862],
          [59.982409129464446, 30.17210659081716], [59.98437555191994, 30.175368156979272],
          [59.98574342829046, 30.179659691403086], [59.98694027321249, 30.182921257565195],
          [59.9886499757379, 30.18446620995779], [59.989419312729555, 30.185496178219496],
          [59.989846714352946, 30.18927272851247], [59.9905305453375, 30.19098934228201],
          [59.99155626501584, 30.1903026967742], [59.992752897330365, 30.19665416772145],
          [59.991043409196396, 30.2042072683074], [59.99232553367115, 30.209185448239027],
          [59.9918981644201, 30.213391151974343],
        ],
      ],
      {
        balloonContent: 'Толстой',
      }, {
        // Фоновое изображение.
        fillImageHref: 'https://uznayvse.ru/images/celebs/2019/7/lev-tolstoy_big.jpg',
        // Тип заливки фоном.
        fillMethod: 'stretch',
        // Убираем видимость обводки.
        stroke: false,
      })]
    });
  },
  watch: {
    polygons(newVal, oldVal) {
      // delete old
      for (let i = 0; i < oldVal.length; i++) {
        this.map.geoObjects.add(oldVal[i])
      }
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
  animation: wait 1s 5s forwards;

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

@keyframes wait {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
