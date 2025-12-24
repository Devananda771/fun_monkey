import { useEffect, useState } from 'react';

const BananaCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random increase between 1 and 7 for no logical reason
      setCount(prev => prev + Math.floor(Math.random() * 7) + 1);
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 left-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-xl">🍌</span>
        <span className="font-mono text-sm text-foreground">
          Bananas: <span className="font-bold text-primary">{count.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
};

export default BananaCounter;
