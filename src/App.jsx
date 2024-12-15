import { useState, useEffect } from 'react';
import './App.css';
import { TableDemo } from './components/Calender';
// import TableDemo from './components/Calender.jsx';

function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isMainVisible, setMainVisible] = useState(false);

  useEffect(() => {
    // Timer for hiding splash screen
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);  // This will start fade-out effect on splash screen
    }, 3000);  // Keep splash visible for 3 seconds

    // Timer for making the main content visible
    const mainTimer = setTimeout(() => {
      setMainVisible(true);  // Main screen becomes visible after splash fade-out
    }, 3500);  // This should be a little after splash fade-out (3.5 seconds)

    // Cleanup timers
    return () => {
      clearTimeout(splashTimer);
      clearTimeout(mainTimer);
    };
  }, []);

  return (
    <>
      {isSplashVisible ? (
        <div className={`splash-screen ${isSplashVisible ? '' : 'fade-out'}`}>
          <h1 className={`${isSplashVisible ? '' : 'fade-out-text'}`}>
            <p>
              Daily task <br/>and <br/>event managment
            </p>
          </h1>
        </div>
      ) : (
        <div className={`main-screen ${isMainVisible ? 'fade-in' : ''}`}>
          <TableDemo/>
        </div>
      )}
    </>
  );
}

export default App;
