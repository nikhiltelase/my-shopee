// components/InputField.jsx
import React, { forwardRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputField = forwardRef(({ label, type, value, onChange, error, disabled, name, handleToggleVisibility }, ref) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
        disabled={disabled}
        className={`shadow border-2 rounded w-full py-2 px-3 text-gray-700 outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {handleToggleVisibility && (
        <button
          type="button"
          onClick={handleToggleVisibility}
          className="absolute inset-y-0 right-0 pr-3 text-lg sm:text-xl flex items-center cursor-pointer"
        >
          {type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}
    </div>
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
));

export default InputField;
