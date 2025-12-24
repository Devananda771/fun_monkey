import { useEffect, useState } from 'react';

const PurposeMessage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showMessage = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(showMessage, Math.random() * 60000 + 45000);
    
    // Show initially after some time
    const initialTimeout = setTimeout(showMessage, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="bg-card/95 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl animate-fade-in">
        <p className="text-center text-foreground font-medium">
          This website has no purpose.
        </p>
        <p className="text-center text-muted-foreground text-sm mt-1">
          Thank you for understanding.
        </p>
      </div>
    </div>
  );
};

export default PurposeMessage;
