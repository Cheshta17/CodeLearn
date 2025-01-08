// src/reportWebVitals.ts

// Import the specific functions directly from the respective modules
import { onCLS as getCLS } from 'web-vitals/src/onCLS';
import { onFID as getFID } from 'web-vitals/src/onFID';
import { onFCP as getFCP } from 'web-vitals/src/onFCP';
import { onLCP as getLCP } from 'web-vitals/src/onLCP';
import { onTTFB as getTTFB } from 'web-vitals/src/onTTFB';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);  // Callback will receive the metric data
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
