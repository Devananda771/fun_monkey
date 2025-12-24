import { useEffect, useState } from 'react';

interface Banana {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

interface BananaRainProps {
  isActive: boolean;
  onComplete: () => void;
}

const BananaRain = ({ isActive, onComplete }: BananaRainProps) => {
  const [bananas, setBananas] = useState<Banana[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate bananas
      const newBananas: Banana[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        rotation: Math.random() * 720 - 360,
        size: 24 + Math.random() * 24,
      }));
      setBananas(newBananas);

      // Clear after animation
      const timeout = setTimeout(() => {
        setBananas([]);
        onComplete();
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [isActive, onComplete]);

  if (!isActive || bananas.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {bananas.map((banana) => (
        <div
          key={banana.id}
          className="absolute animate-banana-fall"
          style={{
            left: `${banana.left}%`,
            top: '-50px',
            animationDelay: `${banana.delay}s`,
            animationDuration: `${banana.duration}s`,
            fontSize: `${banana.size}px`,
            '--rotation': `${banana.rotation}deg`,
          } as React.CSSProperties}
        >
          🍌
        </div>
      ))}
      
      {/* Secret message */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce-in">
        <div className="bg-card/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-2xl">
          <p className="text-lg font-bold text-primary text-center">🍌 BANANA RAIN! 🍌</p>
          <p className="text-xs text-muted-foreground text-center mt-1">You found the secret!</p>
        </div>
      </div>
    </div>
  );
};

export default BananaRain;
