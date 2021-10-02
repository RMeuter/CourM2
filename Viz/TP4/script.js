var map = L.map('mapid'); //Création de la carte
map.setView([42.361145, -71.057083], 10);
L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png', { 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 17,
    minZoom: 9,
}).addTo(map);

var ratIcon = L.icon({
    iconUrl: 'data/rat.png', //Image de l’icône
    iconSize: [25,25]//Taillede l’icône en pixels
});

$.ajax({
    url: "data/rodents.geojson", //Nom du fichier à charger.
    dataType: "json",//Type du fichier à charger.
    success: function(rodents){ 
        //Le code à réaliser lors de la réceptiondu fichier se place ici.
        //Le contenu du fichier se trouvedans la variable rodents.
        var heatPoints = rodents.features.map(
            function(rat) {
                var location = rat.geometry.coordinates.reverse();
                location.push(1);
                return location;
            })
        var heat = L.heatLayer(heatPoints, { radius: 35 });
        map.addLayer(heat);
    
    }    
});


 $.ajax({
     url: "data/rodents.geojson", //Nom du fichier à charger.
     dataType: "json",//Type du fichier à charger.
     success: function(rodents){ 
         //Le code à réaliser lors de la réceptiondu fichier se place ici.
         //Le contenu du fichier se trouvedans la variable rodents.
         var ratLayer = L.geoJson(rodents, { 
             pointToLayer: function(feature,latlng){
                 var marker = L.marker(latlng,{icon: ratIcon});
                 marker.bindPopup(feature.properties.Location + " at " +  feature.properties.OPEN_DT);
                 return marker;
                }
            });
             var clusters = L.markerClusterGroup();
             clusters.addLayer(ratLayer);
             map.addLayer(clusters);
            }
        });

$.ajax({
    url: "data/neighborhoods.geojson", //Nom du fichier à charger.
    dataType: "json",//Type du fichier à charger.
    success: function(nei){ 
        //Le code à réaliser lors de la réceptiondu fichier se place ici.
        //Le contenu du fichier se trouvedans la variable rodents.
        L.geoJson(nei,
            {style: function(feature){
                var fc;
                if (feature.properties.density > 80 ) fc = "#006837";
                else if ( feature.properties.density > 40 ) fc = "#31a354";
                else if ( feature.properties.density > 20 ) fc = "#78c679";
                else if ( feature.properties.density > 10 ) fc = "#c2e699";
                else if ( feature.properties.density > 0 ) fc = "#ffffcc";
                else fc = "#f7f7f7";
                
                return { 
                    color: "#999999", //Couleur de la borduredu polygone(ici rouge)
                    weight: 1, //Epaisseurde la bordure (ici rouge)
                    fillColor: fc, //Couleur de l’intérieur du polygone(ici rouge)
                    fillOpacity: 0.6 //Opacité de l’intérieur du polygone
                };
            },
            onEachFeature: function( feature, layer ){
                layer.bindPopup("<strong>"+ feature.properties.Name +"</strong> <br/>"+ feature.properties.density + " rats par mètre carré" )
            }
        }).addTo(map);
    }
});