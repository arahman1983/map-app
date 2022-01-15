import { useEffect, useRef, useState } from 'react';
import styles from './mapWrapper.module.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON';
// import {transform} from 'ol/proj'
// import {toStringXY} from 'ol/coordinate';
// import Modify from 'ol/interaction/Modify';
// import Draw from 'ol/interaction/Draw';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';


export default function MapWrapper (props){
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()
  const mapElement = useRef()
  const mapRef = useRef()
  mapRef.current = map

  const source = new VectorSource({
    format: new GeoJSON(),
    url: '/assets/countries.geojson',
  })

  const layer = new VectorLayer({
    source: source,
    style: function () {
      return new Style({
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'rgba(255,255,255,0.8)',
        }),
      });
    },
  })

  useEffect(() => {
    const initialFeaturesLayer = new VectorLayer({
        source
    })

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // USGS Topo
        new TileLayer({
          source: new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
          })
        }),
        initialFeaturesLayer
        
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: []
    })
    // initialMap.on('click', handleMapClick)
    
    setMap(initialMap)
    setFeaturesLayer(initialFeaturesLayer)
  }, [])


  // const handleMapClick = (event) => {
  //   const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

  //   // transform coord to EPSG 4326 standard Lat Long
  //   const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
  //   mapRef.current.addLayer(layer);
  //   // mapRef.current.addInteraction(
  //   //   // new Draw({
  //   //   //   type: 'Point',
  //   //   //   source,
  //   //   // }),
  //   //     new Modify({
  //   //       source: source,
  //   //   })
      
  //   // );
  //   // set React state
  //   setSelectedCoord( transformedCoord )
  // }

  return(
    <>
      <div ref={mapElement} className={styles.mapContainer}></div>
      <div className={styles.marker}></div>
    </>
  )
}