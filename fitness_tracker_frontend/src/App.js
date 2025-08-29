import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MainContainer from './components/layout/MainContainer';
import AppRoutes from './routes/AppRoutes';

// PUBLIC_INTERFACE
function App() {
  /** Controls current theme; applied to <html data-theme=""> for CSS variables */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 0 }}>
        <Sidebar />
        <MainContainer>
          <AppRoutes />
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
