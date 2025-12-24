import { useEffect, useState } from 'react';

const FakeLoadingBar = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const showLoader = () => {
      setVisible(true);
      setProgress(0);
      
      // Progress that never completes
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress >= 87) {
          currentProgress = 87 + Math.random() * 5;
        }
        setProgress(Math.min(currentProgress, 92));
      }, 300);

      // Hide after random time
      setTimeout(() => {
        clearInterval(progressInterval);
        setVisible(false);
      }, Math.random() * 5000 + 3000);
    };

    // Show at random intervals
    const interval = setInterval(showLoader, Math.random() * 30000 + 20000);
    
    // Show initially after a bit
    const initialTimeout = setTimeout(showLoader, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
      <p className="text-xs text-muted-foreground mb-2">Loading something important...</p>
      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round(progress)}%</p>
    </div>
  );
};

export default FakeLoadingBar;
