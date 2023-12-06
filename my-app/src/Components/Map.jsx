import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from 'axios';

mapboxgl.accessToken ='YOUR_MAPBOX_ACCESS_TOKEN';

const Map = ({ data }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-96.7);
    const [lat, setLat] = useState(37.2); 
    const [zoom, setZoom] = useState(3);
  

    useEffect(() => {
      if (!map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [lng, lat],
          zoom: zoom,
        });
  
        map.current.on('load', () => {
          axios.get('http://localhost:8080/obesity-data') 
            .then((response) => {
              const geojson = response.data; 
              map.current.addSource('obesity-data', {
                type: 'geojson',
                data: geojson,
              });
  
              map.current.addLayer({
                id: 'obesity-heatmap',
                type: 'fill',
                source: 'obesity-data',
                paint: {
                  'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'obesity'],
                    0, 'rgba(0, 255, 0, 0)', // Low obesity
                    50, 'rgba(255, 0, 0, 1)', // High obesity
                  ],
                  'fill-opacity': 0.75,
                },
              });
            })
            .catch((error) => {
              console.error('Error fetching GeoJSON data:', error);
          });
        });
      }
      map.current.on('click', 'obesity-heatmap', (e) => {
        const feature = e.features[0];
        const { name, obesity } = feature.properties;
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`<p><strong>${name}</strong></p><p>Obesity: ${obesity}</p>`)
          .addTo(map.current);
      });
  
      return () => map.current.remove();
    }, []);

      
    useEffect(() => {
      if (map.current && data && data.name) {
        axios.get('http://localhost:8080/obesity-data')
          .then((response) => {
            const features = response.data.features;
            const feature = features.find((f) => f.properties.name === data.name);
            if (feature) {
              map.current.setPaintProperty('obesity-heatmap', 'fill-color', [
                'match',
                ['get', 'name'],
                data.name,
                'rgba(0, 255, 0, 1)', // Highlight in green
                'rgba(0, 255, 0, 0)', 
              ]);
            }
          })
          .catch((error) => {
            console.error('Error fetching GeoJSON data:', error);
          });
      }
    }, [data]);

    const resetMap = () => {
      map.current.setPaintProperty('obesity-heatmap', 'fill-color', [
        'interpolate',
        ['linear'],
        ['get', 'obesity'],
        0, 'rgba(0, 255, 0, 0)',
        50, 'rgba(255, 0, 0, 1)',
      ]);
    };
    
  
    return (
      <div>
        <button onClick={resetMap}>Reset Map</button>
        <div ref={mapContainer} className="map-container" />

      </div>
    );
  };
  

export default Map