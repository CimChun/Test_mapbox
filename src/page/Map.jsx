import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

const mapboxToken =
  "pk.eyJ1IjoiY2ltY2h1biIsImEiOiJjbTQ5cWx2ajEwY2IyMnJzaHQ3dzR3eHIwIn0.QspWXhMZORM9kw7sdbMfPQ";

const Map = () => {
  const mapContainer = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/cimchun/cm49vd79v018y01sidjo7hx6x",
      center: [106.7326, 10.732237],
      zoom: 14,
    });

    setMap(newMap);

    newMap.on("load", () => {
      newMap.addSource("img_image", {
        type: "image",
        url: "/screenshot-427-16254921421081160800647.jpg",
        coordinates: [
          [106.69, 10.755],
          [106.78, 10.755],
          [106.78, 10.67],
          [106.69, 10.67],
        ],
      });
      newMap.addLayer({
        id: "img_layer",
        source: "img_image",
        type: "raster",
        paint: { "raster-opacity": opacity / 100 },
      });
    });

    return () => {
      newMap.remove();
    };
  }, []);

  const handleOpacityChange = (e) => {
    const newOpacity = parseFloat(e.target.value);
    setOpacity(newOpacity);
    if (map)
      map.setPaintProperty("img_layer", "raster-opacity", newOpacity / 100);
  };

  return (
    <div id="map-container">
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />
      <div id="opacity-slider">
        <label htmlFor="slider">
          Độ mờ của bản đồ: <br />
          {opacity}%
        </label>
        <input
          id="slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={opacity}
          onChange={handleOpacityChange}
        />
      </div>
    </div>
  );
};

export default Map;
