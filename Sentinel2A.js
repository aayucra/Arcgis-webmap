

// Filter by Metadata
var S2A = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
          .filterMetadata('MGRS_TILE', 'equals', '54HTG')
          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10);

          
var S2Aindx = S2A.filterMetadata('system:index', 'contains', '2025')
print(S2Aindx);

var img = ee.Image('COPERNICUS/S2_SR_HARMONIZED/20250103T004709_20250103T005558_T54HTG');
print(img);

var img12 = img.select(['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12']);
print(img12)

// ----------------------------------------------
// 1️⃣ Load image & select the bands you need
// ----------------------------------------------
var img = ee.Image('COPERNICUS/S2_SR_HARMONIZED/20250103T004709_20250103T005558_T54HTG');

          
// Keep only the relevant bands (skip B10)
var selected = img.select([
  'B1',  // 60m → resample
  'B2',  // 10m → keep
  'B3',  // 10m → keep
  'B4',  // 10m → keep
  'B5',  // 20m → resample
  'B6',  // 20m → resample
  'B7',  // 20m → resample
  'B8',  // 10m → keep
  'B8A', // 20m → resample
  'B9',  // 60m → resample
  'B11', // 20m → resample
  'B12'  // 20m → resample
]);

print('Selected bands:', selected);

// ----------------------------------------------
// 2️⃣ Resample the non-10m bands to 10m
// ----------------------------------------------

// Use B2 as 10m reference
var ref10m = selected.select('B2');

// Apply resample & reproject to force all bands to same grid
var resampled = selected
  .resample('bilinear')  // Or 'bicubic' for smoother resampling
  .reproject({
    crs: ref10m.projection()
  });

print('Resampled to 10m:', resampled);

// Area of Interest
Map.addLayer(AOI);
print(AOI)

// Convert AOI FeatureCollection to Geometry:
var AOI_geom = AOI.geometry();
Map.addLayer(AOI_geom, {color: 'red'}, 'AOI');

// Now clip with the geometry:
var resampled_Clip = resampled.clip(AOI_geom);
print(resampled_Clip);

// Visualize:
Map.addLayer(resampled_Clip, {min: 0, max: 3000, bands: ['B4','B3','B2']}, 'Resampled + Clipped');


// ----------------------------------------------
// 3️⃣ Visualize a natural color composite (B4,B3,B2)
// ----------------------------------------------
Map.centerObject(selected, 10);
Map.addLayer(resampled, {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']}, 'Resampled All Bands to 10m');