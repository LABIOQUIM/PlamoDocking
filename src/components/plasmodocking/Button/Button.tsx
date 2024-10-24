// components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void; // Adicione outras props conforme necessário, como 'disabled', 'type', etc.
  children: React.ReactNode; // O conteúdo do botão (geralmente texto).
  className?: string; // Para permitir a personalização dos estilos.
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`flex uppercase w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
