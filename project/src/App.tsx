import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Dashboard } from './components/dashboard/Dashboard';
import { useTheme } from './hooks/useTheme';
import { OnboardingData } from './types';
import { isOnboardingComplete, getOnboardingData } from './utils/storage';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Check if onboarding is complete
    if (isOnboardingComplete()) {
      const data = getOnboardingData() as OnboardingData;
      setOnboardingData(data);
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setShowOnboarding(false);
  };

  const handleRestartOnboarding = () => {
    setOnboardingData(null);
    setShowOnboarding(true);
  };

  if (showOnboarding) {
    return (
      <>
        <OnboardingWizard onComplete={handleOnboardingComplete} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
      </>
    );
  }

  return (
    <>
      {onboardingData && (
        <Dashboard 
          data={onboardingData} 
          onRestart={handleRestartOnboarding}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
}

export default App;