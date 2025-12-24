import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  timeUntilUnmute: number | null;
}

const SoundToggle = ({ isMuted, onToggle, timeUntilUnmute }: SoundToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 left-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-card transition-colors flex items-center gap-2"
    >
      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span className="text-xs text-foreground">
        {isMuted 
          ? `Silence the Monkey ${timeUntilUnmute ? `(${timeUntilUnmute}s)` : '(temporarily)'}`
          : 'Monkey sounds ON'
        }
      </span>
    </button>
  );
};

export default SoundToggle;
