import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { router } from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <ThemeProvider defaultTheme="system" storageKey="socialapp-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </HelmetProvider>
  </StrictMode>
);
