// src/react-dom-client.d.ts
declare module 'react-dom/client' {
    import { ReactNode } from 'react';
  
    export function createRoot(container: HTMLElement): {
      render: (element: ReactNode) => void;
    };
  }
  