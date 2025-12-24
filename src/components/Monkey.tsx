import { useState, useEffect, useRef } from 'react';
import monkeyImage from '@/assets/monkey.png';

type MonkeyState = 'idle' | 'jumping' | 'scratching' | 'clapping' | 'yawning' | 'eating' | 'rolling' | 'staring' | 'shocked' | 'dancing' | 'waving';

interface MonkeyProps {
  state: MonkeyState;
  eyeOffset: { x: number; y: number };
  isZoomedIn: boolean;
}

const Monkey = ({ state, eyeOffset, isZoomedIn }: MonkeyProps) => {
  const getAnimationClass = () => {
    switch (state) {
      case 'jumping':
        return 'animate-bounce';
      case 'scratching':
        return 'animate-wiggle';
      case 'clapping':
        return 'animate-clap';
      case 'yawning':
        return 'animate-yawn';
      case 'eating':
        return 'animate-munch';
      case 'rolling':
        return 'animate-roll';
      case 'staring':
        return 'animate-stare';
      case 'shocked':
        return 'animate-shock';
      case 'dancing':
        return 'animate-dance';
      case 'waving':
        return 'animate-wave';
      default:
        return 'animate-breathe';
    }
  };

  return (
    <div 
      className={`relative transition-all duration-500 ${isZoomedIn ? 'scale-[2]' : 'scale-100'}`}
    >
      {/* Monkey body */}
      <div className={`relative ${getAnimationClass()}`}>
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-accent shadow-2xl">
          <img 
            src={monkeyImage} 
            alt="Cute monkey companion"
            className="w-full h-full object-cover scale-125"
          />
        </div>
        
        {/* Eyes overlay that track cursor */}
        <div 
          className="absolute top-[38%] left-1/2 -translate-x-1/2 flex gap-8 md:gap-10 pointer-events-none"
          style={{
            transform: `translate(calc(-50% + ${eyeOffset.x * 5}px), ${eyeOffset.y * 5}px)`
          }}
        >
          <div className="w-3 h-3 md:w-4 md:h-4 bg-foreground rounded-full transition-transform duration-100" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-foreground rounded-full transition-transform duration-100" />
        </div>
      </div>
      
      {/* Speech bubble for states */}
      {state === 'shocked' && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg animate-bounce-in">
          <span className="text-2xl">😱</span>
        </div>
      )}
      
      {state === 'eating' && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg animate-bounce-in">
          <span className="text-2xl">🍌</span>
        </div>
      )}
    </div>
  );
};

export default Monkey;
