import { useEffect, useState } from 'react';

const messages = [
  "Nice scrolling!",
  "Excellent breathing!",
  "Professional mouse movement!",
  "Outstanding screen-staring technique!",
  "Your cursor placement is impeccable!",
  "A+ sitting posture (probably)!",
  "World-class blinking detected!",
  "Elite-level existence today!",
  "Phenomenal keyboard proximity!",
  "Your patience is legendary!",
  "Top-tier screen viewing!",
  "Masterful time-wasting in progress!",
  "You're really good at being here!",
  "Exceptional webpage visiting skills!",
];

const MotivationalMessages = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showMessage = () => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setVisible(true);
      
      setTimeout(() => setVisible(false), 3000);
    };

    const interval = setInterval(showMessage, Math.random() * 15000 + 10000);
    
    // Show first message after a bit
    const initialTimeout = setTimeout(showMessage, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-1/4 right-8 animate-slide-in-right">
      <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg max-w-xs">
        <p className="text-sm font-medium">✨ {message}</p>
      </div>
    </div>
  );
};

export default MotivationalMessages;
