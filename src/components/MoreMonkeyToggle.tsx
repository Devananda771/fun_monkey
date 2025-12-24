import { useState } from 'react';

const MoreMonkeyToggle = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-4 h-4 accent-primary"
        />
        <span className="text-xs text-foreground">More Monkey</span>
      </label>
    </div>
  );
};

export default MoreMonkeyToggle;
