interface DoNotClickButtonProps {
  onClick: () => void;
}

const DoNotClickButton = ({ onClick }: DoNotClickButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-destructive/10 hover:bg-destructive/20 text-destructive px-4 py-2 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95"
    >
      <span className="text-sm font-medium">⚠️ Do Not Click</span>
    </button>
  );
};

export default DoNotClickButton;
