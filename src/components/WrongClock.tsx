import { useEffect, useState } from 'react';

const WrongClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateWrongTime = () => {
      const now = new Date();
      // Add random hours and minutes to make it wrong
      const wrongHours = (now.getHours() + Math.floor(Math.random() * 12) + 3) % 24;
      const wrongMinutes = (now.getMinutes() + Math.floor(Math.random() * 30) + 17) % 60;
      const wrongSeconds = Math.floor(Math.random() * 60);
      
      setTime(
        `${wrongHours.toString().padStart(2, '0')}:${wrongMinutes.toString().padStart(2, '0')}:${wrongSeconds.toString().padStart(2, '0')}`
      );
    };

    updateWrongTime();
    const interval = setInterval(updateWrongTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-xl">🕐</span>
        <span className="font-mono text-sm text-foreground">{time}</span>
      </div>
    </div>
  );
};

export default WrongClock;
