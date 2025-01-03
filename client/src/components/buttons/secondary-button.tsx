// Primary button component
const PrimaryButton = ({ children, onClick, disabled, className }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean, className?: string }) => {
  return (
    <button onClick={onClick} className={`w-full bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-red-500 focus:outline-none ${className} ${disabled ? 'ring-2 ring-inset ring-red-500 bg-white text-black' : ''}`} type="submit" disabled={disabled}>
      {children}
    </button>
  );
};

export default PrimaryButton;