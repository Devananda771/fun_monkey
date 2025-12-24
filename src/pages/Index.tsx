import { useState, useEffect, useCallback, useRef } from 'react';
import Monkey from '@/components/Monkey';
import BananaCounter from '@/components/BananaCounter';
import WrongClock from '@/components/WrongClock';
import FakeLoadingBar from '@/components/FakeLoadingBar';
import MotivationalMessages from '@/components/MotivationalMessages';
import SoundToggle from '@/components/SoundToggle';
import DoNotClickButton from '@/components/DoNotClickButton';
import MoreMonkeyToggle from '@/components/MoreMonkeyToggle';
import PurposeMessage from '@/components/PurposeMessage';
import YoureDoingGreat from '@/components/YoureDoingGreat';
import BananaRain from '@/components/BananaRain';

type MonkeyState = 'idle' | 'jumping' | 'scratching' | 'clapping' | 'yawning' | 'eating' | 'rolling' | 'staring' | 'shocked' | 'dancing' | 'waving';

const backgroundColors = [
  'hsl(258 89% 96%)',
  'hsl(269 100% 97%)',
  'hsl(240 100% 97%)',
  'hsl(280 100% 97%)',
  'hsl(250 100% 96%)',
];

const Index = () => {
  const [monkeyState, setMonkeyState] = useState<MonkeyState>('idle');
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [muteTimeLeft, setMuteTimeLeft] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
  const [hasClappedForStaying, setHasClappedForStaying] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const [bananaRainActive, setBananaRainActive] = useState(false);
  const [typedKeys, setTypedKeys] = useState('');
  
  const activityRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play monkey sounds
  const playMonkeySound = useCallback(() => {
    if (isMuted) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Playful monkey-like chirp
    oscillator.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600 + Math.random() * 300, ctx.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }, [isMuted]);

  // Play "You're doing great" sound
  const playGreatSound = useCallback(() => {
    if (isMuted) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    const ctx = audioContextRef.current;
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 major chord
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + i * 0.1 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.5);
      
      oscillator.start(ctx.currentTime + i * 0.1);
      oscillator.stop(ctx.currentTime + i * 0.1 + 0.5);
    });
  }, [isMuted]);

  // Track cursor with eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;
      
      setEyeOffset({ x: offsetX, y: offsetY });
      
      // Increase activity
      activityRef.current = Math.min(activityRef.current + 1, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random monkey behaviors
  useEffect(() => {
    const behaviors: MonkeyState[] = ['scratching', 'jumping', 'yawning', 'eating', 'rolling', 'staring'];
    
    const interval = setInterval(() => {
      if (activityRef.current > 50) {
        // Energetic when user is active
        setMonkeyState('jumping');
      } else {
        // Random calm behavior
        const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
        setMonkeyState(randomBehavior);
      }
      
      // Reset to idle after animation
      setTimeout(() => {
        if (monkeyState !== 'dancing' && monkeyState !== 'shocked' && monkeyState !== 'waving') {
          setMonkeyState('idle');
        }
      }, 2000);
      
      // Decay activity
      activityRef.current = Math.max(0, activityRef.current - 20);
    }, 4000);

    return () => clearInterval(interval);
  }, [monkeyState]);

  // Random monkey sounds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        playMonkeySound();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [playMonkeySound]);

  // Play sound for "You're doing great"
  useEffect(() => {
    const interval = setInterval(() => {
      playGreatSound();
    }, 20000);

    return () => clearInterval(interval);
  }, [playGreatSound]);

  // Random dramatic zoom
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsZoomedIn(true);
        setTimeout(() => setIsZoomedIn(false), 2000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Background color change
  useEffect(() => {
    const interval = setInterval(() => {
      const newColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
      setBackgroundColor(newColor);
    }, 180000); // Every 3 minutes

    return () => clearInterval(interval);
  }, []);

  // Clap after 1 minute
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasClappedForStaying) {
        setMonkeyState('clapping');
        setHasClappedForStaying(true);
        setTimeout(() => setMonkeyState('idle'), 3000);
      }
    }, 60000);

    return () => clearTimeout(timeout);
  }, [hasClappedForStaying]);

  // Secret banana rain easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key.length === 1 && /[a-z]/.test(key)) {
        setTypedKeys(prev => {
          const newTyped = (prev + key).slice(-6); // Keep last 6 chars
          if (newTyped === 'banana' && !bananaRainActive) {
            setBananaRainActive(true);
            setMonkeyState('dancing');
          }
          return newTyped;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bananaRainActive]);

  const handleBananaRainComplete = useCallback(() => {
    setBananaRainActive(false);
    setTypedKeys('');
    setMonkeyState('idle');
  }, []);
  const handlePageClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 10) {
        setMonkeyState('dancing');
        setTimeout(() => setMonkeyState('idle'), 4000);
        return 0;
      }
      return newCount;
    });
  }, []);

  // Handle "Do Not Click" button
  const handleDoNotClick = useCallback(() => {
    setMonkeyState('shocked');
    playMonkeySound();
    setTimeout(() => setMonkeyState('idle'), 1500);
  }, [playMonkeySound]);

  // Handle mute toggle
  const handleMuteToggle = useCallback(() => {
    if (!isMuted) {
      setIsMuted(true);
      setMuteTimeLeft(30);
      
      const interval = setInterval(() => {
        setMuteTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            setIsMuted(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isMuted]);

  // Handle page leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      setMonkeyState('waving');
      setShowGoodbye(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setMonkeyState('waving');
        setShowGoodbye(true);
      } else {
        setShowGoodbye(false);
        setMonkeyState('idle');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 cursor-default select-none"
      style={{ backgroundColor }}
      onClick={handlePageClick}
    >
      {/* Meta for no tracking */}
      <meta name="robots" content="noindex, nofollow" />
      
      {/* Main monkey */}
      <div className="flex-1 flex items-center justify-center">
        <Monkey 
          state={monkeyState} 
          eyeOffset={eyeOffset}
          isZoomedIn={isZoomedIn}
        />
      </div>

      {/* Goodbye message */}
      {showGoodbye && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
          <div className="text-center animate-bounce-in">
            <p className="text-4xl mb-4">👋</p>
            <p className="text-2xl font-bold text-foreground">Goodbye, friend!</p>
            <p className="text-muted-foreground mt-2">The monkey will miss you...</p>
          </div>
        </div>
      )}

      {/* UI Elements */}
      <BananaCounter />
      <WrongClock />
      <FakeLoadingBar />
      <MotivationalMessages />
      <YoureDoingGreat />
      <PurposeMessage />
      
      <SoundToggle 
        isMuted={isMuted} 
        onToggle={handleMuteToggle}
        timeUntilUnmute={muteTimeLeft}
      />
      
      <DoNotClickButton onClick={handleDoNotClick} />
      <MoreMonkeyToggle />

      {/* Banana Rain Easter Egg */}
      <BananaRain isActive={bananaRainActive} onComplete={handleBananaRainComplete} />

      {/* Click counter hint (hidden after dance) */}
      {clickCount > 0 && clickCount < 10 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-50">
          {10 - clickCount} more clicks...
        </div>
      )}

      {/* Banana hint */}
      <div className="fixed bottom-12 right-4 text-xs text-muted-foreground/40 italic">
        psst... try typing "banana"
      </div>
    </div>
  );
};

export default Index;
