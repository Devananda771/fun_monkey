import { useEffect, useState } from 'react';

const YoureDoingGreat = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showMessage = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    };

    // Show every 20 seconds
    const interval = setInterval(showMessage, 20000);
    
    // Show initially after 5 seconds
    const initialTimeout = setTimeout(showMessage, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce-in">
      <div className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl shadow-2xl">
        <p className="text-2xl md:text-3xl font-bold text-center">
          YOU'RE DOING GREAT!
        </p>
      </div>
    </div>
  );
};

export default YoureDoingGreat;
