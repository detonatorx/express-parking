ymaps.ready(init);

let cXY = null;

function init() {

  var myMap = new ymaps.Map("map", {
    center: [59.857712, 30.405143],
    zoom: 17
  });

  // var myGeoObject = new ymaps.GeoObject({
  //   // Описываем геометрию геообъекта.
  //   geometry: {
  //     // Тип геометрии - "Многоугольник".
  //     type: "Polygon",
  //     // Указываем координаты вершин многоугольника.
  //     coordinates: [
  //       // Координаты вершин внешнего контура.
  //       [
  //         [59.857712, 30.405143],
  //         [59.857712, 30.405143],
  //         [59.857712, 30.405143],
  //         [59.857712, 30.405143]
  //         // [55.70, 37.80]
  //       ]
  //       // ,
  //       // // Координаты вершин внутреннего контура.
  //       // [
  //       //   [55.75, 37.82],
  //       //   [55.75, 37.98],
  //       //   [55.65, 37.90]
  //       // ]
  //     ],
  //     // Задаем правило заливки внутренних контуров по алгоритму "nonZero".
  //     fillRule: "nonZero"
  //   },
  //   // Описываем свойства геообъекта.
  //   properties: {
  //     // Содержимое балуна.
  //     balloonContent: "Многоугольник"
  //   }
  // }, {
  //   // Описываем опции геообъекта.
  //   // Цвет заливки.
  //   fillColor: '#00FF00',
  //   // Цвет обводки.
  //   strokeColor: '#0000FF',
  //   // Общая прозрачность (как для заливки, так и для обводки).
  //   opacity: 0.5,
  //   // Ширина обводки.
  //   strokeWidth: 5,
  //   // Стиль обводки.
  //   strokeStyle: 'shortdash'
  // });

  // // Добавляем многоугольник на карту.
  // myMap.geoObjects.add(myGeoObject);



  // var myPlacemark = new ymaps.Placemark([55.8, 37.6]);
  // myMap.geoObjects.add(myPlacemark);
   
          
          // [59.857712, 30.405143]
  let list = [[[59.856796, 30.401352], 'redIcon'], [[59.857027, 30.402161], 'blueIcon'], 
              [[59.856166, 30.402076], 'redIcon'], [[59.856402, 30.402749], 'blueIcon']];
  for (el of list) {
    var myPlacemark = new ymaps.Placemark(el[0], {}, {
      preset: `islands#${el[1]}`
    });
    myMap.geoObjects.add(myPlacemark);
  }

  //=======================

  myMap.events.add('click', function (e) {
    var coords = e.get('coords');
    // Если метка уже создана – просто передвигаем ее.
    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    }
    // Если нет – создаем.
    else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
      });

    }
    fetchCoor(coords)
    getAddress(coords);
  });

  // Создание метки.
  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties
        .set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', '),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine()
        });
    });
  }

  const fetchCoor = (coords) => {

    fetch('http://localhost:3000/coord', {
      method: 'POST',
      // headers: {
      //   'Content-type': 'application/json'
      // },
      body: JSON.stringify({
        x: coords,
      })
    }).then(res => res.json()).then(res => console.log(res))

  }



}

