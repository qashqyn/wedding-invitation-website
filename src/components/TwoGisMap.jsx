'use client'
import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic'; // Use dynamic for client-side rendering

// The specific data for your 2GIS widget
const widgetConfig = {
  width: 640,
  height: 600,
  borderColor: "#a3a3a3",
  pos: {
    lat: 43.17076452347651,
    lon: 76.77410781383514,
    zoom: 17
  },
  opt: { city: "almaty" },
  org: [{ id: "70000001054231911" }]
};

const TwoGisMap = () => {
  const widgetContainerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Ensure the script is loaded and the global DGWidgetLoader is available
    if (scriptLoaded && widgetContainerRef.current && typeof window.DGWidgetLoader === 'function') {
      // Clear any previous content in the container
      widgetContainerRef.current.innerHTML = '';

      // Initialize the widget inside the ref'd container
      // The DGWidgetLoader will create an iframe inside this container
      new window.DGWidgetLoader(widgetConfig).renderTo(widgetContainerRef.current);

      // No explicit cleanup needed for this type of widget as it creates an iframe
      // If you needed to remove the widget, you'd clear the innerHTML of the ref
    }
  }, [scriptLoaded]); // Re-run when scriptLoaded state changes

  return (
    <>
      {/* Load the 2GIS Widget Loader script */}
      <Script
        src="https://widgets.2gis.com/js/DGWidgetLoader.js"
        strategy="lazyOnload" // Load when browser is idle
        onLoad={() => {
          console.log('2GIS Widget script loaded');
          setScriptLoaded(true); // Indicate that the script is ready
        }}
        onError={(e) => {
          console.error('Failed to load 2GIS Widget script:', e);
        }}
      />

      {/* Container for the 2GIS widget */}
      <div ref={widgetContainerRef} style={{ width: widgetConfig.width, height: widgetConfig.height }}>
        {/* Placeholder for when JavaScript is disabled - 2GIS already provides this */}
        <noscript style={{ color: "#c00", fontSize: "16px", fontWeight: "bold" }}>
          Виджет карты использует JavaScript. Включите его в настройках вашего браузера.
        </noscript>
      </div>

      {/* Optional: Add the direct links from your original snippet if you want them */}
      {/* These links don't require the JavaScript widget to function */}
      <div style={{ marginTop: '10px' }}>
        <a className="dg-widget-link" href="http://2gis.kz/almaty/firm/70000001054231911/center/76.77410781383514,43.17076452347651/zoom/17?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=bigMap" target="_blank" rel="noopener noreferrer">Посмотреть на карте Алматы</a>
      </div>
      <div className="dg-widget-link">
        <a href="http://2gis.kz/almaty/firm/70000001054231911/photos/70000001054231911/center/76.77410781383514,43.17076452347651/zoom/17?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=photos" target="_blank" rel="noopener noreferrer">Фотографии компании</a>
      </div>
      <div className="dg-widget-link">
        <a href="http://2gis.kz/almaty/center/76.774549,43.170378/zoom/17/routeTab/rsType/bus/to/76.774549,43.170378%E2%95%A3%D0%A2%D0%BE%D0%BC%D0%B8%D1%80%D0%B8%D1%81,%20%D0%B1%D0%B0%D0%BD%D0%BA%D0%B5%D1%82%D0%BD%D1%8B%D0%B9%20%D0%B7%D0%B0%D0%BB?utm_medium=widget-source&utm_campaign=firmsonmap&utm_source=route" target="_blank" rel="noopener noreferrer">Найти проезд до Томирис, банкетный зал</a>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(TwoGisMap), { ssr: false });