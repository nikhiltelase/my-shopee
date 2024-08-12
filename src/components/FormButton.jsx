// components/FormButton.jsx
import React from 'react';
import ButtonLoader from './ButtonLoader';

const FormButton = ({ isLoading, text, ...props }) => (
  <button {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {isLoading ? <ButtonLoader text={text} /> : text}
  </button>
);

export default FormButton;
