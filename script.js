require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/WebMap" // ✅ Add this line
  ], function (esriConfig, Map, MapView, WebMap) {

  esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurBPaKRxHIxYMqM7X_6v8ESk2CDbsUlsTWwT8a584VH5N7wadJSDivc_M4bRsWXCDHwMYtBsylInrGBIUqJTMPFOPmo6kHZvRF_Uu2ZWkR4nLLb49RkSXCFs1hM9LYBJ_OIh_r3K_7nuDl_6GPYQHu1IfhnIm1GPPVkFu63DXd5Pefb-qrbO77jkq4PSSoQ8uUwuA-Ev2wvjpssrrvWBrMSI.AT1_MQ0OO68y";

 // const map = new Map({
 //  basemap: "arcgis/topographic" // Basemap layer service
  // });

  const webmap = new WebMap({
    portalItem: {
      // autocasts as new PortalItem()
      id: "b45a89762a634a789c1ebb6d5250f2fd",
    },
  });

  const view = new MapView({
    map: webmap,
    center: [78.96, 20.59], // Longitude, Latitude
    zoom: 5, // Zoom Level
    container: "viewDiv", // Div element
  });
});


