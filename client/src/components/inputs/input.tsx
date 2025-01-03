import { useState } from 'react';

// Input component
const Input = ({ id, name, type = 'text', value, onChange, className = '', required, error }: { id: string, name: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, className?: string, required?: boolean, error?: boolean }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-left text-teal-600">{id}</label>
      <input id={id} name={name} type={type === 'password' && !isPasswordVisible ? 'password' : 'text'} value={value} onChange={onChange} required={required} className={`w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${error ? 'ring-2 ring-red-500 focus:ring-red-500' : ''} ${className}`} />
      {type === 'password' && value !== '' && (
        <button type="button" onClick={() => setIsPasswordVisible(prev => !prev)} className="absolute right-3 bottom-[0.3rem] transform -translate-y-1/2 w-4 h-4 border-2 border-black rounded-full flex items-center justify-center">
          <div className={`w-2 h-2 rounded-full ${isPasswordVisible ? 'bg-teal-500' : 'bg-white'}`} />
        </button>
      )}
    </div>
  )
}

export default Input;