    require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/config",
      "esri/core/urlUtils",
      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      esriConfig,
      urlUtils
    ) {

      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
     var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";
     esriConfig.request.corsEnabledServers.push('https://rawgit.com');

      // Paste the url into a browser's address bar to download and view the attributes
      // in the CSV file. These attributes include:
      // * mag - magnitude
      // * type - earthquake or other event such as nuclear test
      // * place - location of the event
      // * time - the time of the event

        const template = {
          title: "St. Louis Crime",
          content: "{ILEADSStreet}"
        };

        const csvLayer = new CSVLayer({
          url: url,
          copyright: "St. Louis Crime",
          popupTemplate: template
        });

        var symbol = {
          type: "simple-marker", 
          size: 2,
          color: "red",
          outline: {  // autocasts as new SimpleLineSymbol()
            width: 0
          }
        };

      csvLayer.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: symbol
      };

      var map = new Map({
        basemap: "gray",
        layers: [csvLayer]
      });

      var view = new MapView({
        container: "viewDiv",
        center: [-90.2, 38.6],
        zoom: 12,
        map: map
      });

    });