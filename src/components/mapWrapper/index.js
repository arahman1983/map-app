import { useEffect, useRef, useState } from 'react';
import styles from './mapWrapper.module.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON';

export default function MapWrapper (props){
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()
  const mapElement = useRef()

  useEffect(() => {
    // const initalFeaturesLayer = new VectorLayer({
    //   source: new VectorSource()
    // })
    const initialFeaturesLayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: '/assets/countries.geojson',
        })
    })
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // USGS Topo
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        //   })
        // }),

        initialFeaturesLayer
        
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: []
    })
    setMap(initialMap)
    setFeaturesLayer(initialFeaturesLayer)
    // return () => {
    //   cleanup
    // }
  }, [])

  return(
    <div ref={mapElement} className={styles.mapContainer}></div>
  )
}