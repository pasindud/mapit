    var app = angular.module('mapit',  ['ngMap']);
    app.controller('mainController', function($scope, $http) {
        $http.get('/data/companies.json').
        success(function(data, status, headers, config) {
            console.log(data);
            companyObj = data;
            $scope.maps = data.data;
            // initialize(data)
        }).
        error(function(data, status, headers, config) {});

        $scope.mapinfo = function  (id) {
          console.log(id);
          console.log(this);
          $scope.click = $scope.maps[this.index];
        }
    });

    var companyObj;

    function initialize(data) {
        var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(6.906401, 79.854882)
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        setMarkers(map, data);
    }

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';

        var infowindow = [];

    function setMarkers(map, data) {




        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var image = {
            url: 'images/beachflag.png',
            size: new google.maps.Size(20, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        };
        data = data.data;
        for (var i = 0; i < data.length; i++) {

            var company = data[i];

            contentString = "Company - "+company.name+"for";
            infowindow[i] = new google.maps.InfoWindow({
                content: contentString
            });

            console.log("ddd", company);
            var myLatLng = new google.maps.LatLng(company.latitude, company.longitude);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                indexPosition: i,
                title: name,
                icon: iconBase + 'schools_maps.png'
            });
            google.maps.event.addListener(marker, 'click', function() {
                console.log("marker  ", marker);
                infowindow[marker.indexPosition].open(map, marker);
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    }